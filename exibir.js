import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm";

import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
document.addEventListener("DOMContentLoaded", async () => {
    // Buscar os posts da tabela
    const { data, error } = await supabase
        .from('posts')
        .select('id, title, content, image_url')
        .order('created_at', { ascending: false }); // Ordena os posts pela data de criação

    if (error) {
        console.error('Erro ao carregar posts:', error);
        document.querySelector("#posts-container").innerHTML = "<p>Erro ao carregar posts.</p>";
        return;
    }

    // Exibir os posts na página
    const postsContainer = document.querySelector("#posts-container");

    if (data.length === 0) {
        postsContainer.innerHTML = "<p>Não há posts para exibir.</p>";
        return;
    }

    postsContainer.innerHTML = ""; // Limpa o texto inicial "Carregando posts..."

    data.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const postTitle = document.createElement("h2");
        postTitle.textContent = post.title;

        const postContent = document.createElement("p");
        postContent.textContent = post.content;


        postElement.appendChild(postTitle);
        
        
        if (post.image_url) {
            const postImage = document.createElement("img");
            postImage.src = post.image_url;
            postImage.alt = `Imagem do post: ${post.title}`;
            postImage.style.maxWidth = "100%"; // Ajusta a largura da imagem
            postElement.appendChild(postImage);
        }
        postsContainer.appendChild(postElement);
        postElement.appendChild(postContent);
    });
});
