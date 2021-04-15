class SidebarTable extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["state"];
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    this.removeAttribute("title");

    this.innerHTML = `
      <div
        class="flex gap-2 py-1 mx-2 px-2 border border-transparent cursor-default select-none fill-current hover:bg-gray-200"
      >
        <div class="ml-8 flex-1 truncate text-sm text-gray-500" title="asdjasi">${title}</div>
      </div>
      `;
  }
}

customElements.define("sidebar-table", SidebarTable);
