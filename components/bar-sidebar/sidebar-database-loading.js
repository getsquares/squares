class SidebarDatabaseLoading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "flex",
      "gap-2",
      "py-1",
      "px-4",
      "cursor-default",
      "select-none",
      "fill-current",
      "items-center"
    );
    this.innerHTML = `
      <img-svg src="material-icons/refresh.svg" classes="animate-spin w-4 h-4 text-gray-400"></img-svg>
      <div data-local-table class="flex-1 truncate text-13">Loading...</div>
    `;
  }
}

customElements.define("sidebar-database-loading", SidebarDatabaseLoading);
