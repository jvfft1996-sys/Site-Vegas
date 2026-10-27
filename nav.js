/* Menu (burger) do cabeçalho — compartilhado por todas as páginas */
document.getElementById("burger")?.addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});
