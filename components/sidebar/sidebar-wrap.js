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
        "bg-gray-100",
      ]
    );
    this.innerHTML = `
      <h2 class="p-4 text-xl text-gray-500">Databases and tables</h2>
      <div class="flex flex-col">
        <div>
          <sidebar-database title="jiddra_se"></sidebar-database>
          <div data-tables class="my-2">
            <sidebar-table title="wp_posts"></sidebar-table>
            <sidebar-table title="wp_post_taxonomies"></sidebar-table>
            <sidebar-table title="wp_pages"></sidebar-table>
          </div>
        </div>
        <div>
          <sidebar-database></sidebar-database>
          <div data-tables>
            <sidebar-table></sidebar-table>
            <sidebar-table></sidebar-table>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("sidebar-wrap", SidebarWrap);
