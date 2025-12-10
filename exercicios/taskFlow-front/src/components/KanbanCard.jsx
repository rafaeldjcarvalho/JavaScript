import { Draggable } from "@hello-pangea/dnd";

export function KanbanCard({ tarefa, index }) {
    return (
        <Draggable draggableId={String(tarefa.id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        ...provided.draggableProps.style
                    }}
                >
                    <h3>{tarefa.titulo}</h3>
                    {/* Aqui pode adicionar descrição, prioridade, etc. */}
                </div>
            )}
        </Draggable>
    );
}