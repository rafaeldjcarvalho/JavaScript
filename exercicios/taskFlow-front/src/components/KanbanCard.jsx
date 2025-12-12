import { Draggable } from "@hello-pangea/dnd";

export function KanbanCard({ tarefa, index, onEdit, onDelete }) {
    return (
        <Draggable draggableId={String(tarefa.id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: "none",
                        padding: "12px",
                        margin: "0 0 8px 0",
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        ...provided.draggableProps.style
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <h4 style={{ margin: "0 0 5px 0" }}>{tarefa.titulo}</h4>
                        
                        {/* Ações Rápidas */}
                        <div style={{ display: "flex", gap: "5px" }}>
                            <button 
                                onClick={() => onEdit(tarefa)} 
                                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px" }}>
                                ✏️
                            </button>
                            <button 
                                onClick={() => onDelete(tarefa.id)} 
                                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px" }}>
                                🗑️
                            </button>
                        </div>
                    </div>
                    
                    {tarefa.descricao && <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{tarefa.descricao}</p>}
                    
                    <div style={{ marginTop: "8px" }}>
                        <span style={{ 
                            fontSize: "10px", 
                            padding: "2px 6px", 
                            borderRadius: "10px", 
                            backgroundColor: tarefa.prioridade === "ALTA" ? "#ffebee" : "#e3f2fd",
                            color: tarefa.prioridade === "ALTA" ? "#c62828" : "#1565c0"
                        }}>
                            {tarefa.prioridade}
                        </span>
                    </div>
                </div>
            )}
        </Draggable>
    );
}