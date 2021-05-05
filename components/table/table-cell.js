class TableCell extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("relative", "bg-white");
    const value = this.getAttribute("value");
    this.innerHTML = `
      <cell-ring state="default"></cell-ring>
      <cell-edit></cell-edit>
      <cell-preview active="true" class="select-none">
        ${value}
      </cell-preview>
    `;
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("table-cell", TableCell);
