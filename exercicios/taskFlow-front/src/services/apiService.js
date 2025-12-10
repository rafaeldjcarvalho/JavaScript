const API_URL = "http://localhost:8080";

// --- Helper Privado: Gerencia Cabeçalhos e Token ---
// Essa função pega o token salvo e monta o cabeçalho padrão
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }) 
    };
};

// --- Service: Autenticação ---
export const authService = {
    registrar: async (email, senha) => {
        const response = await fetch(`${API_URL}/auth/registrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });
        
        if (!response.ok) throw new Error("Erro ao registrar usuário");
        return response.json();
    },

    login: async (email, senha) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        if (!response.ok) throw new Error("Falha na autenticação");
        
        const data = await response.json();
        
        // Salva o token automaticamente ao logar
        if (data.token) {
            localStorage.setItem("email", data.email)
            localStorage.setItem("token", data.token);
        }
        
        return data;
    },

    logout: () => {
        localStorage.removeItem("email")
        localStorage.removeItem("token");
        // Opcional: Redirecionar para login ou limpar estado global
    },
    
    // Helper para verificar se está logado
    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    }
};

// --- Service: Projetos ---
export const projetoService = {
    listarProjetos: async () => {
        const response = await fetch(`${API_URL}/projetos`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erro ao listar projetos");
        return response.json();
    },

    criarProjeto: async (nome) => {
        const response = await fetch(`${API_URL}/projetos`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ nome }),
        });
        if (!response.ok) throw new Error("Erro ao criar projeto");
        return response.json();
    },

    buscarProjetoCompleto: async (idProjeto) => {
        const response = await fetch(`${API_URL}/projetos/${idProjeto}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erro ao carregar projeto");
        return response.json();
    }
};

// --- Service: Tarefas ---
export const tarefaService = {
    criarTarefa: async (dadosTarefa, idColuna) => {
        // Espera receber: { titulo, descricao, prioridade, ... }
        const response = await fetch(`${API_URL}/tarefas/column/${idColuna}`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(dadosTarefa),
        });
        if (!response.ok) throw new Error("Erro ao criar tarefa");
        return response.json();
    },

    atualizarTarefa: async (idTarefa, dadosAtualizados) => {
        const response = await fetch(`${API_URL}/tarefas/${idTarefa}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(dadosAtualizados),
        });
        if (!response.ok) throw new Error("Erro ao atualizar tarefa");
        return response.json();
    },

    excluirTarefa: async (idTarefa) => {
        const response = await fetch(`${API_URL}/tarefas/${idTarefa}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erro ao excluir tarefa");
        return true; // Retorna true se deu certo
    },

    // A estrela do Drag and Drop ⭐
    moverTarefa: async (idTarefa, idNovaColuna, idNovaOrdem) => {
        const response = await fetch(`${API_URL}/tarefas/${idTarefa}/mover`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                idNovaColuna: idNovaColuna,
                idNovaOrdem: idNovaOrdem
            }),
        });
        if (!response.ok) throw new Error("Erro ao mover tarefa");
        return response.json();
    }
};