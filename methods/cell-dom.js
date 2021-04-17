// Get dom cell rings
function getDomCellRings() {
  return document.querySelectorAll("cell-ring");
}

// Get dom cell prev
function getDomCellLeft() {
  const prev = dom.current.table_cell.previousElementSibling;

  if (prev && prev.tagName == "TABLE-CELL") return prev;
  return dom.current.table_cell.closest("div").lastElementChild;
}

// Get dom cell next
function getDomCellRight() {
  const next = dom.current.table_cell.nextElementSibling;

  if (next && next.tagName == "TABLE-CELL") return next;
  return dom.current.table_cell.closest("div").querySelector("table-cell");
}

// Get dom cell down
function getDomCellDown() {
  const el_table = dom.current.table_cell;
  const index = cellActiveIndex(el_table);
  const down = el_table.parentElement.nextElementSibling;

  if (down) return down.querySelector(`table-cell:nth-child(${index})`);
  return document.querySelector(
    `[data-cells] div.contents:first-child table-cell:nth-child(${index})`
  );
}

// Get dom cell up
function getDomCellUp() {
  const el_table = dom.current.table_cell;
  const index = cellActiveIndex(el_table);
  const up = el_table.parentElement.previousElementSibling;

  if (up) return up.querySelector(`table-cell:nth-child(${index})`);
  return document.querySelector(
    `[data-cells] div.contents:last-child table-cell:nth-child(${index})`
  );
}

// Reset dom cell rings
function resetDomCellRings() {
  getDomCellRings().forEach((el) => {
    el.setAttribute("state", "default");
  });
}

// Reset dom cell edit
function resetDomCellEdits() {
  document.querySelectorAll("cell-edit").forEach((el) => {
    el.setAttribute("active", "false");
  });
}

function hollowClassActive() {
  return ["bg-blue-100", "text-blue-900", "border-blue-300"];
}

function hollowClassInactive() {
  return ["border-transparent", "hover:border-gray-200", "hover:bg-gray-50"];
}

function resetDomCells() {
  resetDomCellRings();
  resetDomCellEdits();
}
