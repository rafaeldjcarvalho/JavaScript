import { Droppable } from "@hello-pangea/dnd";
import { KanbanCard } from "./KanbanCard";

export function KanbanColumn({ coluna }) {
    return (
        <div style={{ margin: "8px", border: "1px solid lightgrey", borderRadius: "2px", width: "220px", display: "flex", flexDirection: "column" }}>
            <h3 style={{ padding: "8px" }}>{coluna.titulo}</h3>
            
            <Droppable droppableId={String(coluna.id)}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ padding: "8px", flexGrow: 1, minHeight: "100px" }}
                    >
                        {coluna.tarefas.map((tarefa, index) => (
                            <KanbanCard key={tarefa.id} tarefa={tarefa} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}