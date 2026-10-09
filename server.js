const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Permite acessar as imagens da pasta backend
app.use("/fotos", express.static(__dirname));

// Lista com os nomes reais das imagens
const cachorros = [
    { nome: "beagle", imagem: "beagle.jpg" },
    { nome: "beagle", imagem: "beagle (2).jpg" },
    { nome: "beagle", imagem: "beagle1.jpg" },
    { nome: "husky", imagem: "husky1.jpg" },
    { nome: "husky", imagem: "husky2.jpg" },
    { nome: "husky", imagem: "husky3.jpg" },
    { nome: "labrador", imagem: "labra.jpg" },
    { nome: "labrador", imagem: "labra2.jpg" },
    { nome: "labrador", imagem: "labrador3.jpg" },
    { nome: "pug", imagem: "pug.jpg" },
    { nome: "pug", imagem: "pug2.jpg" },
    { nome: "pug", imagem: "pug3.jpg" }
];

// Sorteia um cachorro
function sortear(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

// Monta o endereço da imagem
function obterImagem(cachorro) {
    return `http://localhost:${PORT}/fotos/${encodeURIComponent(cachorro.imagem)}`;
}

// Rota para buscar um cachorro aleatório
app.get("/api/cachorro", (req, res) => {
    const cachorro = sortear(cachorros);

    res.json({
        nome: cachorro.nome,
        imagem: obterImagem(cachorro)
    });
});

// Rota para procurar uma raça
app.get("/api/cachorro/:raca", (req, res) => {
    const raca = req.params.raca.toLowerCase().trim();

    const encontrados = cachorros.filter(cachorro =>
        cachorro.nome.toLowerCase() === raca
    );

    if (encontrados.length === 0) {
        return res.status(404).json({
            erro: "Raça não encontrada! Tente beagle, husky, labrador ou pug."
        });
    }

    const cachorro = sortear(encontrados);

    res.json({
        nome: cachorro.nome,
        imagem: obterImagem(cachorro)
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});