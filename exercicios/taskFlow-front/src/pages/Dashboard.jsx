import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projetoService, authService } from "../services/apiService"; // Importe os serviços

function Dashboard() {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [nomeProjeto, setNomeProjeto] = useState(""); // Estado para o input
    const navigate = useNavigate();

    // --- 1. Busca os projetos ao carregar a página ---
    useEffect(() => {
        async function carregarProjetos() {
            try {
                const dados = await projetoService.listarProjetos();
                setProjetos(dados);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar projetos:", error);
                alert("Sessão expirada ou erro ao buscar dados. Faça login novamente.");
                authService.logout(); // Opcional: limpa o token
                navigate("/login");
            }
        }

        carregarProjetos();
    }, [navigate]);

    // --- 2. Cria um novo projeto ---
    async function handleSubmit(e) {
        e.preventDefault();

        if (!nomeProjeto.trim()) return; // Evita nomes vazios

        try {
            // Chama a API
            const novoProjetoCriado = await projetoService.criarProjeto(nomeProjeto);
            
            // Atualiza a lista na tela (adiciona o que veio do backend, que já tem ID real)
            setProjetos([...projetos, novoProjetoCriado]);
            
            // Limpa o form e fecha o modal
            setNomeProjeto("");
            setModalAberto(false);
            
        } catch (error) {
            console.error("Erro ao criar projeto:", error);
            alert("Erro ao criar o projeto.");
        }
    }

    // --- 3. Logout (Botão extra para facilitar testes) ---
    function handleLogout() {
        authService.logout();
        navigate("/login");
    }

    if (loading) {
        return <div style={{ padding: "20px" }}>Carregando seus projetos...</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Meus Projetos</h2>
                <div>
                    <button onClick={() => setModalAberto(true)} style={{ marginRight: "10px" }}>
                        + Novo Projeto
                    </button>
                    <button onClick={handleLogout} style={{ backgroundColor: "#ff4d4f", color: "white", border: "none" }}>
                        Sair
                    </button>
                </div>
            </div>

            {/* Lista de Projetos */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {projetos.map((projeto) => (
                    <div 
                        key={projeto.id} 
                        onClick={() => navigate('/projeto/' + projeto.id)}
                        style={{ 
                            border: "1px solid #ccc", 
                            borderRadius: "8px", 
                            padding: "20px", 
                            cursor: "pointer",
                            backgroundColor: "#f9f9f9",
                            textAlign: "center"
                        }}
                    >
                        <h3>{projeto.nome}</h3>
                    </div>
                ))}
            </div>

            {/* Modal de Criação */}
            {modalAberto && (
                <div className="modal" style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", minWidth: "300px" }}>
                        <h3>Criar Novo Projeto</h3>
                        
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <input 
                                type="text" 
                                placeholder="Nome do Projeto"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)}
                                autoFocus
                                required
                            />
                            
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                <button type="button" onClick={() => setModalAberto(false)}>Cancelar</button>
                                <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white" }}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;