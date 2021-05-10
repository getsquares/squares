class ActionsTabs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "flex",
      "gap-4",
      "pt-4",
      "bg-gray-50",
      "justify-between",
      "gap-1"
    );
    this.innerHTML = `
      <div class="flex gap-1">
        <actions-tab name="panes-x" label="Panes" icon="remixicon/layout-5-line.svg"></actions-tab>
        <actions-tab name="columns-x" label="Columns" icon="remixicon/layout-column-line.svg"></actions-tab>
        <actions-tab name="filter-x" label="Filter" icon="remixicon/filter-3-line.svg"></actions-tab>
        <actions-tab name="order-x" label="Order" icon="remixicon/arrow-up-down.svg"></actions-tab>
      </div>
      <div class="flex gap-1">
        <actions-btn name="refresh" label="Refresh" icon="material-icons/refresh.svg"></actions-btn>
        <actions-add></actions-add>
      </div>
    `;
  }

  deactivate() {
    $$("actions-tab", this).forEach((el) => {
      el.deactivate();
    });
  }
}

customElements.define("actions-tabs", ActionsTabs);
