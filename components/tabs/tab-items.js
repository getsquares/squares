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

  activate() {
    this.deactivate();

    if (this.tab(state.database, state.table)) {
      this.tab(state.database, state.table).activate();
    } else {
      this.create(state.database, state.table);
      this.last().activate();
    }
  }

  close(database, table) {
    $(`tab-item[database="${database}"][table="${table}"]`).remove();
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
      this.templateTab(database, table, "true")
    );
  }

  templateTab(database, table, active) {
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
