// Update preview
function updatePreview(html, obj) {
  $("preview-value", obj.closest("table-cell")).innerHTML = html;

  debug("cell", JSON.stringify(cellData(), null, 4), "textarea");
}

function updateNull(obj) {
  const preview = $("preview", obj.closest("table-cell"));
  const preview_value = $("preview-value", obj.closest("table-cell"));
  preview_value.hidden = true;
  preview.setAttribute("active", "true");

  const el_null = $("preview-null", obj.closest("table-cell"));
  el_null.hidden = false;
}

// Set cell preview state
function setCellPreviewState(state, el_cell) {
  el_cell.querySelector("cell-preview").setAttribute("active", state);
}

// Cell active index
function cellActiveIndex(el) {
  return [...el.parentElement.children].indexOf(el) + 1;
}

// Cell is active // BYT MOT FUNKTUION under
function isCellActive() {
  return dom.current && dom.current.cell_ring.getAttribute("state") == "active";
}

// Is cell state
function isCellState(state = "active") {
  return dom.current && dom.current.cell_ring.getAttribute("state") == state;
}

// Set cell active NÖDVÄNDIG?
function setCellActiveToEl(el, state = "active") {
  el.setAttribute("state", state);
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
