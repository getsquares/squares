class SidebarTable extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    this.removeAttribute("title");

    this.innerHTML = `
      <img-svg src="boxicons/bx-table.svg" classes="w-4 h-4 text-navy-400"></img-svg>
      <div data-local-table class="flex-1 truncate text-13" title="${title}">${title}</div>
      
      `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
    }
  }

  activate() {
    this.setAttribute("active", "true");

    current.table = this.getValue();
    current.database = this.closest("sidebar-database").getValue();

    store.table.activate(
      this.closest("sidebar-database").getValue(),
      this.getValue()
    );

    dump(state);

    if ($("tab-items").tab()) {
      $$("pane-main").forEach((item) => {
        item.deactivate();
      });

      const current_el = $(
        `pane-main[database="${current.database}"][table="${current.table}"]`
      );

      current_el.activate();
    } else {
      // Fetch
      this.test(current.database, current.table).then((test) => {
        data[current.database + " " + current.table] = test;

        const html = `
          <pane-main database="${current.database}" table="${current.table}" active="true"></pane-main>
        `;

        $$("pane-main").forEach((item) => {
          item.deactivate();
        });

        $("main-x").insertAdjacentHTML("beforeend", html);

        const current_el = $(
          `pane-main[database="${current.database}"][table="${current.table}"]`
        );

        $("select-table").setAttribute("hidden", "");

        $("records-x", current_el).setAttribute("rows", test.meta.limit);
        $("records-x", current_el).setAttribute("offset", test.meta.offset);
        $("records-x", current_el).setAttribute("total", test.meta.total);
      });
    }
  }

  async test(database, table) {
    try {
      const resp = await axios.get(
        `http://localhost/tools/squares/server/php/queries/data.php?database=${database}&table=${table}`
      );

      tables[`${database}|${table}`] = resp.data;

      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

  deactivate() {
    this.removeAttribute("active");
  }

  hide() {
    this.setAttribute("hidden", "");
  }

  show() {
    this.removeAttribute("hidden");
  }

  isActive() {
    return this.getAttribute("active") == "true";
  }

  getValue() {
    return this.querySelector("[data-local-table]").innerHTML;
  }
}

customElements.define("sidebar-table", SidebarTable);
