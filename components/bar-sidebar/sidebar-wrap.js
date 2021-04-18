class SidebarWrap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      ...[
        "flex",
        "flex-col",
        "pb-4",
        "overflow-auto",
        "resize-x",
        "bg-white",
        "w-80",
        "border-r",
        "border-gray-300",
        "gap-6",
      ]
    );
    this.innerHTML = `
      <h2 class="p-4 pb-0 text-xl">Databases and tables</h2>
      <sidebar-filter></sidebar-filter>
      <div class="flex flex-col">
        <sidebar-database title="jiddra_se"></sidebar-database>
        <sidebar-database title="jiddra2_se"></sidebar-database>
      </div>
    `;
  }
}

customElements.define("sidebar-wrap", SidebarWrap);
