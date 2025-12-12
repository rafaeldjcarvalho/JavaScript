import { useState, useEffect } from "react";

export function TaskModal({ isOpen, onClose, onSave, tarefaParaEditar, colunAlvoId }) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState("BAIXA");
    const [ordem, setOrdem] = useState(0)

    // Sempre que o modal abre ou a tarefa muda, atualizamos os campos
    useEffect(() => {
        if (tarefaParaEditar) {
            setTitulo(tarefaParaEditar.titulo);
            setDescricao(tarefaParaEditar.descricao || "");
            setPrioridade(tarefaParaEditar.prioridade || "BAIXA");
            setOrdem(tarefaParaEditar.ordem || 0)
        } else {
            // Limpa se for nova tarefa
            setTitulo("");
            setDescricao("");
            setPrioridade("BAIXA");
            setOrdem(0)
        }
    }, [tarefaParaEditar, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Retorna os dados para o componente pai
        onSave({ 
            titulo, 
            descricao, 
            prioridade, 
            ordem,
            id: tarefaParaEditar?.id, // Se tiver ID, é edição
            idColuna: colunAlvoId     // Se for nova, precisa saber a coluna
        });
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>{tarefaParaEditar ? "Editar Tarefa" : "Nova Tarefa"}</h3>
                
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input 
                        placeholder="Título" 
                        value={titulo} 
                        onChange={e => setTitulo(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                    
                    <textarea 
                        placeholder="Descrição" 
                        value={descricao} 
                        onChange={e => setDescricao(e.target.value)} 
                        style={styles.input}
                    />

                    <select value={prioridade} onChange={e => setPrioridade(e.target.value)} style={styles.input}>
                        <option value="BAIXA">Baixa</option>
                        <option value="MEDIA">Média</option>
                        <option value="ALTA">Alta</option>
                    </select>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                        <button type="button" onClick={onClose} style={styles.btnCancel}>Cancelar</button>
                        <button type="submit" style={styles.btnSave}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles = {
    overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
    modal: { backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "300px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
    input: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
    btnCancel: { backgroundColor: "#ccc", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" },
    btnSave: { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }
};