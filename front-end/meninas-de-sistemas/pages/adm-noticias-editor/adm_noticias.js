document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const leftButton = carousel.querySelector(".arrow.left");
    const rightButton = carousel.querySelector(".arrow.right");
    const cardsContainer = carousel.querySelector(".cards");

    let scrollAmount = 0;
    const scrollStep = 300; // pixels por clique

    leftButton.addEventListener("click", () => {
      cardsContainer.scrollBy({
        left: -scrollStep,
        behavior: "smooth"
      });
    });

    rightButton.addEventListener("click", () => {
      cardsContainer.scrollBy({
        left: scrollStep,
        behavior: "smooth"
      });
    });
  });
});
