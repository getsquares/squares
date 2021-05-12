// Event cell step
function eventCellKeydown() {
  window.addEventListener("keydown", (e) => {
    let cell_active = $('cell-ring[state="active"]');
    if (!cell_active) return;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowDown":
      case "ArrowUp":
        cell_active.handleStep(e.key);
        break;
      case "Tab":
        cell_active.handleCellTab(e);
        break;
      case "Enter":
        cell_active.handleCellEdit();
        break;
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
