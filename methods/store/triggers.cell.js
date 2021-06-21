triggers.cell = {};

triggers.cell.update = (context) => {
  context.closest("table-cell").removeAttribute("state");
};

triggers.cell.state = (data, col, context) => {
  const cell_data = cellData();

  if (cell_data?.updates?.success === false) return;

  console.log("CONTINUE");
  console.log(cell_data?.updates?.content);
  console.log(cell_data.value);

  if (cell_data?.updates?.content !== cell_data.value) {
    context.closest("table-cell").setAttribute("state", "changed");
  } else {
    context.closest("table-cell").removeAttribute("state");
  }
};
