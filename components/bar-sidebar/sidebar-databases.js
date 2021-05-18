class SidebarDatabases extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(...["flex", "flex-col"]);
    actions.databasesLoad();
  }

  populate() {
    let html = "";

    state.databases_order.forEach((name) => {
      html += `<sidebar-database database="${name}"></sidebar-database>`;
    });

    this.innerHTML += html;
  }
}

customElements.define("sidebar-databases", SidebarDatabases);
