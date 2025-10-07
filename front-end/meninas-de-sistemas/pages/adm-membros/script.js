// Ação do botão de adicionar membro
document.getElementById("addMemberBtn").addEventListener("click", function () {
  alert("Função de adicionar membro ainda não implementada.");
});

// Alterna o menu dropdown de opções (três pontinhos)
function toggleMenu(el) {
  // Fecha todos os menus antes de abrir o clicado
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (!menu.contains(el.nextElementSibling)) {
      menu.style.display = 'none';
    }
  });

  const menu = el.nextElementSibling;
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Simula ação de editar membro
function editMember(name) {
  alert("Editar membro: " + name);
}

// Simula ação de excluir membro com confirmação
function deleteMember(name) {
  const confirmDelete = confirm("Deseja realmente excluir " + name + "?");
  if (confirmDelete) {
    alert("Membro " + name + " excluído.");
  }
}

// Fecha o menu ao clicar fora dele
window.addEventListener('click', function (e) {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (!menu.contains(e.target) && !e.target.classList.contains('options')) {
      menu.style.display = 'none';
    }
  });
});
