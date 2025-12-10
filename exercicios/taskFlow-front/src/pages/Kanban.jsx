import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { KanbanColumn } from "../components/KanbanColumn"
import { projetoService, tarefaService } from "../services/apiService"

function Kanban() {
    const { id } = useParams();
    const [projeto, setProjeto] = useState(null);
    const [colunas, setColunas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    // --- 1. Busca os dados ao carregar a página ---
    useEffect(() => {
        async function buscarDados() {
            try {
                setLoading(true);
                // Chama o serviço que busca o projeto completo (com colunas e tarefas)
                const projeto = await projetoService.buscarProjetoCompleto(id);
                
                setProjeto(projeto.nome)
                // O backend deve retornar algo como { id: 1, nome: "...", colunas: [...] }
                setColunas(projeto.colunas || []); 
                
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setErro("Não foi possível carregar o quadro. Verifique se você está logado.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id]);

    // --- 2. Lógica do Drag and Drop ---
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

    // --- Renderização Condicional ---
    
    if (loading) {
        return <div style={{ padding: "20px" }}>Carregando tarefas...</div>;
    }

    if (erro) {
        return <div style={{ padding: "20px", color: "red" }}>{erro}</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ padding: "20px" }}>
                <h2>Quadro Kanban</h2>
                { projeto }
                
                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
                    {colunas.map((coluna) => (
                        <KanbanColumn key={coluna.id} coluna={coluna} />
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
}

export default Kanban;