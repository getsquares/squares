function handleCellClose() {
  if (!isCellState("edit")) return;

  dom.current.cell_ring.setAttribute("state", "active");
  resetEdit();
}
