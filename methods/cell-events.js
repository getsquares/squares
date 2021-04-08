// Event cell click
function eventCellClick() {
  getDomCellRings().forEach((el) => {
    el.addEventListener("click", (e) => {
      handleCellActive(e);
    });
  });
}

// Event cell doubleclick
function eventCellDoubleclick() {
  getDomCellRings().forEach((el) => {
    el.addEventListener("dblclick", () => {
      handleCellEdit();
    });
  });
}

// Event cell step
function eventCellKeydown() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        handleCellStep("left");
        break;
      case "ArrowRight":
        handleCellStep("right");
        break;
      case "ArrowDown":
        handleCellStep("down");
        break;
      case "ArrowUp":
        handleCellStep("up");
        break;
      case "Escape":
        handleCellEscape(e);
        break;
      case "Tab":
        handleCellTab(e);
        break;
      case "Enter":
        handleCellEdit();
        break;
    }
  });
}

// KOPPLA IN
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
}
