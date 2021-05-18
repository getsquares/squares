class SidebarTables extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.hide();
    this.innerHTML = ``;
  }

  show() {
    this.removeAttribute("hidden");
  }

  hide() {
    this.setAttribute("hidden", "");
  }

  isEmpty() {
    return this.innerHTML == "";
  }

  populate(database) {
    let html = this.templateRefresh();

    console.log(state.databases[database]);

    state.databases[database].table_order.forEach((table) => {
      html += this.templateTable(database, table);
    });

    this.innerHTML = html;

    this.show();

    //$("sidebar-filter").filter(tables);
    //this.populateEvents(tables);
  }

  templateLoading() {
    return `<sidebar-database-loading></sidebar-database-loading>`;
  }

  templateRefresh() {
    return `<sidebar-database-refresh></sidebar-database-refresh>`;
  }

  templateTable(database, table) {
    return `<sidebar-table database="database" table="${table}" title="${table}"></sidebar-table>`;
  }
}

customElements.define("sidebar-tables", SidebarTables);
