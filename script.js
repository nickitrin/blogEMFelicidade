document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.querySelector("input[name='User']").value;
    const password = document.querySelector("input[name='Pin']").value;

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao fazer login: ${response.statusText}`);
        }

        const data = await response.json();
        alert(data.message);
        window.location.href = "posts.html"; // Redireciona para a página de posts
    } catch (error) {
        console.error("Erro de requisição:", error);
        alert("Erro ao tentar fazer login, tente novamente mais tarde.");
    }
});
