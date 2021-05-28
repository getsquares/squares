triggers.cell = {};

triggers.cell.update = (context) => {
  context.closest("table-cell").removeAttribute("state");
};
