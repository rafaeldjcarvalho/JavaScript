import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const [projetos, setProjetos] = useState([{id:1, nome:"Estudar React"}, {id:2, nome:"Estudar Angular"}])
    const [modalAberto, setModalAberto] = useState(false)
    const [novoProjeto, setNovoProjeto] = useState({})

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setProjetos([...projetos, novoProjeto])
        setModalAberto(false)
    }

    return (
        <div>
            <h2>Dashboard</h2>

            <button onClick={() => {
                setModalAberto(true)
            }}>Novo Projeto</button>

            { modalAberto && (
                <div className="modal">
                    <p>Criar Projeto</p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nomeProjeto">Nome:</label>
                        <input type="text" name="nomeProjeto" id="nomeProjeto_id" onChange={(e) => {
                            setNovoProjeto({id:3, nome: e.target.value})
                        }} />
                        <button>Salvar</button>
                    </form>

                    <button onClick={() => {
                        setModalAberto(false)
                    }}>Cancelar</button>
                </div>
            )}

            {
                projetos.map((projeto) => (
                    <div key={projeto.id} onClick={() => {
                        navigate('/projeto/' + projeto.id)
                    }}>
                        <h3>{projeto.nome}</h3>
                    </div>
                ))
            }
        </div>
    )
}

export default Dashboard