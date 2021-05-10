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

function tabClassActive() {
  return ["bg-navy-100", "text-navy-900", "border-navy-300"];
}

function tabClassInactive() {
  return [
    "hover:bg-gray-100",
    "bg-gray-50",
    "bg-gradient-to-b",
    "from-white",
    "to-gray-100",
    "border-gray-300",
  ];
}

function hollowClassActive() {
  return [
    "bg-navy-100",
    "text-navy-900",
    "border",
    "border-navy-300",
    "rounded",
  ];
}

function hollowClassInactive() {
  return ["hover:bg-grayExtra", "border", "border-transparent"];
}

function resetDomCells() {
  resetDomCellRings();
  resetDomCellEdits();
}
