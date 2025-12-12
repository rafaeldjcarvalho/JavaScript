import { Droppable } from "@hello-pangea/dnd";
import { KanbanCard } from "./KanbanCard";

export function KanbanColumn({ coluna, onAddTarefa, onEditTarefa, onDeleteTarefa }) {
    return (
        <div style={{ 
            margin: "8px", 
            backgroundColor: "#f4f5f7", 
            borderRadius: "6px", 
            width: "280px", 
            display: "flex", 
            flexDirection: "column",
            maxHeight: "80vh" 
        }}>
            <h3 style={{ padding: "12px", margin: 0, fontSize: "14px", color: "#172b4d" }}>
                {coluna.titulo}
            </h3>
            
            <Droppable droppableId={String(coluna.id)}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ padding: "8px", flexGrow: 1, overflowY: "auto", minHeight: "50px" }}
                    >
                        {coluna.tarefas.map((tarefa, index) => (
                            <KanbanCard 
                                key={tarefa.id} 
                                tarefa={tarefa} 
                                index={index}
                                onEdit={onEditTarefa}      // Repassa
                                onDelete={() => onDeleteTarefa(tarefa.id, coluna.id)} // Repassa com ID da coluna
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* Botão de Adicionar */}
            <button 
                onClick={() => onAddTarefa(coluna.id)}
                style={{ 
                    margin: "8px", 
                    padding: "8px", 
                    border: "none", 
                    backgroundColor: "transparent", 
                    color: "#5e6c84", 
                    cursor: "pointer", 
                    textAlign: "left",
                    borderRadius: "4px"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#091e4214"}
                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
            >
                + Adicionar tarefa
            </button>
        </div>
    );
}