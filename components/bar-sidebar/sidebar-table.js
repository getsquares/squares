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
      ...hollowClassInactive(),
      "flex",
      "gap-2",
      "py-1",
      "px-4",
      "cursor-default",
      "select-none",
      "fill-current",
      "items-center"
    );

    this.innerHTML = `
      <img-svg src="boxicons/bx-table.svg" classes="w-4 h-4 text-navy-400"></img-svg>
      <div data-local-table class="flex-1 truncate text-13" title="${title}">${title}</div>
      
      `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active" && newValue == "true") {
        this.classList.add(...hollowClassActive());
        this.classList.remove(...hollowClassInactive());

        this.querySelector("svg").classList.replace(
          "text-navy-300",
          "text-navy-500"
        );
      } else {
        this.classList.remove(...hollowClassActive());
        this.classList.add(...hollowClassInactive());

        this.querySelector("svg").classList.replace(
          "text-navy-500",
          "text-navy-300"
        );
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
      this.test(current.database, current.table).then((test) => {});
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
