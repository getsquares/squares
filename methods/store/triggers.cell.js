triggers.cell = {};

triggers.cell.update = (context) => {
  context.closest("table-cell").removeAttribute("state");
};

triggers.cell.state = (data, col, context) => {
  if (data[col] !== data[`${col}:value`]) {
    context.closest("table-cell").setAttribute("state", "changed");
  } else {
    if (context.closest("table-cell").getAttribute("state") == "error") return;
    context.closest("table-cell").removeAttribute("state");
  }
};
