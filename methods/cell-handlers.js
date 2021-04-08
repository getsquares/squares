// Handle cell active
function handleCellActive(e) {
  storeDomCell(e.currentTarget.closest("table-cell"));
  resetDomCells();
  dom.current.cell_ring.setAttribute("state", "active");
}

// Handle cell step
function handleCellStep(direction) {
  if (!isCellActive()) return;

  storeDomCell(dom[direction].table_cell);
  resetDomCells();
  dom.current.cell_ring.setAttribute("state", "active");
}

// Handle cell escape
function handleCellEscape(e) {
  if (!isCellActive()) return;

  e.preventDefault();

  dom.current.cell_ring.setAttribute("state", "default");
  resetStore();
}

function handleCellClose() {
  if (!isCellState("edit")) return;

  dom.current.cell_ring.setAttribute("state", "active");
  resetEdit();
}

// Handle cell tab
function handleCellTab(e) {
  if (!isCellActive()) return;

  e.preventDefault();

  handleCellStep(e.shiftKey ? "left" : "right");
}

// Handle cell edit
// Enter and doubleclick
function handleCellEdit() {
  if (in_field) {
    in_field = false;
    return;
  }
  if (!isCellActive()) return;

  resetDomCells();
  dom.current.cell_ring.setAttribute("state", "edit");
  dom.current.cell_edit.setAttribute("active", "true");
  dom.current.cell_edit.innerHTML = `<field-text></field-text>`;
}

function resetEdit() {
  dom.current.cell_ring.setAttribute("state", "active");
  dom.current.cell_edit.setAttribute("active", "false");
  dom.current.cell_edit.innerHTML = "";
}
