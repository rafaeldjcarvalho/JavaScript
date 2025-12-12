import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import { KanbanColumn } from "../components/KanbanColumn";
import { TaskModal } from "../components/TaskModal"; // <--- Importe o Modal
import { projetoService, tarefaService } from "../services/apiService";

function Kanban() {
    const { id } = useParams();
    const [colunas, setColunas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    
    // Estados do Modal
    const [modalAberto, setModalAberto] = useState(false);
    const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
    const [colunaAlvoId, setColunaAlvoId] = useState(null);

    // --- Carregamento Inicial (igual ao anterior) ---
    useEffect(() => {
        async function buscarDados() {
            try {
                const projeto = await projetoService.buscarProjetoCompleto(id);
                setColunas(projeto.colunas || []);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar o quadro. Verifique se você está logado.");
                setLoading(false);
            }
        }
        buscarDados();
    }, [id]);

    // --- Handlers de Abertura do Modal ---
    function abrirModalCriacao(idColuna) {
        setTarefaEmEdicao(null); // Garante que tá limpo
        setColunaAlvoId(idColuna);
        setModalAberto(true);
    }

    function abrirModalEdicao(tarefa) {
        setTarefaEmEdicao(tarefa);
        setModalAberto(true);
    }

    // --- Lógica CRUD ---

    // 1. Salvar (Criar ou Editar)
    async function handleSalvarTarefa(dadosFormulario) {
        try {
            if (dadosFormulario.id) {
                // --- EDIÇÃO (PUT) ---
                const tarefaAtualizada = await tarefaService.atualizarTarefa(dadosFormulario.id, dadosFormulario);

                // Atualiza o estado local
                const novasColunas = colunas.map(col => ({
                    ...col,
                    tarefas: col.tarefas.map(t => t.id === tarefaAtualizada.id ? tarefaAtualizada : t)
                }));
                setColunas(novasColunas);

            } else {
                // --- CRIAÇÃO (POST) ---
                console.log(dadosFormulario.idColuna)
                const novaTarefa = await tarefaService.criarTarefa({
                    ...dadosFormulario}, dadosFormulario.idColuna // Importante mandar o ID da coluna
                );

                // Atualiza o estado local (Adiciona na coluna certa)
                const novasColunas = colunas.map(col => {
                    if (String(col.id) === String(dadosFormulario.idColuna)) {
                        return { ...col, tarefas: [...col.tarefas, novaTarefa] };
                    }
                    return col;
                });
                setColunas(novasColunas);
            }
            setModalAberto(false); // Fecha modal
        } catch (error) {
            alert("Erro ao salvar tarefa");
            console.error(error);
        }
    }

    // 2. Excluir (DELETE)
    async function handleExcluirTarefa(idTarefa, idColuna) {
        if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

        try {
            await tarefaService.excluirTarefa(idTarefa);

            // Remove do estado local
            const novasColunas = colunas.map(col => {
                if (String(col.id) === String(idColuna)) {
                    return {
                        ...col,
                        tarefas: col.tarefas.filter(t => t.id !== idTarefa)
                    };
                }
                return col;
            });
            setColunas(novasColunas);
            
        } catch (error) {
            alert("Erro ao excluir tarefa");
            console.error(error);
        }
    }

    // --- Drag and Drop ---
    async function onDragEnd(result) {
        if (!result.destination) return;

        // Backup para Rollback (UI Otimista)
        const backup = colunas;
        console.log(result)

        try {
            const { source, destination } = result;

            // Se moveu, mas caiu no mesmo lugar exato, ignora
            if (source.droppableId === destination.droppableId && source.index === destination.index) {
                return;
            }

            // --- Atualização do Estado Local (Visual) ---
            if (source.droppableId === destination.droppableId) {
                // MESMA COLUNA
                const colunaIndex = colunas.findIndex(c => String(c.id) === source.droppableId);
                const coluna = colunas[colunaIndex];
                const novasTarefas = Array.from(coluna.tarefas);
                const [itemRemovido] = novasTarefas.splice(source.index, 1);
                novasTarefas.splice(destination.index, 0, itemRemovido);

                const novasColunas = [...colunas];
                novasColunas[colunaIndex] = { ...coluna, tarefas: novasTarefas };
                setColunas(novasColunas);

            } else {
                // COLUNAS DIFERENTES
                const origemIndex = colunas.findIndex(c => String(c.id) === source.droppableId);
                const destinoIndex = colunas.findIndex(c => String(c.id) === destination.droppableId);
                
                const origem = colunas[origemIndex];
                const destino = colunas[destinoIndex];

                const tarefasOrigem = Array.from(origem.tarefas);
                const tarefasDestino = Array.from(destino.tarefas);

                const [itemRemovido] = tarefasOrigem.splice(source.index, 1);
                tarefasDestino.splice(destination.index, 0, itemRemovido);

                const novasColunas = [...colunas];
                novasColunas[origemIndex] = { ...origem, tarefas: tarefasOrigem };
                novasColunas[destinoIndex] = { ...destino, tarefas: tarefasDestino };
                setColunas(novasColunas);
            }

            // --- 3. Sincronização com Backend ---
            // Usando o novo tarefaService
            await tarefaService.moverTarefa(
                result.draggableId,       // ID da Tarefa
                destination.droppableId,  // ID da Nova Coluna
                destination.index         // Nova Ordem
            );

        } catch (error) {
            console.error("Erro ao mover card:", error);
            alert("Erro ao salvar alteração. O quadro será recarregado.");
            setColunas(backup); // Rollback em caso de erro
        }
    }

    if (loading) return <div>Carregando...</div>;

    if (erro) {
        return <div style={{ padding: "20px", color: "red" }}>{erro}</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ padding: "20px", height: "100vh", backgroundColor: "#0079bf" }}>
                <h2 style={{ color: "white" }}>Quadro Kanban</h2>
                
                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', alignItems: "flex-start" }}>
                    {colunas.map((coluna) => (
                        <KanbanColumn 
                            key={coluna.id} 
                            coluna={coluna} 
                            onAddTarefa={abrirModalCriacao}    // Passando função
                            onEditTarefa={abrirModalEdicao}    // Passando função
                            onDeleteTarefa={handleExcluirTarefa} // Passando função
                        />
                    ))}
                </div>

                {/* O Modal fica aqui, "flutuando" */}
                <TaskModal 
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    onSave={handleSalvarTarefa}
                    tarefaParaEditar={tarefaEmEdicao}
                    colunAlvoId={colunaAlvoId}
                />
            </div>
        </DragDropContext>
    );
}

export default Kanban;