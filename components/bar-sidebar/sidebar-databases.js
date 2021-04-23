class SidebarDatabases extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(...["flex", "flex-col"]);
    this.populate();
  }

  template(title) {
    return `<sidebar-database title="${title}"></sidebar-database>`;
  }

  populate() {
    axios
      .get("http://localhost/tools/squares/server/php/queries/databases.php")
      .then((response) => {
        if (response.status !== 200) return;
        console.log(response.data);

        let html = "";

        response.data.forEach((title) => {
          html += this.template(title);
        });

        this.innerHTML = html;
      });
  }
}

customElements.define("sidebar-databases", SidebarDatabases);
