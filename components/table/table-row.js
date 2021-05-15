class TableRow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("contents");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  addRow() {
    const main = this.closest("pane-main");
    const db_name = `${main.getAttribute("database")} ${main.getAttribute(
      "table"
    )}`;
    const row = $("[data-first]", this.closest("pane-main")).innerHTML;

    this.insertAdjacentHTML("afterend", row);

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    this.nextElementSibling.dataset.index = timestamp;

    temp["insert"][db_name].data[timestamp] = temp["insert"][db_name].defaults;
  }

  thisActivate() {
    this.classList.add("row-primary");
  }

  thisDeactivate() {
    this.classList.remove("row-primary");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("table-row", TableRow);
