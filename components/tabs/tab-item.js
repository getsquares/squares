class TabItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["title", "active"];
  }

  connectedCallback() {
    this.classList.add(...this.classesBase());
    const table = this.getTable();

    this.setAttribute("title", this.getDatabase() + "/" + table);

    let close_classes = "";

    this.innerHTML = `
      ${table}
      <img-svg src="assets/icons/remixicon/close.svg" class="rounded" classes="${close_classes}">
    `;

    if (this.getAttribute("active") == "true") {
      this.activate();
    } else {
      this.deactivate();
    }
    this.onCloseClick();
  }

  getTable() {
    return this.getAttribute("table");
  }

  getDatabase() {
    return this.getAttribute("database");
  }

  getTitle() {
    return this.getAttribute("title");
  }

  classesBase() {
    return [
      "rounded-t",
      "px-4",
      "pr-2",
      "py-2",
      "cursor-default",
      "select-none",
      "focus:outline-none",
      "flex",
      "gap-3",
      "items-center",
    ];
  }

  classesActive() {
    return ["bg-white", "text-gray-800"];
  }

  classesInactive() {
    return ["bg-blue-700", "hover:bg-blue-800"];
  }

  classesActiveClose() {
    return ["hover:bg-gray-200"];
  }

  classesInactiveClose() {
    return ["hover:bg-blue-600"];
  }

  deactivate() {
    const close_el = this.querySelector("img-svg");
    this.classList.remove(...this.classesActive());
    this.classList.add(...this.classesInactive());
    close_el.classList.remove(...this.classesActiveClose());
    close_el.classList.add(...this.classesInactiveClose());
  }

  activate() {
    const close_el = this.querySelector("img-svg");
    this.classList.add(...this.classesActive());
    this.classList.remove(...this.classesInactive());
    close_el.classList.add(...this.classesActiveClose());
    close_el.classList.remove(...this.classesInactiveClose());

    current.table = this.getTable();
    current.database = this.getDatabase();
  }

  onCloseClick() {
    this.querySelector("img-svg").addEventListener("click", () => {
      this.remove();
      // VARNA OM OSPARADE ÄNDRINGAR FINNS
      // CLOSE TABLE
    });
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "offset") {
        database.innerHTML = newValue;
      } else if (attr == "table" && table) {
        table.innerHTML = newValue;
      }
    }
  }*/
}

customElements.define("tab-item", TabItem);
