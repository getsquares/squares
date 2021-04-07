// Update preview
function updatePreview(html, obj) {
  const preview = obj.closest("table-cell").querySelector("cell-preview");
  preview.setAttribute("active", "true");
  preview.innerHTML = html;
}

// Set cell field state
function setCellFieldState(state, el_cell) {
  el_cell.querySelector("cell-open").setAttribute("open", state);
}

// Set cell preview state
function setCellPreviewState(state, el_cell) {
  el_cell.querySelector("cell-preview").setAttribute("active", state);
}
