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

    this.classList.add(
      ...[
        "flex",
        "gap-2",
        "py-1.5",
        "mx-2",
        "px-2",
        "border",
        "border-transparent",
        "hover:border-gray-200",
        "hover:bg-gray-50",
        "cursor-default",
        "select-none",
        "rounded",
        "fill-current",
      ]
    );

    this.innerHTML = `
      <div data-local-table class="ml-8 flex-1 truncate" title="${title}">${title}</div>
      `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active" && newValue == "true") {
        this.classList.add(...hollowClassActive());
        this.classList.remove(...hollowClassInactive());
      } else {
        this.classList.remove(...hollowClassActive());
        this.classList.add(...hollowClassInactive());
      }
    }
  }

  activate() {
    this.setAttribute("active", "true");

    current.table = this.getValue();
    current.database = this.closest("sidebar-database").getValue();

    const el = tab.getItem(current.database, current.table);

    if (el) {
      tabs.deactivate();
      el.activate();
    } else {
      tab.add(current.database, current.table);

      //$("resize-logo").style.width = $("sidebar-wrap").offsetWidth + "px";
      syncSidebarLogo();
      // Fetch
      console.log("tab");
      this.test(current.database, current.table).then((test) => {
        console.log(tables);
      });
    }
  }

  async test(database, table) {
    try {
      const resp = await axios.get(
        `http://localhost/tools/squares/server/php/queries/data.php?database=${database}&table=${table}`
      );
      //console.log(resp.data);

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
