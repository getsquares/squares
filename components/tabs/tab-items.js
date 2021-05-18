class TabItems extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["database", "table"];
  }

  connectedCallback() {
    this.classList.add(
      "flex",
      "items-center",
      "gap-2",
      "bg-blueGray-700",
      "overflow-auto",
      "w-full",
      "px-2",
      "self-end"
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (attr) {
        case "database":
          this.activate();
          break;
      }
    }
  }

  activate(database, table) {
    this.deactivate();

    if (this.tab(database, table)) {
      this.tab(database, table).activate();
    } else {
      this.create(database, table);
      this.last().activate();
    }
  }

  deactivate() {
    const tabs = $$("tab-item");
    if (!tabs) return;

    tabs.forEach((el) => {
      el.deactivate();
    });
  }

  create(database, table) {
    $("tab-items").insertAdjacentHTML(
      "beforeend",
      this.html(database, table, "true")
    );
  }

  html(database, table, active) {
    return `
    <tab-item database="${database}" table="${table}" active="${active}"></tab-item>`;
  }

  last() {
    return $("tab-item:last-child");
  }

  tab(database, table) {
    return $(`tab-item[database="${database}"][table="${table}"]`);
  }
}

customElements.define("tab-items", TabItems);
