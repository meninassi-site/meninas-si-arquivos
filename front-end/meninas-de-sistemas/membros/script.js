// Dados dos membros
const membros = [
  {
    imagem: "fotos/1.jpg",
    nome: "Ana Souza",
    funcao: "Coordenadora",
    descricao: "Coordena atividades e parcerias do projeto."
  },
  {
    imagem: "fotos/2.jpg",
    nome: "Camila Ramos",
    funcao: "Desenvolvedora",
    descricao: "Desenvolve plataformas educacionais e quizzes interativos."
  },
  {
    imagem: "fotos/3.jpg",
    nome: "Juliana Lima",
    funcao: "Designer",
    descricao: "Cuida da identidade visual e da comunicação visual do projeto."
  },
  {
    imagem: "fotos/4.jpg",
    nome: "Mariana Silva",
    funcao: "Facilitadora",
    descricao: "Conduz oficinas em escolas e comunidades ribeirinhas."
  },
  {
    imagem: "fotos/5.jpg",
    nome: "Beatriz Costa",
    funcao: "Mentora",
    descricao: "Apoia as estudantes nas trilhas de aprendizado do projeto."
  },
  {
    imagem: "fotos/6.jpg",
    nome: "Fernanda Gomes",
    funcao: "Comunicação",
    descricao: "Gerencia as redes sociais e a produção de conteúdo digital."
  }
];

// Inserir os cards na página
const lista = document.getElementById("lista-membros");

membros.forEach(membro => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="avatar-wrap">
      <img src="${membro.imagem}" alt="${membro.nome}">
    </div>
    <div class="name">${membro.nome}</div>
    <div class="role">${membro.funcao}</div>
    <div class="description">${membro.descricao}</div>
    <div class="socials">
      <a href="#" title="Facebook">f</a>
      <a href="#" title="Instagram">ig</a>
      <a href="mailto:contato@exemplo.com" title="E-mail">✉</a>
    </div>
  `;

  lista.appendChild(card);
});
