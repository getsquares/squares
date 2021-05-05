class PaginationX extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="flex -mt-2 pb-2 bg-gray-50">
      <div class="flex gap-4 ml-auto">
        ${this.buttonTemplate("prev", "remixicon/arrow-left-s-line.svg")}
        <records-x offset="101" rows="100" total="120234233"></records-x>
        ${this.buttonTemplate("next", "remixicon/arrow-right-s-line.svg")}
      </div>
    </div>
    `;
  }

  buttonTemplate(direction, icon) {
    return `
      <records-${direction} class="py-1.5 px-2 select-none flex gap-1 items-center hover:bg-grayExtra rounded">
        <img-svg src="${icon}" classes="w-5 h-5">
      </records-${direction}>`;
  }
}
customElements.define("pagination-x", PaginationX);
