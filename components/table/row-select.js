class RowSelect extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("relative", "flex", "bg-white");
    this.innerHTML = `
      <label class="py-2 px-4 relative">
        <input type="checkbox" class="w-5 h-5 rounded-sm text-white" name="test" />
        <div class="absolute block inset-0 ring-1 ring-gray-300"></div>
      </label>
    `;
    this.onClick();
  }

  onClick() {
    this.querySelector("input").addEventListener("input", (e) => {
      const checked = e.currentTarget.checked;
      const el_cells = this.closest(".contents").querySelectorAll(
        "row-select, table-cell"
      );

      el_cells.forEach((el) => {
        if (checked) {
          this.selectOne(el);
        } else {
          this.deselectOne(el);
        }
      });
    });
  }

  selectOne(el) {
    el.classList.add("bg-blue-100");
    el.classList.remove("bg-white");
  }

  deselectOne(el) {
    el.classList.remove("bg-blue-100");
    el.classList.add("bg-white");
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("row-select", RowSelect);
