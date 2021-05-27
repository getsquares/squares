/* NEW table cell */
class TableCell extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.db = this.closest("pane-main").getAttribute("db");
    this.tb = this.closest("pane-main").getAttribute("tb");
    this.col = this.getAttribute("col");
    this.row = this.getAttribute("row");
    this.index = this.getAttribute("index");
    this.data = get.tb.items(this.db, this.tb);
    this.value = get.tb.value(this.db, this.tb, this.col, this.index);
    this.col_data = get.col.data(this.db, this.tb, this.col);

    this.innerHTML = `
      <cell-ring></cell-ring>
      <cell-edit hidden></cell-edit>
      <cell-preview>
        <preview-null class="text-opacity-50 text-gray-800 italic">NULL</preview-null>
        <preview-value></preview-value>
      </cell-preview>
    `;

    this.xEdges();

    this.setPreviewValue();
    this.setPreviewNull();

    this.onClickRing();
    this.onDblclickRing();
  }

  // Set preview value
  setPreviewValue() {
    $("preview-value", this).innerText = this.value;
  }

  // Set preview null
  setPreviewNull() {
    $("preview-null", this).hidden = this.value !== null;
    $("preview-value", this).hidden = this.value === null;
  }

  // EVENTS

  onClickRing() {
    $("cell-ring", this).on("click", () => {
      this.handleCellActive(this);
    });
  }

  onDblclickRing() {
    $("cell-ring", this).on("dblclick", (e) => {
      this.handleCellEdit();
    });
  }

  onClickNull() {
    $("cell-edit label:first-child input", this).on("change", (e) => {
      const checked = e.currentTarget.checked;
      $("preview-null", this).hidden = !checked;
      $("preview-value", this).hidden = checked;
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
    const prev = this.previousElementSibling;

    if (!prev) return;
    if (prev.tagName !== "TABLE-CELL") return;

    this.handleCellActive(prev);
  }

  stepRight() {
    const next = this.nextElementSibling;

    if (!next) return;
    if (next.tagName !== "TABLE-CELL") return;

    this.handleCellActive(next);
  }

  stepDown() {
    const index = cellActiveIndex(this);
    const down = this.parentElement.nextElementSibling;

    if (!down) return;
    if (down.tagName !== "TABLE-ROW") return;

    this.handleCellActive($(`table-cell:nth-child(${index})`, down));
  }

  stepUp() {
    const index = cellActiveIndex(this);
    const up = this.parentElement.previousElementSibling;

    if (!up) return;
    if (up.tagName !== "TABLE-ROW") return;

    this.handleCellActive($(`table-cell:nth-child(${index})`, up));
  }

  handleCellTab(e) {
    e.preventDefault();
    this.handleStep(e.shiftKey ? "ArrowLeft" : "ArrowRight");
  }

  handleCellEdit() {
    if (in_field) {
      in_field = false;
      return;
    }
    $("cell-ring", this).setAttribute("state", "edit");

    this.populateEdit();
  }

  handleCellActive(el) {
    if ($("cell-ring", el).getAttribute("state") == "active") return;

    this.closest("pane-main").deactivateCells();
    $("cell-ring", el).setAttribute("state", "active");
  }

  isNullable() {
    return this.col_data.meta.Null == "YES";
  }

  populateEdit() {
    let html_null = "";
    if (this.isNullable()) {
      html_null = `
        <label class="flex gap-2 items-center">
          <input
            type="checkbox"
            class="checkstyle-white form-checkbox"
            ${this.value === null ? "checked" : ""}
          >
          <div class="italic">NULL</div>
        </label>
      `;
    }
    let html = `
      ${html_null}
      <field-text></field-text>
    `;

    $("cell-edit", this).hidden = false;
    $("cell-edit", this).innerHTML = html;

    if (!this.isNullable()) return;

    this.onClickNull();
  }

  xEdges() {
    const prev_el = this.previousElementSibling;
    const next_el = this.nextElementSibling;

    if (prev_el.tagName == "ROW-SELECT") {
      $("cell-ring", this).classList.add("ml-2px");
    } else if (!next_el) {
      $("cell-ring", this).classList.add("mr-2px");
    }
  }
}

customElements.define("table-cell", TableCell);
