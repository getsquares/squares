class TableCell extends HTMLElement {
  constructor() {
    super();
  }

  mode() {
    return this.mode;
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

    const table = get.tb.items(this.db, this.tb);
    var field_type = "text";
    if (table?.cols?.[this.col]?.config?.field !== undefined) {
      field_type = table?.cols?.[this.col]?.config?.field;
    }

    const class_name = `Field${field_type.capitalize()}`;

    const field = eval(`new ${class_name}()`);
    let mode = "dropdown";

    if (field?.config) {
      mode = field.config().mode;
    }

    this.mode = mode;

    this.setAttribute("mode", mode);
    //}

    this.innerHTML = `
      <cell-ring></cell-ring>
      <cell-edit-${mode} hidden></cell-edit-${mode}>
      <cell-preview>
        <preview-null class="text-opacity-50 text-gray-800 italic">NULL</preview-null>
        <preview-value></preview-value>
      </cell-preview>
    `;

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

      const cell_data = cellData();

      $("error-x", this.closest("pane-main")).hidden =
        cell_data?.updates?.success !== false;
    });
  }

  onDblclickRing() {
    $("cell-ring", this).on("dblclick", (e) => {
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

    /*const table = get.tb.items(this.db, this.tb);
    var field_type = "text";
    if (table?.cols?.[this.col]?.config?.field !== undefined) {
      field_type = table?.cols?.[this.col]?.config?.field;
    }*/

    $("cell-ring", this).setAttribute("state", "edit");
    $(`cell-edit-${this.mode}`, this).populateEdit();
  }

  handleCellActive(el) {
    if ($("cell-ring", el).getAttribute("state") == "active") return;

    this.closest("pane-main").deactivateCells();
    $("cell-ring", el).setAttribute("state", "active");

    state.row = el.getAttribute("row");
    state.col = el.getAttribute("col");
    state.index = el.getAttribute("index");

    debug("row", state.row);
    debug("col", state.col);
    debug("index", state.index);

    console.log("HandleCellActive");
    debug("cell", JSON.stringify(cellData(), null, 4), "textarea");
  }
}

customElements.define("table-cell", TableCell);
