// Event cell edit
function eventCellEdit() {
  window.addEventListener("keydown", (e) => {
    if (!["Escape"].includes(e.key)) return;

    const el = document.querySelector('cell-active[state="edit"]');
    if (!el) return;

    e.preventDefault();

    el.setAttribute("state", "active");

    const cell = el.closest("table-cell");
    setCellFieldState("false", cell);
    setCellPreviewState("true", cell);
  });
}

function eventCellEnter() {
  window.addEventListener("keydown", (e) => {
    if (!["Enter"].includes(e.key)) return;

    const el = document.querySelector('cell-active[state="active"]');
    if (!el || in_field) {
      in_field = false;
      return;
    }

    e.preventDefault();

    resetCellActive();
    resetCellEdit();
    setCellActiveToEl(el, "edit");

    const cell = el.closest("table-cell");
    setCellFieldState("true", cell);
    //cell.querySelector("cell-preview").setAttribute("active", "false");
    setCellPreviewState("false", cell);
    cell.querySelector("cell-open").innerHTML = `<field-text></field-text>`;

    cell.querySelector("field-text input").select();
  });
}

// DoubleClick
function eventDoubleClickCell() {
  document.querySelectorAll("cell-active").forEach((item) => {
    item.addEventListener("dblclick", (e) => {
      resetCellActive();
      resetCellEdit();
      setCellActiveToEl(e.currentTarget, "edit");

      const cell = e.currentTarget.closest("table-cell");
      setCellFieldState("true", cell);
      cell.querySelector("cell-preview").setAttribute("active", "false");
      cell.querySelector("cell-open").innerHTML = `<field-text></field-text>`;

      cell.querySelector("field-text input").select();
    });
  });
}

// Reset cell active
function resetCellEdit() {
  document.querySelectorAll("cell-open").forEach((item) => {
    item.setAttribute("open", "false");
  });
}

function outsideClick() {
  document.addEventListener("click", (event) => {
    const el = document.querySelector(`[data-table]`);
    console.log(el);
    var isClickInside = el.contains(event.target);

    if (!isClickInside) {
      resetCellEdit();
      const el_edit = document.querySelector(`cell-active[state="edit"]`);
      if (!el_edit) return;
      el_edit.setAttribute("state", "active");
    }
  });
}

// Leave edit
function leaveEdit() {
  in_field = true;
  console.log("leaveedit");
  resetCellEdit();
  const el_edit = document.querySelector(`cell-active[state="edit"]`);
  if (!el_edit) return;
  el_edit.setAttribute("state", "active");
}

window.addEventListener("DOMContentLoaded", () => {
  eventCellEdit();
  eventDoubleClickCell();
  outsideClick();
  eventCellEnter();
});
