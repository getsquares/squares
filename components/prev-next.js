class PrevNext extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="flex justify-between gap-8 px-8 pb-4">
      <div class="flex gap-2 items-center text-sm font-bold">
        1-100 of 12,300
      </div>
      <div class="flex gap-4">
        <div class="py-1.5 px-2 select-none flex gap-1 items-center hover:bg-gray-200 rounded">
          <img-svg src="remixicon/arrow-left-line.svg" classes="w-5 h-5">
        </div>
        <div class="text-sm items-center flex font-bold">1 of 41</div>
        <div class="py-1.5 px-2 select-none flex gap-1 items-center hover:bg-gray-200 rounded">
          <img-svg src="remixicon/arrow-right-line.svg" classes="w-5 h-5">
        </div>
      </div>
    </div>
    `;
  }
}
customElements.define("prev-next", PrevNext);
