document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".home, .cv, .projects");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.fontWeight = "bold";
    });

    item.addEventListener("mouseleave", () => {
      item.style.fontWeight = "normal";
    });
  });
});
