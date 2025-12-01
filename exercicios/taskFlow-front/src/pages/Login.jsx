import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        console.log("dados: ", {email, senha})
        navigate('/dashboard')
    }

    return (
        <div>
            <h2>Entrar</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail:</label>
                <input type="text" name="email" id="email_id" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <label htmlFor="senha">Senha</label>
                <input type="password" name="senha" id="senha_id" value={senha} onChange={(e) => {
                    setSenha(e.target.value)
                }} />
                <button>Entrar</button>
            </form>
        </div>
    )
}

export default Login