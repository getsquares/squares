class SidebarDatabaseItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      ...[
        "flex",
        "gap-2",
        "px-2",
        "py-1",
        "cursor-default",
        "select-none",
        "fill-current",
        "items-center",
      ]
    );

    this.innerHTML = `
      <img-svg src="remixicon/database-2-fill.svg" classes="w-4 h-4 text-yellow-500"></img-svg>
      <div class="flex-1 truncate font-bold text-sm">
        ${this.closest("sidebar-database").getAttribute("database")}
      </div>
      <img-svg arrow src="remixicon/arrow-down-s.svg" classes="transform rotate-180 w-4 h-4"></img-svg>
    `;
  }

  open() {
    $("[arrow] svg", this).classList.remove("rotate-180");
  }

  close() {
    $("[arrow] svg", this).classList.add("rotate-180");
  }

  /*load() {
    const tables = this.nextElementSibling;
    if (tables.innerHTML == "") {
      tables.load();
    } else {
      tables.hide();
    }
  }*/
}

customElements.define("sidebar-database-item", SidebarDatabaseItem);
