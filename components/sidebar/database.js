class SidebarDatabase extends HTMLElement {
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
        class="flex gap-2 px-2 py-1 mx-2 cursor-default select-none fill-current hover:bg-gray-200 items-center"
      >
        <img-svg src="assets/icons/remixicon/database-2.svg"></img-svg>

        <div class="flex-1 truncate font-bold">${title}</div>
        
        <img-svg src="assets/icons/remixicon/arrow-down-s.svg" classes="w-6 h-6"></img-svg> 
      </div>
      `;
  }
}

customElements.define("sidebar-database", SidebarDatabase);
