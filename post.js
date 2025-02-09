import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#postForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.querySelector("#titlepost").value;
        const content = document.querySelector("#contentpost").value;
        const imageFile = document.querySelector("#imagepost").files[0];

        if (!title || !content) {
            alert("Preencha todos os campos!");
            return;
        }

        let imageUrl = null;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { error } = await supabase.storage
                .from("post-images") // 🗂 Nome do seu bucket no Supabase Storage
                .upload(fileName, imageFile);

            if (error) {
                alert("Erro ao fazer upload da imagem: " + error.message);
                return;
            }

            // Construindo a URL da imagem
            imageUrl = `${supabaseUrl}/storage/v1/object/public/post-images/${fileName}`;
        }

        const { error: insertError } = await supabase
            .from("posts")
            .insert([{ title, content, image_url: imageUrl }]);

        if (insertError) {
            alert("Erro ao postar: " + insertError.message);
        } else {
            alert("Post enviado com sucesso!");
            document.querySelector("#postForm").reset(); // Limpa o formulário
        }
    });
});
