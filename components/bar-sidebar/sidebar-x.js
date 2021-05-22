class SidebarX extends HTMLElement {
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
        "bg-gray-50",
        "w-80",
        "gap-4",
        "pl-4",
      ]
    );
    this.innerHTML = `
      <h2 class="pt-4 text-sm text-gray-400 uppercase">Databases and tables</h2>
      <sidebar-filter></sidebar-filter>
      <db-list></db-list>
    `;
  }
}

customElements.define("sidebar-x", SidebarX);
