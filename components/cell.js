class TableCell extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("p-2", "relative");
    this.innerHTML = `
      <cell-active state="default"></cell-active>
      <cell-open></cell-open>
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
