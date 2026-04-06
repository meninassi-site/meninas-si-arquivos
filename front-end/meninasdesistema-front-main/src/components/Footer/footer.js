async function loadFooter() {
  const response = await fetch("../components/footer/footer.html");
  const data = await response.text();
  document.getElementById("footer").innerHTML = data;
}

loadFooter();