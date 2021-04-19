class TabItems extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["value"];
  }

  connectedCallback() {
    this.classList.add("flex", "items-center", "gap-2", "text-white", "px-2");

    this.addTab("adas", "32asdsa");
    this.addTab("adas234", "32234asdsa");
  }

  classesBase() {
    return [
      "rounded-t",
      "px-4",
      "pr-2",
      "py-2",
      "cursor-default",
      "focus:outline-none",
      "flex",
      "gap-3",
      "items-center",
    ];
  }

  addTab(database, table) {
    this.insertAdjacentHTML(
      "beforeend",
      `
      <tab-item database="${database}" table="${table}"></tab-item>
    `
    );
    this.deactivateAllTabs();
    const added_tab = this.querySelector("tab-item:last-child");
    added_tab.activate();

    this.onClick(added_tab);
  }

  deactivateAllTabs() {
    const tab_items = this.querySelectorAll("tab-item");
    if (!tab_items) return;

    tab_items.forEach((el) => {
      el.deactivate();
    });
  }

  onClick(el) {
    el.addEventListener("mousedown", (e) => {
      if (e.currentTarget !== e.target) return;
      this.deactivateAllTabs();
      el.activate();
    });
  }
}

customElements.define("tab-items", TabItems);
