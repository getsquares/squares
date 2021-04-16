class RowSelect extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("relative", "flex");
    this.innerHTML = `
      <label class="py-2 px-4 relative bg-white">
        <input type="checkbox" class="w-5 h-5 rounded-sm text-white" name="test" />
        <div class="absolute block inset-0 ring-1 ring-gray-300"></div>
      </label>
    `;
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("row-select", RowSelect);
