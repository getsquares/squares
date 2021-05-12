class CellRing extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["state"];
  }

  connectedCallback() {
    this.onClick();
    this.onDblClick();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "state") return;
    if (oldValue !== newValue) {
      if (newValue != "default") {
        this.xEdges();
      }
    }
  }

  // Events

  onClick() {
    this.addEventListener("click", (e) => {
      this.handleCellActive(e);
    });
  }

  onDblClick() {
    this.addEventListener("dblclick", () => {
      this.handleCellEdit();
    });
  }

  handleStep(key) {
    switch (key) {
      case "ArrowLeft":
        this.stepLeft();
        break;
      case "ArrowRight":
        this.stepRight();
        break;
      case "ArrowUp":
        this.stepUp();
        break;
      case "ArrowDown":
        this.stepDown();
        break;
    }
  }

  stepLeft() {
    const prev = this.closest("table-cell").previousElementSibling;

    if (!prev) return;
    if (prev.tagName !== "TABLE-CELL") return;

    $("cell-ring", prev).handleCellActive();
  }

  stepRight() {
    const next = this.closest("table-cell").nextElementSibling;

    if (!next) return;
    if (next.tagName !== "TABLE-CELL") return;

    $("cell-ring", next).handleCellActive();
  }

  stepDown() {
    const el_table = this.closest("table-cell");
    const index = cellActiveIndex(el_table);
    const down = el_table.parentElement.nextElementSibling;

    if (!down) return;
    if (down.tagName !== "TABLE-ROW") return;
    $(`table-cell:nth-child(${index}) cell-ring`, down).handleCellActive();
  }

  stepUp() {
    const el_table = this.closest("table-cell");
    const index = cellActiveIndex(el_table);
    const up = el_table.parentElement.previousElementSibling;

    if (!up) return;
    if (up.tagName !== "TABLE-ROW") return;
    $(`table-cell:nth-child(${index}) cell-ring`, up).handleCellActive();
  }

  handleCellTab(e) {
    e.preventDefault();
    this.handleStep(e.shiftKey ? "ArrowLeft" : "ArrowRight");
  }

  /*handleCellEscape() {
    e.preventDefault();
  
    dom.current.cell_ring.setAttribute("state", "default");
    resetStore();
  }*/

  // Handlers

  handleCellActive() {
    const is_active = this.getAttribute("state") == "active";
    if (is_active) return;
    this.closest("table-cells").deactivateCells();
    this.setAttribute("state", "active");
  }

  handleCellEdit() {
    if (in_field) {
      in_field = false;
      return;
    }
    this.setAttribute("state", "edit");

    const el_edit = $("cell-edit", this.closest("table-cell"));
    el_edit.activate();
    el_edit.innerHTML = `<field-text></field-text>`;
  }

  xEdges() {
    const prev_el = this.closest("table-cell").previousElementSibling;
    const next_el = this.closest("table-cell").nextElementSibling;

    if (prev_el.tagName == "ROW-SELECT") this.classList.add("ml-2px");
    if (!next_el) this.classList.add("mr-2px");
  }
}

customElements.define("cell-ring", CellRing);
