class RowSelect extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.innerHTML = `
    <label class="p-2 px-4 block bg-white relative">
      <input type="checkbox" class="w-5 border h-5 focus:ring-2 text-lightBlue-500 focus:ring-yellow-500 border-gray-300">
      <div class="absolute block inset-0 ring-1 z-10 ring-gray-200"></div>
    </label>
    `;
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("row-select", RowSelect);
