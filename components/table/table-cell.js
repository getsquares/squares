class TableCell extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value", "null"];
  }

  connectedCallback() {
    const is_null = this.getAttribute("null");
    const nullable = this.getAttribute("nullable");
    this.classList.add("relative", "bg-white");
    const value = this.getAttribute("value");
    this.innerHTML = `
      <cell-ring state="default"></cell-ring>
      <cell-edit is_null="${is_null}" nullable="${nullable}"></cell-edit>
      <cell-preview is_null="${is_null}" nullable="${nullable}" active="true"></cell-preview>
    `;
    $("preview-value", this).innerHTML = value;
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("table-cell", TableCell);
