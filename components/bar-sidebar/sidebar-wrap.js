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
        "rounded-tr",
      ]
    );
    this.innerHTML = `
      <h2 class="p-4 pb-0 text-xl">Databases and tables</h2>
      <sidebar-filter></sidebar-filter>
      <sidebar-databases></sidebar-databases>
    `;
  }
}

customElements.define("sidebar-wrap", SidebarWrap);
