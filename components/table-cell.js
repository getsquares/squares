class TableCell extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("p-2", "relative", "bg-white");
    this.innerHTML = `
      <cell-ring state="default"></cell-ring>
      <cell-edit></cell-edit>
      <cell-preview active="true">
        ${this.value}
      </cell-preview>
    `;
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("table-cell", TableCell);
