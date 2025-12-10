import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/apiService";

function Register() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro(""); // Limpa erros antigos

        try {
            await authService.registrar(email, senha);
            alert("Usuário registrado com sucesso!");
            navigate("/login"); // Redireciona para o login
        } catch (error) {
            setErro("Erro ao registrar: " + error.message);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <h2>Crie sua conta</h2>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                
                {erro && <p style={{ color: "red", fontSize: "14px" }}>{erro}</p>}
                
                <button type="submit">Registrar</button>
            </form>

            <p>
                Já tem uma conta? <Link to="/login">Faça Login</Link>
            </p>
        </div>
    );
}

export default Register;