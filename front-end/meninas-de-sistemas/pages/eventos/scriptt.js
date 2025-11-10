const eventos = [
  {
    imagem: "fotos/1.jpg",
    titulo: "3° Encontro de Mulheres na Computação",
    descricao: "Incentivo à equidade de gênero na computação.",
    tipo: "Palestra",
    data: "01/12/2025",
    hora: "11h45",
    autor: "Devon Lane"
  },
  {
    imagem: "fotos/2.jpg",
    titulo: "Tecnologia e Inclusão",
    descricao: "Discussão sobre acesso das mulheres à tecnologia e diversidade.",
    tipo: "Mesa Redonda",
    data: "08/12/2025",
    hora: "14h00",
    autor: "Ana Souza"
  },
  {
    imagem: "fotos/3.jpg",
    titulo: "Workshop: Programação Criativa",
    descricao: "Oficina prática para iniciantes em programação.",
    tipo: "Oficina",
    data: "15/12/2025",
    hora: "09h30",
    autor: "Camila Ramos"
  }
];

const lista = document.getElementById("lista-eventos");
eventos.forEach(evento => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${evento.imagem}" alt="${evento.titulo}">
    <h3>${evento.titulo}</h3>
    <p>${evento.descricao}</p>
    <div class="detalhes">
      <span>📅 ${evento.data}</span>
      <span>🕒 ${evento.hora}</span>
      <span>🎙️ ${evento.tipo}</span>
      <span>👤 ${evento.autor}</span>
    </div>
  `;
  lista.appendChild(card);
});

// Navegação dos cards
const cardsContainer = document.querySelector(".cards");
document.getElementById("next").addEventListener("click", () => {
  cardsContainer.scrollBy({ left: 300, behavior: "smooth" });
});
document.getElementById("prev").addEventListener("click", () => {
  cardsContainer.scrollBy({ left: -300, behavior: "smooth" });
});
