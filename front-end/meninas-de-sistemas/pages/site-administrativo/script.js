function mostrarSenha() {
    const campo = document.getElementById("senha");
    const icone = document.getElementById("icone-olho");

    if (campo.type === "password") {
      campo.type = "text";
      icone.src = "https://images.icon-icons.com/3251/PNG/512/eye_hide_regular_icon_203604.png";
      icone.alt = "Ocultar senha";
    } else {
      campo.type = "password";
      icone.src = "https://images.icon-icons.com/3251/PNG/512/eye_show_regular_icon_203603.png";
      icone.alt = "Mostrar senha";
    }
  }