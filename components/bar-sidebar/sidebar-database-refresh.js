class SidebarDatabaseRefresh extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      ...hollowClassInactive(),
      "flex",
      "gap-2",
      "py-1",
      "px-2",
      "cursor-default",
      "select-none",
      "fill-current",
      "items-center"
    );
    this.innerHTML = `
      <img-svg src="material-icons/refresh.svg" classes="w-4 h-4 text-gray-400"></img-svg>
      <div data-local-table class="flex-1 truncate text-13">Refresh</div>
    `;
  }
}

customElements.define("sidebar-database-refresh", SidebarDatabaseRefresh);
