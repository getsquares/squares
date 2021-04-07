// CELL RING

// Click
function eventClickCell() {
  document.querySelectorAll("cell-active").forEach((item) => {
    item.addEventListener("click", (e) => {
      resetCellActive();
      resetCellEdit();
      setCellActiveToEl(e.currentTarget);
    });
  });
}

// Event cell step
function eventCellStep() {
  window.addEventListener("keydown", (e) => {
    if (
      ![
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
        "Escape",
      ].includes(e.key)
    )
      return;

    const el = document.querySelector('cell-active[state="active"]');
    if (!el) return;

    console.log(e.key);

    e.preventDefault();

    switch (e.key) {
      case "ArrowLeft":
        eventStepLeft(el);
        break;
      case "ArrowRight":
        eventStepRight(el);
        break;
      case "ArrowUp":
        eventStepUp(el);
        break;
      case "ArrowDown":
        eventStepDown(el);
        break;
      /*case "Enter":
        el.setAttribute("state", "edit");
        break;*/
      case "Escape":
        el.setAttribute("state", "default");
        break;
    }

    if (e.key == "Tab") {
      if (e.shiftKey) {
        eventStepLeft(el);
      } else {
        eventStepRight(el);
      }
    }
  });
}

// Cell active index
function cellActiveIndex(el_active) {
  const el_table = el_active.parentNode;
  return [...el_table.parentElement.children].indexOf(el_table) + 1;
}

// Event step down
function eventStepDown(el) {
  resetCellActive();

  const el_table = el.parentNode;
  const index = cellActiveIndex(el);
  const down = el_table.parentElement.nextElementSibling;

  if (down) {
    const down_cell = el_table.parentElement.nextElementSibling.querySelector(
      `table-cell:nth-child(${index}) cell-active`
    );
    setCellActiveToEl(down_cell);
  } else {
    const first = document.querySelector(
      `div.contents table-cell:nth-child(${index}) cell-active`
    );
    setCellActiveToEl(first);
  }
}

// Event step up
function eventStepUp(el) {
  resetCellActive();

  const el_table = el.parentNode;
  const index = cellActiveIndex(el);
  const up = el_table.parentElement.previousElementSibling;

  if (up) {
    const up_cell = el_table.parentElement.previousElementSibling.querySelector(
      `table-cell:nth-child(${index}) cell-active`
    );
    setCellActiveToEl(up_cell);
  } else {
    const last = document.querySelector(
      `div.contents:last-child table-cell:nth-child(${index}) cell-active`
    );
    setCellActiveToEl(last);
  }
}

// Event step right
function eventStepRight(el) {
  resetCellActive();

  console.log(el);

  const next = el.parentNode.nextElementSibling;

  if (next) {
    setCellActiveToEl(next.querySelector("cell-active"));
  } else {
    const first = el
      .closest("div")
      .firstElementChild.querySelector("cell-active");
    setCellActiveToEl(first);
  }
}

// Event step left
function eventStepLeft(el) {
  resetCellActive();

  const prev = el.parentNode.previousElementSibling;

  if (prev) {
    setCellActiveToEl(prev.querySelector("cell-active"));
  } else {
    const last = el
      .closest("div")
      .lastElementChild.querySelector("cell-active");
    setCellActiveToEl(last);
  }
}

// Reset cell active
function resetCellActive() {
  document.querySelectorAll("cell-active").forEach((item) => {
    item.setAttribute("state", "default");
  });
}

// Set cell active
function setCellActiveToEl(el, state = "active") {
  el.setAttribute("state", state);
}

// Will be loaded after ajax later
window.addEventListener("DOMContentLoaded", () => {
  eventClickCell();
  eventCellStep();
});

// Enter
