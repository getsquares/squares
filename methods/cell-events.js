// Event cell step
function eventCellKeydown() {
  window.addEventListener("keydown", (e) => {
    const root_el = $(`pane-main[db="${state.database}"][tb="${state.table}"]`);
    const active_ring = $('cell-ring[state="active"]', root_el);
    const edit_ring = $('cell-ring[state="edit"]', root_el);

    if (active_ring) {
      let table_cell = active_ring.closest("table-cell");
      if (!table_cell) return;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowDown":
        case "ArrowUp":
          table_cell.handleStep(e.key);
          break;
        case "Tab":
          table_cell.handleCellTab(e);
          break;
        case "Enter":
          table_cell.handleCellEdit();
          break;
      }
    } else if (edit_ring) {
      switch (e.key) {
        case "Enter":
          console.log("ENTER");
          break;
        case "Escape":
          fieldClose(edit_ring);
          break;
      }
    }
  });
}

// KOPPLA IN
/*
function outsideClick() {
  document.addEventListener("click", (event) => {
    const el = document.querySelector(`[data-table]`);

    var isClickInside = el.contains(event.target);

    if (!isClickInside) {
      resetDomCellEdits();
      const el_edit = document.querySelector(`cell-ring[state="edit"]`);
      if (!el_edit) return;
      el_edit.setAttribute("state", "active");
    }
  });
}*/
