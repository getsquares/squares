class SidebarWrap extends HTMLElement {
  constructor() {
    super();
  }

  /*
  bg-navy-50
  bg-navy-100
  bg-navy-200
  bg-navy-300
  bg-navy-400
  bg-navy-500
  bg-navy-600
  bg-navy-700
  bg-navy-800
  bg-navy-900

  bg-gray-50
  bg-gray-100
  bg-gray-200
  bg-gray-300
  bg-gray-400
  bg-gray-500
  bg-gray-600
  bg-gray-700
  bg-gray-800
  bg-gray-900
  */

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
        "gap-6",
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
