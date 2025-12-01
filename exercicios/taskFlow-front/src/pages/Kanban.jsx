import { useState } from "react"
import { useParams } from "react-router-dom"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"

function Kanban() {
    const param = useParams()
    const [colunas, setColunas] = useState([
        {id: 1, titulo: "A Fazer", ordem: 0, tarefas: [
            {id: 1, titulo: "Estudar react", descricao: "javascript", prioridade: "ALTA", ordem: 0},
            {id: 2, titulo: "Estudar Angular", descricao: "typescript", prioridade: "ALTA", ordem: 0}
        ]},
        {id: 2, titulo: "Fazendo", ordem: 1, tarefas: [
            {id: 3, titulo: "Estudar Gemini", descricao: "i.a.", prioridade: "ALTA", ordem: 0}
        ]},
        {id: 3, titulo: "Feito", ordem: 2, tarefas: []}
    ])

    function onDragEnd(result) {
        if(!result.destination) return

        const { source, destination } = result

        if(source.droppableId === destination.droppableId) {
            const colunaIndex = colunas.findIndex(c => String(c.id) === source.droppableId)
            const coluna = colunas[colunaIndex]

            const novasTarefas = Array.from(coluna.tarefas)

            const itemRemovido = novasTarefas.splice(source.index, 1)[0]

            novasTarefas.splice(destination.index, 0, itemRemovido)

            const novasColunas = [...colunas]; 
            novasColunas[colunaIndex] = { ...coluna, tarefas: novasTarefas }; 
            setColunas(novasColunas);
        } else {
            const colunaOrigemIndex = colunas.findIndex(c => String(c.id) === source.droppableId)
            const colunaOrigem = colunas[colunaOrigemIndex]

            const colunaDestinoIndex = colunas.findIndex(c => String(c.id) === destination.droppableId)
            const colunaDestino = colunas[colunaDestinoIndex]

            const novasTarefasOrigem = Array.from(colunaOrigem.tarefas)
            const novasTarefasDestino = Array.from(colunaDestino.tarefas)

            const tarefaRemovida = novasTarefasOrigem.splice(source.index, 1)[0]
            novasTarefasDestino.splice(destination.index, 0, tarefaRemovida)

            const novasColunas = [...colunas]
            novasColunas[colunaOrigemIndex] = { ...colunaOrigem, tarefas: novasTarefasOrigem}
            novasColunas[colunaDestinoIndex] = { ...colunaDestino, tarefas: novasTarefasDestino}
            setColunas(novasColunas)
        }

        console.log(result)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <h2>Kanban do projeto: {param.id}</h2>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {
                        colunas.map((coluna) => (
                            <Droppable key={coluna.id} droppableId={String(coluna.id)}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <h3>{coluna.titulo}</h3>
                                        {
                                            coluna.tarefas.map((tarefa, index) => (
                                                <Draggable key={tarefa.id} draggableId={String(tarefa.id)} index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <h3>{tarefa.titulo}</h3>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))
                    }
                </div>
            </div>
        </DragDropContext>
    )
}

export default Kanban