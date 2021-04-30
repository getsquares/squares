class PrevNext extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="flex justify-between gap-8 px-4 pb-2 bg-gray-50">
      <div class="flex gap-2 items-center text-sm">
        <!--1-100 of 12,300-->
      </div>
      <div class="flex gap-4">
        <div class="py-1.5 px-2 select-none flex gap-1 items-center hover:bg-grayExtra rounded">
          <img-svg src="remixicon/arrow-left-s-line.svg" classes="w-5 h-5">
        </div>
        <div class="text-13 items-center flex">1-100 of 12,300</div>
        <div class="py-1.5 px-2 select-none flex gap-1 items-center hover:bg-grayExtra rounded">
          <img-svg src="remixicon/arrow-right-s-line.svg" classes="w-5 h-5">
        </div>
      </div>
    </div>
    `;
  }
}
customElements.define("prev-next", PrevNext);
