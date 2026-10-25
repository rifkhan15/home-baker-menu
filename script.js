// Smooth category navigation and active category state.
const categoryNav = document.querySelector("#categoryNav");
const categoryButtons = [...document.querySelectorAll(".category-pill")];
const sections = categoryButtons
  .map(button => document.getElementById(button.dataset.target))
  .filter(Boolean);

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const section = document.getElementById(button.dataset.target);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    categoryButtons.forEach(item => item.classList.toggle("active", item === button));
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    categoryButtons.forEach(button => {
      button.classList.toggle("active", button.dataset.target === visible.target.id);
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.15, 0.35] });
  sections.forEach(section => observer.observe(section));
}
