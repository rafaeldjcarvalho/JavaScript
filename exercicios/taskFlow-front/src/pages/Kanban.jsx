import { useParams } from "react-router-dom"

function Kanban() {
    const param = useParams()

    return (
        <div>
            <h2>Kanban do projeto: {param.id}</h2>
        </div>
    )
}

export default Kanban