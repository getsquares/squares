class PaginationX extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="flex justify-between pb-4 bg-gray-50">
      <row-actions></row-actions>
      <div class="flex gap-4">
        ${this.buttonTemplate("prev", "remixicon/arrow-left-s-line.svg")}
        <records-x offset="101" rows="100" total="120234233"></records-x>
        ${this.buttonTemplate("next", "remixicon/arrow-right-s-line.svg")}
      </div>
    </div>
    `;
  }

  /*
bg-red-100
bg-red-200
bg-red-300
bg-red-400
bg-red-500
bg-red-600
bg-red-700
bg-red-800
bg-red-900

border-red-100
border-red-200
border-red-300
border-red-400
border-red-500
border-red-600
border-red-700
border-red-800
border-red-900
*/

  buttonTemplate(direction, icon) {
    return `
      <records-${direction} class="py-1.5 px-2 select-none flex gap-1 items-center hover:bg-grayExtra rounded">
        <img-svg src="${icon}" classes="w-5 h-5">
      </records-${direction}>`;
  }
}
customElements.define("pagination-x", PaginationX);
