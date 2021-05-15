function tabClassActive() {
  return ["bg-navy-100", "text-navy-900", "border-navy-300"];
}

function tabClassInactive() {
  return [
    "hover:bg-gray-100",
    "bg-gray-50",
    "bg-gradient-to-b",
    "from-white",
    "to-gray-100",
    "border-gray-300",
  ];
}

function hollowClassActive() {
  return [
    "bg-navy-100",
    "text-navy-900",
    "border",
    "border-navy-300",
    "rounded",
  ];
}

function hollowClassInactive() {
  return ["hover:bg-grayExtra", "border", "border-transparent"];
}

// Event cell step
function eventCellKeydown() {
  window.addEventListener("keydown", (e) => {
    let cell_active = $('cell-ring[state="active"]');
    if (!cell_active) return;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowDown":
      case "ArrowUp":
        cell_active.handleStep(e.key);
        break;
      case "Tab":
        cell_active.handleCellTab(e);
        break;
      case "Enter":
        cell_active.handleCellEdit();
        break;
    }
  });
}

// KOPPLA IN
/*
function outsideClick() {
  document.addEventListener("click", (event) => {
    const el = document.querySelector(`[data-table]`);

    var isClickInside = el.contains(event.target);

    if (!isClickInside) {
      resetDomCellEdits();
      const el_edit = document.querySelector(`cell-ring[state="edit"]`);
      if (!el_edit) return;
      el_edit.setAttribute("state", "active");
    }
  });
}*/

function handleCellClose() {
  if (!isCellState("edit")) return;

  dom.current.cell_ring.setAttribute("state", "active");
  resetEdit();
}

class cell {
  static setPreview(html, obj) {
    $("preview-value", obj.closest("table-cell")).innerHTML = html;
  }

  static setTempValue(value, obj) {
    const db_table = table.get(obj);
    const temp_data = temp[row.getType(obj)][db_table].data;
    temp_data[row.getIndex(obj)][cell.getColumn(obj)] = value;
  }

  static getTempValue(obj) {
    const db_table = table.get(obj);
    const temp_data = temp[row.getType(obj)][db_table].data;
    return temp_data[row.getIndex(obj)][cell.getColumn(obj)];
  }

  static getColumn(obj) {
    return obj.closest("table-cell").getAttribute("column");
  }

  static isNullable() {
    return obj.closest("table-cell").getAttribute("nullable") == "true"
      ? true
      : false;
  }

  static isNull() {
    return obj.closest("table-cell").getAttribute("is_null") == "true"
      ? true
      : false;
  }
}

// Leave edit
function leaveEdit() {
  in_field = true;

  fieldClose();
}

// Field close helper
function fieldClose() {
  const el_cell_ring = $('cell-ring[state="edit"]');

  if (!el_cell_ring) return;

  const el_table_cell = el_cell_ring.closest("table-cell");
  const el_cell_edit = $("cell-edit", el_table_cell);

  el_cell_ring.setAttribute("state", "active");
  el_cell_edit.removeAttribute("active");
}

// Update preview
function updatePreview(html, obj) {
  $("preview-value", obj.closest("table-cell")).innerHTML = html;
}

function updateNull(obj) {
  const preview = $("preview", obj.closest("table-cell"));
  const preview_value = $("preview-value", obj.closest("table-cell"));
  preview_value.setAttribute("hidden", "");
  preview.setAttribute("active", "true");

  const el_null = $("preview-null", obj.closest("table-cell"));
  el_null.removeAttribute("hidden");
}

// Set cell field state
function setCellFieldState(state, el_cell) {
  el_cell.querySelector("cell-edit").setAttribute("active", state);
}

// Set cell preview state
function setCellPreviewState(state, el_cell) {
  el_cell.querySelector("cell-preview").setAttribute("active", state);
}

// Cell active index
function cellActiveIndex(el) {
  return [...el.parentElement.children].indexOf(el) + 1;
}

// Cell is active // BYT MOT FUNKTUION under
function isCellActive() {
  return dom.current && dom.current.cell_ring.getAttribute("state") == "active";
}

// Is cell state
function isCellState(state = "active") {
  return dom.current && dom.current.cell_ring.getAttribute("state") == state;
}

// Set cell active NÖDVÄNDIG?
function setCellActiveToEl(el, state = "active") {
  el.setAttribute("state", state);
}

function syncSidebarLogo() {
  $("resize-logo").style.width = $("sidebar-wrap").offsetWidth + 16 + "px";
}

function error(message) {}

function success(message) {}

class row {
  static isNew(obj) {
    return obj.closest(".row-new") ? true : false;
  }

  static getType(obj) {
    return row.isNew(obj) ? "insert" : "update";
  }

  static getIndex(obj) {
    return obj.closest("table-row").dataset.index;
  }
}

// Spread dom cell
function spreadDomCell(el_table_cell) {
  return (current = {
    table_cell: el_table_cell,
    cell_ring: el_table_cell.querySelector("cell-ring"),
    cell_edit: el_table_cell.querySelector("cell-edit"),
    cell_preview: el_table_cell.querySelector("cell-preview"),
  });
}

// Reset store
function resetStore() {
  dom.current = null;
  dom.left = null;
  dom.right = null;
  dom.up = null;
  dom.down = null;
}

// Store dom cell
function storeDomCell(el_table_cell) {
  dom.current = spreadDomCell(el_table_cell);
  dom.left = spreadDomCell(getDomCellLeft());
  dom.right = spreadDomCell(getDomCellRight());
  dom.down = spreadDomCell(getDomCellDown());
  dom.up = spreadDomCell(getDomCellUp());
}

class tab {
  // tab.activateLast()
  static activateLast() {
    const el = this.getLast();

    if (!el) return;
    el.activate();
  }

  // tab.add()
  static add(database, table) {
    tabs.deactivate();
    $("tab-items").insertAdjacentHTML(
      "beforeend",
      tab.html(database, table, "true")
    );
    tab.onClick(tab.getLast());
  }

  // tab.getItem()
  static getItem(database, table) {
    return $(`tab-item[database="${database}"][table="${table}"]`);
  }

  // tab.getLast()
  static getLast() {
    return $("tab-item:last-child");
  }

  // tab.onClose()
  static onClose(el) {
    this.onCloseClick(el);
    this.onMiddleClick(el);
  }

  // tab.onCloseClick()
  static onCloseClick(el) {
    $("img-svg", el).on("click", () => {
      tab.closeHandler(el);
    });
  }

  // tab.onMiddleClick()
  static onMiddleClick(el) {
    el.on("mouseup", (e) => {
      if (e.button !== 1) return;

      tab.closeHandler(el);
    });
  }

  // tab.html()
  static html(database, table, active) {
    return `
    <tab-item database="${database}" table="${table}" active="${active}"></tab-item>`;
  }

  // tab.deactivate()
  static deactivate(el) {
    const close_el = $("img-svg", el);
    if (!close_el) return;

    // Tab classes
    el.classList.remove(...this.classesActive());
    el.classList.add(...this.classesInactive());

    // Close classes
    close_el.classList.remove(...this.classesActiveClose());
    close_el.classList.add(...this.classesInactiveClose());
  }

  // tab.activate()
  static activate(el) {
    const close_el = $("img-svg", el);
    if (!close_el) return;

    // Tab classes
    el.classList.add(...this.classesActive());
    el.classList.remove(...this.classesInactive());

    // Close classes
    close_el.classList.add(...this.classesActiveClose());
    close_el.classList.remove(...this.classesInactiveClose());

    // Set data
    current.table = el.getAttribute("table");
    current.database = el.getAttribute("database");
  }

  static classesActive() {
    return ["bg-gray-50", "text-gray-800"];
  }

  static classesInactive() {
    return ["bg-blueGray-800", "text-blueGray-200", "hover:bg-blueGray-800"];
  }

  static classesActiveClose() {
    return ["hover:bg-gray-200"];
  }

  static classesInactiveClose() {
    return ["hover:bg-blueGray-600"];
  }

  // tab.hasActive()
  static hasActive() {
    return $('tab-item[active="true"]');
  }

  // tab.closeHandler()
  static closeHandler(el) {
    el.remove();

    // GÖR NÅGOT ÅT DETTA
    const sidebar_table = $('sidebar-table[active="true"]');
    if (!sidebar_table) return;
    sidebar_table.removeAttribute("active", "true");

    if (this.hasActive()) return;

    tab.activateLast();
  }

  // tab.onClick()
  static onClick(el) {
    el.on("mousedown", (e) => {
      if (e.currentTarget !== e.target || e.which !== 1) return;

      tabs.deactivate();
      el.activate();
    });
  }
}

class table {
  static get(obj) {
    let main = obj;
    if (obj.tagName != "PANE-MAIN") {
      main = obj.closest("pane-main");
    }

    return `${main.getAttribute("database")} ${main.getAttribute("table")}`;
  }
}

class tabs {
  // tabs.deactivate()
  static deactivate() {
    const tabs = $$("tab-item");
    if (!tabs) return;

    tabs.forEach((el) => {
      el.deactivate();
    });
  }
}

class ActionsAdd extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("btn", "btn-default");

    this.innerHTML = `
      <img-svg src="remixicon/add-circle-line.svg" classes="w-5 h-5"></img-svg>
      <div>Add</div>
    `;

    this.onClick();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
      }
    }
  }

  onClick() {
    this.addEventListener("click", () => {
      //data[`${main.getAttribute("database")} ${main.getAttribute("table")}`];
      console.log(current.database);
      const el_cell_active = $(
        `cell-ring[state="active"]`,
        this.closest("pane-main")
      );

      console.log("dooo2");
      if (!el_cell_active) return;

      console.log("dooo");

      el_cell_active.closest("table-row").addRow();
    });
  }
}

customElements.define("actions-add", ActionsAdd);

class ActionsBtn extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    const label = this.getAttribute("label");
    const icon = this.getAttribute("icon");

    this.classList.add("btn");
    this.classList.add("btn-default");

    this.innerHTML = `
      <img-svg src="${icon}" classes="w-5 h-5"></img-svg>
      <div>${label}</div>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.classList.replace("btn-default", "btn-default-active");
  }

  thisDeactivate() {
    this.classList.replace("btn-default-active", "btn-default");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("actions-btn", ActionsBtn);

class ActionsPanes extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add(
      "block",
      "bg-white",
      "border",
      "rounded",
      "border-gray-200"
    );
    this.setAttribute("hidden", "");
    this.innerHTML = `
      <panes-x></panes-x>
      <columns-x></columns-x>
      <filter-x></filter-x>
      <order-x></order-x>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.removeAttribute("hidden");
  }

  thisDeactivate() {
    this.setAttribute("hidden", "");
  }

  activate(name) {
    this.setAttribute("active", "true");

    this.querySelector(name).removeAttribute("hidden");
  }

  deactivate() {
    // Hide all panes
    [...this.children].forEach((el) => {
      el.setAttribute("hidden", "");
    });

    // Hide pane container
    this.removeAttribute("active");
  }
}

customElements.define("actions-panes", ActionsPanes);

class ActionsTab extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    const label = this.getAttribute("label");
    const icon = this.getAttribute("icon");

    this.classList.add("btn", "btn-default");

    this.innerHTML = `
      <img-svg src="${icon}" classes="w-5 h-5"></img-svg>
      <div>${label}</div>
      <img-svg src="remixicon/arrow-down-s.svg" classes="w-5 h-5 fill-current opacity-30"></img-svg>
    `;

    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      const active = this.getAttribute("active") == "true";
      const name = this.getAttribute("name");
      const panes_el = this.closest("pane-main").querySelector("actions-panes");

      console.log(panes_el);

      this.closest("pane-main").querySelector("actions-tabs").deactivate();
      panes_el.deactivate();

      if (!active) {
        this.activate();
        panes_el.activate(name);
      }
      /*
      const pane = $(`pane-${this.getAttribute("name")}`);

      $$("actions-tab").forEach((el) => {
        this.deactivate(el);
      });

      $$("pane-items > *").forEach((el) => {
        el.deactivate();
      });

      if (active) {
        pane.deactivate();
      } else {
        pane.activate();
      }*/
    });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.classList.replace("btn-default", "btn-default-active");
  }

  thisDeactivate() {
    this.classList.replace("btn-default-active", "btn-default");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("actions-tab", ActionsTab);

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
        <run-x></run-x>
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

class ActionsX extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("flex", "flex-col", "gap-4");
    this.innerHTML = `      
      <actions-tabs></actions-tabs>
      <actions-panes></actions-panes>
      `;
  }
}

customElements.define("actions-x", ActionsX);

class PaneClose extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="p-2">
        <button class="focus:outline-none hover:bg-gray-100 p-2 rounded">
          <img-svg src="remixicon/close.svg"></img-svg>
        </button>
      </div>`;
    this.onClick();
  }

  onClick() {
    $("button", this).addEventListener("click", () => {
      //this.closest(hide).deactivate();
      $("actions-panes > *:not([hidden])", this).setAttribute("hidden", "");
      $("actions-panes", this).removeAttribute("active");
      $(`actions-tab[active="true"]`, this).deactivate();
    });
  }
}

customElements.define("pane-close", PaneClose);

class ColumnsItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["checked"];
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const checked = this.getAttribute("checked");
    this.classList.add("flex");

    this.innerHTML = this.template(name, checked);
    this.onClick();
  }

  template(name, checked) {
    return `
      <label class="btn btn-borderless">
        <input type="checkbox" name="${name}" class="checkbox form-checkbox" ${
      checked ? "checked" : ""
    }>
        ${name}
      </label>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "checked") {
        this.onChange();
      }
    }
  }

  onClick() {
    $("input", this).addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        this.activate();
      } else {
        this.deactivate();
      }
    });
  }

  onChange() {
    console.log("Something has changed");
  }

  activate() {
    this.setAttribute("checked", "true");
  }

  deactivate() {
    this.removeAttribute("checked");
  }
}

customElements.define("columns-item", ColumnsItem);

class ColumnsX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-2", "flex", "flex-col", "text-sm", "p-4");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template("Columns");
  }

  checkboxes() {
    const database = this.closest("pane-main").getAttribute("database");
    const table = this.closest("pane-main").getAttribute("table");
    const data_cols_all = data[`${database} ${table}`].cols_all;
    const data_cols_active = data[`${database} ${table}`].cols_order;
    let html = "";

    data_cols_all.forEach((item) => {
      const checked = data_cols_active.includes(item);
      const checked_html = checked ? `checked="true"` : "";
      html += `<columns-item name="${item}" ${checked_html}></columns-item>`;
    });

    return html;
  }

  template(title) {
    return `
      <div class="font-bold">${title}</div>
      <div class="flex gap-x-4 gap-y-1 flex-wrap">
        ${this.checkboxes()}
      </div>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.classList.remove("hidden");
  }

  thisDeactivate() {
    this.classList.add("hidden");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("columns-x", ColumnsX);

class FilterItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("contents");
    this.innerHTML = `
      <select class="form-select actionbar-select">
        <option>hello</option>
        <option>hello2</option>
      </select>
      <select class="form-select actionbar-select">
        ${this.matchesOptions()}
      </select>
      <input type="text" class="form-input actionbar-select" />
      <filter-delete class="btn btn-default">
        <img-svg src="remixicon/delete-bin-line.svg" classes="w-5 h-5"></img-svg>
      </filter-delete>
    `;
    this.onRemove();
  }

  onRemove() {
    this.querySelector("filter-delete").addEventListener("click", (e) => {
      e.currentTarget.closest("filter-item").remove();
    });
  }

  matchesOptions() {
    const matches = [
      {
        name: "contains",
        label: "Contains",
      },
      {
        name: "not_contains",
        label: "Not contains",
      },
      {
        name: "starts_with",
        label: "Starts with",
      },
      {
        name: "ends_with",
        label: "Ends with",
      },
      {
        name: "equals",
        label: "Equals",
      },
      {
        name: "not_equals",
        label: "Not equals",
      },
      {
        name: "less_than",
        label: "Less than",
      },
      {
        name: "larger_than",
        label: "Larger than",
      },
    ];

    let html_part = [];

    matches.forEach((item) => {
      html_part.push(`<option value="${item.name}">${item.label}</option>`);
    });

    return html_part.join(" ");
  }
}

customElements.define("filter-item", FilterItem);

class FilterX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-4", "flex", "flex-col", "p-4", "text-sm");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template("Filter");
    this.onAdd();
  }

  template(title) {
    return `      
      <div class="grid grid-cols-[minmax(200px,max-content),minmax(200px,max-content),1fr,auto] gap-2 flex-col">
        <div class="contents">
          ${this.heading("Column")}
          ${this.heading("Match")}
          ${this.heading("Value")}
          ${this.heading("")}
        </div>
        <filter-items class="contents"></filter-items>
      </div>
      <div class="flex gap-2 justify-between">
        <filter-add class="btn btn-default">
          <img-svg src="remixicon/add.svg" classes="w-5 h-5"></img-svg>
          <div>Add new</div>
        </filter-add>
        <button class="btn btn-primary">
          <img-svg src="remixicon/filter-3-line.svg" classes="w-5 h-5"></img-svg>
          <div>Filter rows</div>
        </button>
      </div>
    `;
  }

  onAdd() {
    $("filter-add").addEventListener("click", () => {
      this.appendItem();
    });
  }

  appendItem() {
    const el = "<filter-item></filter-item>";
    $("filter-items").insertAdjacentHTML("beforeend", el);
  }

  heading(label) {
    return `<div class="font-bold text-sm">${label}</div>`;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.removeAttribute("hidden");
  }

  thisDeactivate() {
    this.setAttribute("hidden", "");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("filter-x", FilterX);

class OrderItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("contents");
    this.innerHTML = `
      <select class="form-select actionbar-select">
        <option>hello</option>
        <option>hello2</option>
      </select>
      <select class="form-select actionbar-select">
        ${this.matchesOptions()}
      </select>
      <order-delete class="btn btn-default">
        <img-svg src="remixicon/delete-bin-line.svg" classes="w-5 h-5"></img-svg>
      </order-delete>
    `;
    this.onRemove();
  }

  onRemove() {
    this.querySelector("order-delete").addEventListener("click", (e) => {
      e.currentTarget.closest("order-item").remove();
    });
  }

  matchesOptions() {
    const matches = [
      {
        name: "ASC",
        label: "Ascending",
      },
      {
        name: "DESC",
        label: "Descending",
      },
    ];

    let html_part = [];

    matches.forEach((item) => {
      html_part.push(`<option value="${item.name}">${item.label}</option>`);
    });

    return html_part.join(" ");
  }
}

customElements.define("order-item", OrderItem);

class OrderX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-4", "flex", "flex-col", "p-4", "text-sm");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template();
    this.onAdd();
  }

  template() {
    return `
      <div class="grid grid-cols-[minmax(200px,max-content),1fr,auto] gap-2 flex-col">
        <div class="contents">
          ${this.heading("Order by")}
          ${this.heading("Order")}
          ${this.heading("")}
        </div>
        <order-items class="contents"></order-items>
      </div>
      <div class="flex gap-2 justify-between">
        <order-add class="btn btn-default">
          <img-svg src="remixicon/add.svg" classes="w-5 h-5"></img-svg>
          <div>Add new</div>
        </order-add>
        <button class="btn btn-primary">
          <img-svg src="remixicon/arrow-up-down.svg" classes="w-5 h-5"></img-svg>
          <div>Order rows</div>
        </button>
      </div>
    `;
  }

  onAdd() {
    $("order-add").addEventListener("click", () => {
      this.appendItem();
    });
  }

  appendItem() {
    const el = "<order-item></order-item>";
    $("order-items").insertAdjacentHTML("beforeend", el);
  }

  heading(label) {
    return `<div class="font-bold text-sm">${label}</div>`;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.removeAttribute("hidden");
  }

  thisDeactivate() {
    this.setAttribute("hidden", "");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("order-x", OrderX);

class PanesItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["checked"];
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const label = this.getAttribute("label");
    const checked = this.getAttribute("checked");

    this.classList.add("flex");

    this.innerHTML = this.template(name, label, checked);
    this.onClick();
  }

  template(name, label, checked) {
    return `
      <label class="btn btn-borderless">
        <input type="checkbox" name="${name}" class="checkbox form-checkbox" ${
      checked ? "checked" : ""
    }>
        ${label}
      </label>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "checked") {
        this.onChange(newValue);
      }
    }
  }

  onClick() {
    this.querySelector("input").addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        this.activate();
      } else {
        this.deactivate();
      }
    });
  }

  onChange(checked) {
    const name = this.getAttribute("name");

    $$(name).forEach((el) => {
      if (!checked) {
        el.setAttribute("hidden", "");
      } else {
        el.removeAttribute("hidden", "");
      }

      // Sync
      $$(`panes-item[name="${name}"]`).forEach((item) => {
        if (!checked) {
          item.removeAttribute("checked");
        } else {
          item.setAttribute("checked", "true");
        }
        item.querySelector("input").checked = checked;
      });
    });
  }

  activate() {
    this.setAttribute("checked", "true");
  }

  deactivate() {
    this.removeAttribute("checked");
  }
}

customElements.define("panes-item", PanesItem);

class PanesX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-2", "flex", "flex-col", "p-4", "text-sm");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template();
  }

  checkboxes() {
    return `
      <panes-item name="topbar-wrap" label="Top" checked="true"></panes-item>
      <panes-item name="sidebar-wrap" label="Sidebar" checked="true"></panes-item>
      <panes-item name="pagination-x" label="Footer" checked="true"></panes-item>
    `;
  }

  template() {
    return `
      <div class="font-bold">Panes</div>
      <div class="flex gap-4">
        ${this.checkboxes()}
      </div>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.classList.remove("hidden");
  }

  thisDeactivate() {
    this.classList.add("hidden");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("panes-x", PanesX);

class DeleteX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("btn", "btn-default");
    this.innerHTML = `
      <img-svg src="remixicon/delete-bin-line.svg" classes="w-5 h-5"></img-svg>
      Delete checked
    `;
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      $$(".row-new[active]").forEach((el) => {
        el.remove();
      });

      this.delete();

      /* {
        id: 3
        database: asdas
        table: asdas
      }
      {
        id: 3
        database: asdas
        table: asdas
      }
      */
    });
  }

  async delete() {
    const ids = [1, 2, 3];
    try {
      const resp = await axios.post(
        `http://localhost/tools/squares/server/php/queries/delete.php?database=asda&table=asda`,
        {
          ids: ids,
        }
      );

      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
}

customElements.define("delete-x", DeleteX);

class PaginationX extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="flex justify-between pb-4 bg-gray-50">
      <row-actions></row-actions>
      <div class="flex gap-4">
        ${this.buttonTemplate("prev", "remixicon/arrow-left-s-line.svg")}
        <records-x offset="101" rows="100" total="120234233"></records-x>
        ${this.buttonTemplate("next", "remixicon/arrow-right-s-line.svg")}
      </div>
    </div>
    `;
  }

  /*
bg-red-100
bg-red-200
bg-red-300
bg-red-400
bg-red-500
bg-red-600
bg-red-700
bg-red-800
bg-red-900

border-red-100
border-red-200
border-red-300
border-red-400
border-red-500
border-red-600
border-red-700
border-red-800
border-red-900
*/

  buttonTemplate(direction, icon) {
    return `
      <records-${direction} class="py-1.5 px-2 select-none flex gap-1 items-center hover:bg-grayExtra rounded">
        <img-svg src="${icon}" classes="w-5 h-5">
      </records-${direction}>`;
  }
}
customElements.define("pagination-x", PaginationX);

class RecordsX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["limit", "rows", "total"];
  }

  connectedCallback() {
    this.classList.add("text-13", "items-center", "flex");
    this.update();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.update();
    }
  }

  update() {
    const offset = this.getAttribute("offset");
    const rows = this.getAttribute("rows");
    const total = this.getAttribute("total");

    this.innerHTML = this.template(offset, rows, total);
  }

  template(offset, rows, total) {
    const from = offset;
    const to = parseInt(offset) + parseInt(rows);
    const all = parseInt(total).toLocaleString("en-US");

    return `${from}-${to} of ${all}`;
  }
}
customElements.define("records-x", RecordsX);

class RowActions extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("invisible", "flex", "gap-1");
    this.innerHTML = `
      <delete-x></delete-x>
      <clone-x class="btn btn-default">
        <img-svg src="remixicon/file-copy-2-line.svg" classes="w-5 h-5"></img-svg>
        Duplicate checked
      </clone-x>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  toggle() {
    const is_checked = $("row-select input:checked", this.closest("pane-main"));
    if (!is_checked) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  thisActivate() {
    this.classList.remove("invisible");
  }

  thisDeactivate() {
    this.classList.add("invisible");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}
customElements.define("row-actions", RowActions);

class RunX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("btn", "btn-primary");
    this.innerHTML = `
      <img-svg src="remixicon/flashlight-fill.svg" classes="w-5 h-5"></img-svg>
      Run queries
    `;
    //this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      this.run();
    });
  }

  async run() {
    const ids = [1, 2, 3];
    try {
      const resp = await axios.post(
        `http://localhost/tools/squares/server/php/queries/delete.php?database=asda&table=asda`,
        {
          ids: ids,
        }
      );

      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
}

customElements.define("run-x", RunX);

class SidebarDatabaseLoading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "flex",
      "gap-2",
      "py-1",
      "px-2",
      "cursor-default",
      "select-none",
      "fill-current",
      "items-center"
    );
    this.innerHTML = `
      <img-svg src="material-icons/refresh.svg" classes="animate-spin w-4 h-4 text-gray-400"></img-svg>
      <div data-local-table class="flex-1 truncate text-13">Loading...</div>
    `;
  }
}

customElements.define("sidebar-database-loading", SidebarDatabaseLoading);

class SidebarDatabaseRefresh extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      ...hollowClassInactive(),
      "flex",
      "gap-2",
      "py-1",
      "px-2",
      "cursor-default",
      "select-none",
      "fill-current",
      "items-center"
    );
    this.innerHTML = `
      <img-svg src="material-icons/refresh.svg" classes="w-4 h-4 text-gray-400"></img-svg>
      <div data-local-table class="flex-1 truncate text-13">Refresh</div>
    `;

    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      this.closest("sidebar-database").populate();
    });
  }
}

customElements.define("sidebar-database-refresh", SidebarDatabaseRefresh);

class SidebarDatabase extends HTMLElement {
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
      <div data-database class="${hollowClassInactive().join(
        " "
      )} flex gap-2 px-2 py-1 cursor-default select-none fill-current items-center">
        <img-svg src="remixicon/database-2-fill.svg" classes="w-4 h-4 text-yellow-500"></img-svg>
        <div data-local-database class="flex-1 truncate font-bold text-sm">${title}</div>
        <img-svg data-arrow src="remixicon/arrow-down-s.svg" classes="transform rotate-180 w-4 h-4"></img-svg>
      </div>

      <div data-tables hidden></div>
      `;
    this.onClickDatabase();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      const arrow = this.querySelector("[data-arrow] svg");

      if (arrow) {
        if (attr == "active" && newValue == "true") {
          arrow.classList.remove("rotate-180");
        } else {
          arrow.classList.add("rotate-180");
        }
      }
    }
  }

  onClickDatabase() {
    this.querySelector("[data-database]").addEventListener("click", (e) => {
      if (this.isActive()) {
        this.deactivate();
      } else {
        this.activate();
      }
    });
  }

  onClickTable(el) {
    el.addEventListener("click", () => {
      if (el.isActive()) {
        el.deactivate();
      } else {
        el.activate();
      }
    });
  }

  deactivateAllTables() {
    $$("sidebar-table").forEach((item) => {
      item.deactivate();
    });
  }

  activate() {
    const tables = this.querySelector("[data-tables]");
    this.setAttribute("active", "true");
    this.querySelector("[data-tables]").removeAttribute("hidden");

    if (tables.innerHTML == "") {
      this.populate();
      /*

      tables.querySelectorAll("sidebar-table").forEach((item) => {
        item.addEventListener("click", (e) => {
          const el = e.currentTarget;
          this.deactivateAllTables();
          el.activate();

          const offset = 1;
          const rows = 300;
          const total = 1235;

          $("bar-footer-items").setAttribute("database", this.getValue());
          $("bar-footer-items").setAttribute("table", el.getValue());
          $("bar-footer-items").setRecords(offset, rows, total);
        });
      });*/
    }
  }

  populate() {
    const tables = this.querySelector("[data-tables]");
    tables.innerHTML = `<sidebar-database-loading></sidebar-database-loading>`;

    axios
      .get(
        "http://localhost/tools/squares/server/php/queries/tables.php?database=" +
          this.getValue()
      )
      .then((response) => {
        if (response.status !== 200) return;

        let html = `
        <sidebar-database-refresh></sidebar-database-refresh>
        `;

        response.data.forEach((title) => {
          html += this.template(title);
        });

        tables.innerHTML = html;
        $("sidebar-filter").filter(tables);
        this.populateEvents(tables);
      });
  }

  populateEvents(tables) {
    tables.querySelectorAll("sidebar-table").forEach((item) => {
      item.addEventListener("click", (e) => {
        const el = e.currentTarget;
        this.deactivateAllTables();
        el.activate();

        /*const offset = 1;
        const rows = 300;
        const total = 1235;*/

        //$("bar-footer-items").setAttribute("database", this.getValue());
        //$("bar-footer-items").setAttribute("table", el.getValue());
        //$("bar-footer-items").setRecords(offset, rows, total);
      });
    });
  }

  template(title) {
    return `<sidebar-table title="${title}"></sidebar-table>`;
  }

  deactivate() {
    this.removeAttribute("active");
    this.querySelector("[data-tables]").setAttribute("hidden", "");
  }

  isActive() {
    return this.getAttribute("active") == "true";
  }

  getValue() {
    return this.querySelector("[data-local-database]").innerHTML;
  }
}

customElements.define("sidebar-database", SidebarDatabase);

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

        let html = "";

        response.data.forEach((title) => {
          html += this.template(title);
        });

        this.innerHTML += html;
      });
  }
}

customElements.define("sidebar-databases", SidebarDatabases);

class SidebarFilter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <label class="flex flex-col gap-2">
        <div class="uppercase font-bold text-sm">Filter tables</div>
        <input spellcheck="false" placeholder="Show matching tables..." type="text" class="form-input bg-white border-gray-200 text-sm rounded focus:ring-0 focus:border-gray-400">
      </label>
    `;
    this.onChange();
  }

  onChange() {
    this.querySelector("input").addEventListener("input", () => {
      this.filter();
    });
  }

  filter() {
    const value = $("sidebar-filter input").value;

    $$("sidebar-table").forEach((item) => {
      if (item.getValue().includes(value)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }
}

customElements.define("sidebar-filter", SidebarFilter);

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

    const el = tab.getItem(current.database, current.table);

    if (el) {
      tabs.deactivate();
      el.activate();

      $$("pane-main").forEach((item) => {
        item.deactivate();
      });

      const current_el = $(
        `pane-main[database="${current.database}"][table="${current.table}"]`
      );

      current_el.activate();
    } else {
      tab.add(current.database, current.table);

      syncSidebarLogo();
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

class SidebarWrap extends HTMLElement {
  constructor() {
    super();
  }

  /*
  bg-navy-50
  bg-navy-100
  bg-navy-200
  bg-navy-300
  bg-navy-400
  bg-navy-500
  bg-navy-600
  bg-navy-700
  bg-navy-800
  bg-navy-900

  bg-gray-50
  bg-gray-100
  bg-gray-200
  bg-gray-300
  bg-gray-400
  bg-gray-500
  bg-gray-600
  bg-gray-700
  bg-gray-800
  bg-gray-900
  */

  connectedCallback() {
    this.classList.add(
      ...[
        "flex",
        "flex-col",
        "pb-4",
        "overflow-auto",
        "resize-x",
        "bg-gray-50",
        "w-80",
        "gap-4",
        "pl-4",
      ]
    );
    this.innerHTML = `
      <h2 class="pt-4 text-sm text-gray-400 uppercase">Databases and tables</h2>
      <sidebar-filter></sidebar-filter>
      <sidebar-databases></sidebar-databases>
    `;
  }
}

customElements.define("sidebar-wrap", SidebarWrap);

class IconDatabase2 extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["classes"];
  }

  connectedCallback() {
    this.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M5 12.5c0 .313.461.858 1.53 1.393C7.914 14.585 9.877 15 12 15c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171C17.35 11.349 14.827 12 12 12s-5.35-.652-7-1.671V12.5zm14 2.829C17.35 16.349 14.827 17 12 17s-5.35-.652-7-1.671V17.5c0 .313.461.858 1.53 1.393C7.914 19.585 9.877 20 12 20c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171zM3 17.5v-10C3 5.015 7.03 3 12 3s9 2.015 9 4.5v10c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5zm9-7.5c2.123 0 4.086-.415 5.47-1.107C18.539 8.358 19 7.813 19 7.5c0-.313-.461-.858-1.53-1.393C16.086 5.415 14.123 5 12 5c-2.123 0-4.086.415-5.47 1.107C5.461 6.642 5 7.187 5 7.5c0 .313.461.858 1.53 1.393C7.914 9.585 9.877 10 12 10z"
          />
        </svg>
      `;

    this.querySelector("svg").setAttribute("class", this.classes);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.classes = newValue;
    }
  }
}

customElements.define("icon-database-2", IconDatabase2);

class ModalInfo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col flex-1 gap-6">
        <div class="flex gap-3 items-center">
          <img-svg src="remixicon/checkbox-multiple-blank.svg" classes="h-12 w-12"></img-svg>
          <img-svg
            src="logo.svg"
            classes="h-10"
          ></img-svg>
        </div>
        we rjiweor jweior jweior jwer iowejrio wejrweiojr weiorj weiorj
        weiorj iowerj weiorj weiorjwe

        <!-- Links -->
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold">Links</h2>
          <ul class="list-disc list-inside">
            <li>
              <a
                href="https://github.com/getsquares/squares"
                target="_blank"
                class="text-blue-600 underline"
                >Github</a
              >
            </li>
            <li>
              <a
                href="https://github.com/getsquares/squares"
                target="_blank"
                class="text-blue-600 underline"
                >Documentation</a
              >
            </li>
          </ul>
        </div>

        <!-- Dependencies -->
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold">Dependencies</h2>
          <ul class="list-disc list-inside">
            <li>
              <a
                href="https://remixicon.com/"
                target="_blank"
                class="text-blue-600 underline"
                >Remixicon</a
              >
            </li>
            <li>
              <a
                href="https://fonts.google.com/icons"
                target="_blank"
                class="text-blue-600 underline"
                >Material Icons</a
              >
            </li>
          </ul>
        </div>

        <!-- Dependencies -->
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold">License</h2>
          <p>
            Free to use with some limitations. You are not allowed to use
            the source code in your own projects.
          </p>
        </div>
        
        <!-- Purchase -->
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-bold">Purchase</h2>
            <p>
              By purchasing to this product, you will support the software
              now and in the future.
            </p>
          </div>
          <div class="flex gap-2">
            <div>
              <button-item title="Purchase" href="#" style="action"></button-item>
            </div>
            <div>
              <button-item title="Cancel" style="ghost"></button-item>
            </div>
          </div>
        </div>
      </div>
    `;
    this.onCancel();
  }
  /*onCancel() {
    this.querySelector("button-item").addEventListener("click", () => {
      $("modal-box").deactivate();
    });
  }*/

  onCancel() {
    this.querySelector(`button-item[style="ghost"]`).addEventListener(
      "click",
      () => {
        $("modal-box").deactivate();
      }
    );
  }
}

customElements.define("modal-info", ModalInfo);

class ModalLogout extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col flex-1 gap-6">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-bold">Logout</h2>
            <p>
              You you want to logout?
            </p>
          </div>
          <div class="flex gap-2">
            <div>
              <button-item href="#" title="Logout" style="default"></button-item>
            </div>
            <div>
              <button-item title="Cancel" style="ghost"></button-item>
            </div>
          </div>
        </div>
      </div>
    `;
    this.onCancel();
  }

  onCancel() {
    this.querySelector(`button-item[style="ghost"]`).addEventListener(
      "click",
      () => {
        $("modal-box").deactivate();
      }
    );
  }
}

customElements.define("modal-logout", ModalLogout);

class CellEdit extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active", "is_null", "nullable"];
  }

  connectedCallback() {
    this.toggleActive();
  }

  set nullable(value) {
    this.nullableValue = value;
  }
  get nullable() {
    return this.nullableValue;
  }

  set active(value) {
    this.activeValue = value;
  }
  get active() {
    return this.activeValue;
  }

  set is_null(value) {
    this.nullValue = value;
  }
  get is_null() {
    return this.nullValue;
  }

  toggleActive() {
    if (this.active) {
      this.thisActivate();
    } else {
      this.thisDeactivate();
    }
  }

  toggleNull() {
    if (!this.nullable) return;
    if (this.is_null) {
      this.setChecked(true);
    } else {
      this.setChecked(false);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (attr) {
        case "active":
          this.active = newValue == "true" ? true : false;
          this.toggleActive();
          break;
        case "is_null":
          this.is_null = newValue == "true" ? true : false;
          this.toggleNull();
          break;
        case "nullable":
          this.nullable = newValue == "true" ? true : false;
          break;
      }
    }
  }

  setChecked(value) {
    const checkbox = $('input[type="checkbox"][name="null"]');
    if (!checkbox) return;

    $('input[type="checkbox"][name="null"]').checked = value;
  }

  populate() {
    const has_null =
      this.closest("table-cell").getAttribute("nullable") == "true"
        ? true
        : false;
    let html_null = "";
    if (has_null) {
      html_null = `
        <label class="flex gap-2 items-center">
          <input type="checkbox" class="checkstyle-white form-checkbox" name="null">
          <div class="italic">NULL</div>
        </label>
      `;
    }
    let html = `
      ${html_null}
      <field-text></field-text>
    `;

    this.innerHTML = html;

    if (!has_null) return;

    this.onClickNull();
  }

  onClickNull() {
    $('input[type="checkbox"][name="null"]', this).addEventListener(
      "click",
      (e) => {
        const checked = e.currentTarget.checked ? true : false;
        $("cell-preview", this.closest("table-cell")).setAttribute(
          "is_null",
          checked
        );
        this.setAttribute("is_null", checked);
      }
    );
  }

  thisActivate() {
    this.removeAttribute("hidden");
    this.populate();
    this.toggleNull();
  }

  thisDeactivate() {
    this.setAttribute("hidden", "");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("cell-edit", CellEdit);

class CellPreview extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active", "is_null", "nullable"];
  }

  connectedCallback() {
    this.innerHTML = `
      <preview-null class="text-opacity-50 text-gray-800 italic" hidden>NULL</preview-null>
      <preview-value></preview-value>
    `;

    this.toggleActive();
    this.toggleNull();
  }

  set nullable(value) {
    this.nullableValue = value;
  }
  get nullable() {
    return this.nullableValue;
  }

  set active(value) {
    this.activeValue = value;
  }
  get active() {
    return this.activeValue;
  }

  set is_null(value) {
    this.nullValue = value;
  }
  get is_null() {
    return this.nullValue;
  }

  toggleNull() {
    if (!this.nullable) return;
    if (!$("preview-null", this)) return;

    if (this.is_null) {
      this.showNull();
    } else {
      this.showValue();
    }
  }

  toggleActive() {
    if (this.active) {
      this.thisActivate();
    } else {
      this.thisDeactivate();
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (attr) {
        case "active":
          this.active = newValue == "true" ? true : false;
          this.toggleActive();
          break;
        case "is_null":
          this.is_null = newValue == "true" ? true : false;
          this.toggleNull();
          break;
        case "nullable":
          this.nullable = newValue == "true" ? true : false;
          break;
      }
    }
  }

  showNull() {
    $("preview-null", this).removeAttribute("hidden");
    $("preview-value", this).setAttribute("hidden", "");
  }

  showValue() {
    $("preview-null", this).setAttribute("hidden", "");
    $("preview-value", this).removeAttribute("hidden");
  }

  thisActivate() {
    this.removeAttribute("hidden");
  }

  thisDeactivate() {
    this.setAttribute("hidden", "");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("cell-preview", CellPreview);

class CellRing extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["state"];
  }

  connectedCallback() {
    this.onClick();
    this.onDblClick();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "state") return;
    if (oldValue !== newValue) {
      if (newValue != "default") {
        this.xEdges();
      }
    }
  }

  // Events

  onClick() {
    this.addEventListener("click", (e) => {
      this.handleCellActive(e);
    });
  }

  onDblClick() {
    this.addEventListener("dblclick", () => {
      this.handleCellEdit();
    });
  }

  handleStep(key) {
    switch (key) {
      case "ArrowLeft":
        this.stepLeft();
        break;
      case "ArrowRight":
        this.stepRight();
        break;
      case "ArrowUp":
        this.stepUp();
        break;
      case "ArrowDown":
        this.stepDown();
        break;
    }
  }

  stepLeft() {
    const prev = this.closest("table-cell").previousElementSibling;

    if (!prev) return;
    if (prev.tagName !== "TABLE-CELL") return;

    $("cell-ring", prev).handleCellActive();
  }

  stepRight() {
    const next = this.closest("table-cell").nextElementSibling;

    if (!next) return;
    if (next.tagName !== "TABLE-CELL") return;

    $("cell-ring", next).handleCellActive();
  }

  stepDown() {
    const el_table = this.closest("table-cell");
    const index = cellActiveIndex(el_table);
    const down = el_table.parentElement.nextElementSibling;

    if (!down) return;
    if (down.tagName !== "TABLE-ROW") return;
    $(`table-cell:nth-child(${index}) cell-ring`, down).handleCellActive();
  }

  stepUp() {
    const el_table = this.closest("table-cell");
    const index = cellActiveIndex(el_table);
    const up = el_table.parentElement.previousElementSibling;

    if (!up) return;
    if (up.tagName !== "TABLE-ROW") return;
    $(`table-cell:nth-child(${index}) cell-ring`, up).handleCellActive();
  }

  handleCellTab(e) {
    e.preventDefault();
    this.handleStep(e.shiftKey ? "ArrowLeft" : "ArrowRight");
  }

  /*handleCellEscape() {
    e.preventDefault();
  
    dom.current.cell_ring.setAttribute("state", "default");
    resetStore();
  }*/

  // Handlers

  handleCellActive() {
    const is_active = this.getAttribute("state") == "active";
    if (is_active) return;
    this.closest("table-cells").deactivateCells();
    this.setAttribute("state", "active");
  }

  handleCellEdit() {
    if (in_field) {
      in_field = false;
      return;
    }
    this.setAttribute("state", "edit");

    $("cell-edit", this.closest("table-cell")).activate();
  }

  xEdges() {
    const prev_el = this.closest("table-cell").previousElementSibling;
    const next_el = this.closest("table-cell").nextElementSibling;

    if (prev_el.tagName == "ROW-SELECT") this.classList.add("ml-2px");
    if (!next_el) this.classList.add("mr-2px");
  }
}

customElements.define("cell-ring", CellRing);

class RowSelect extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add(
      "relative",
      "flex",
      "sticky",
      "z-50",
      "left-0",
      "heading-bkg"
    );
    this.innerHTML = `
      <label class="tp relative">
        <input type="checkbox" class="checkstyle form-checkbox" name="test" />
        <div class="absolute block inset-0 shadow-y"></div>
      </label>
    `;
    this.onClick();
  }

  onClick() {
    this.querySelector("input").addEventListener("input", (e) => {
      const checked = e.currentTarget.checked;
      const el_cells = this.closest(".contents").querySelectorAll(
        "row-select, table-cell"
      );

      if (checked) {
        this.closest("table-row").setAttribute("active", "true");
      } else {
        this.closest("table-row").removeAttribute("active");
      }

      el_cells.forEach((el) => {
        if (checked) {
          this.selectOne(el);
        } else {
          this.deselectOne(el);
        }
      });
      $("row-actions").toggle();
    });
  }

  selectOne(el) {
    el.classList.add("bg-navy-100");
    el.classList.remove("bg-white");
  }

  deselectOne(el) {
    el.classList.remove("bg-navy-100");
    el.classList.add("bg-white");
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("row-select", RowSelect);

class TableCell extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value", "null"];
  }

  connectedCallback() {
    const is_null = this.getAttribute("null");
    const nullable = this.getAttribute("nullable");
    this.classList.add("relative", "bg-white");
    const value = this.getAttribute("value");
    this.innerHTML = `
      <cell-ring state="default"></cell-ring>
      <cell-edit is_null="${is_null}" nullable="${nullable}"></cell-edit>
      <cell-preview is_null="${is_null}" nullable="${nullable}" active="true"></cell-preview>
    `;
    $("preview-value", this).innerHTML = value;
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("table-cell", TableCell);

class TableCells extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("contents");
    this.innerHTML = this.template();

    const el_first_ring = $("cell-ring", this.closest("table-cells"));
    if (!el_first_ring) return;

    el_first_ring.setAttribute("state", "active");
  }

  template() {
    const this_data = data[table.get(this)];
    const cols = this_data.cols_order;

    let html = "<table-row-ghost></table-row-ghost>";
    let table_cols = "";

    this_data.rows.forEach((row) => {
      table_cols = "";
      cols.forEach((item) => {
        const value = row[item];
        table_cols += `<table-cell value="${value}" column="${item}"></table-cell>`;
      });

      html += `
        <table-row>
          <row-select></row-select>
          ${table_cols}
        </table-row>
      `;
    });

    return html;
  }

  deactivateCells() {
    this.deactivateCellEdit();
    this.deactivateCellRing();
  }

  deactivateCellRing() {
    const el_cell = $(
      'cell-ring[state="active"], cell-ring[state="edit"]',
      this
    );

    if (!el_cell) return;

    el_cell.setAttribute("state", "default");
  }

  deactivateCellEdit() {
    const el_edit = $("cell-edit[active]", this);

    if (!el_edit) return;

    el_edit.innerHTML = "";
    el_edit.removeAttribute("active");
  }
}

customElements.define("table-cells", TableCells);

class TableHeadingCheck extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "sticky",
      "top-0",
      "z-[600]",
      "flex",
      "sticky",
      "bg-gray-100",
      "heading-bkg",
      "left-0"
    );

    this.innerHTML = `
      <label class="tp relative heading-bkg flex items-center bg-gray-100">
        <input type="checkbox" class="form-checkbox checkstyle-white" name="test" />
      </label>
    `;
    this.onChange();
  }

  keyHtml() {
    return `<img-svg src="remixicon/key-2-line.svg"></img-svg>`;
  }

  onChange() {
    this.querySelector("input").addEventListener("change", (e) => {
      const checked = e.currentTarget.checked;

      $$("row-select").forEach((item) => {
        item.querySelector("input").checked = checked;

        if (checked) {
          this.selectAll();
        } else {
          this.deselectAll();
        }
      });
    });
  }

  selectAll() {
    $$("[data-cells] row-select").forEach((item) => {
      $$("row-select, table-cell", item.closest("table-row")).forEach((el) => {
        item.selectOne(el);
      });
    });
  }

  deselectAll() {
    $$("[data-cells] row-select").forEach((item) => {
      const el_cells = item
        .closest(".contents")
        .querySelectorAll("row-select, table-cell");

      el_cells.forEach((el) => {
        item.deselectOne(el);
      });
    });
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "title") return;
    if (oldValue !== newValue) {
      this.title = newValue;
    }
  }*/
}

customElements.define("table-heading-check", TableHeadingCheck);

class TableHeading extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["title"];
  }

  connectedCallback() {
    const id = this.getAttribute("key");
    const title = this.getAttribute("title");
    const type = this.getAttribute("fieldtype");
    const key_html = id ? this.keyHtml() : "";

    this.classList.add(
      "tp",
      "heading-bkg",
      "font-bold",
      "flex",
      "gap-2",
      "items-center",
      "text-sm",
      "sticky",
      "top-0",
      "z-[500]",
      "bg-gray-100"
    );
    this.innerHTML = `
      ${key_html}
      <div class="flex flex-col gap-1">
        <div>
          <div class="text-opacity-60 text-black inline-block py-0.5 text-xs font-normal rounded">${type}</div>
        </div>
        ${title}
      </div>
    `;
  }

  keyHtml() {
    return `<img-svg src="remixicon/key-2-line.svg" classes="w-5 h-5"></img-svg>`;
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "title") return;
    if (oldValue !== newValue) {
      this.title = newValue;
    }
  }*/
}

customElements.define("table-heading", TableHeading);

class TableHeadings extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("z-40", "contents");

    this.innerHTML = this.template();
  }

  template() {
    const this_data = data[table.get(this)];
    const cols = this_data.cols_order;
    let html = `<table-heading-check></table-heading-check>`;

    cols.forEach((item) => {
      const col = this_data.cols[item];
      const key = col.config && col.config.id ? `key="true"` : "";
      html += `
        <table-heading title="${item}" fieldtype="${col.meta.Type}" ${key}></table-heading>
      `;
    });

    return html;
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }*/
}

customElements.define("table-headings", TableHeadings);

class TableRowGhost extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["value"];
  }

  connectedCallback() {
    this.setAttribute("hidden", "");
    this.innerHTML = this.template();
  }

  template() {
    const table_cells = this.templateTableCells();
    return this.templateFirstTableRow(table_cells);
  }

  templateTableCells() {
    const table_name = table.get(this);
    const this_data = data[table_name];
    let html = "";

    temp["insert"][table_name] = {
      defaults: {},
      data: [],
    };

    this_data.cols_order.forEach((name) => {
      const nullable = this.isNullable(this_data, name);
      const value = this.parseDefault(this_data, name);

      if (this_data.meta.id !== name) {
        temp["insert"][table_name]["defaults"][name] =
          nullable == "true" ? "" : value;
      }

      html += this.templateTableCell(nullable, value, name);
    });

    return html;
  }

  templateFirstTableRow(html_first) {
    return `
      <template data-first>
        <table-row class="contents row-new">
          <row-select></row-select>
          ${html_first}
        </table-row>
      </template>
    `;
  }

  templateTableCell(nullable, value, column) {
    return `
      <table-cell
        nullable="${nullable}"
        value="${value}"
        null="${nullable}"
        column="${column}">
      </table-cell>
    `;
  }

  parseDefault(this_data, name) {
    let value = this_data.cols[name].meta.Default;

    value = this.trimNull(value);
    value = this.trimQuotes(value);

    return value;
  }

  trimNull(value) {
    if (value !== null) return value;
    return "";
  }

  trimQuotes(value) {
    if (!value.startsWith("'")) return value;
    if (!value.endsWith("'")) return value;

    return value.slice(1, -1);
  }

  isNullable(this_data, name) {
    return this_data.cols[name].meta.Null == "YES" ? "true" : "false";
  }
}

customElements.define("table-row-ghost", TableRowGhost);

class TableRow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("contents");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  addRow() {
    const main = this.closest("pane-main");
    const db_name = `${main.getAttribute("database")} ${main.getAttribute(
      "table"
    )}`;
    const row = $("[data-first]", this.closest("pane-main")).innerHTML;

    this.insertAdjacentHTML("afterend", row);

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    this.nextElementSibling.dataset.index = timestamp;

    temp["insert"][db_name].data[timestamp] = temp["insert"][db_name].defaults;
  }

  thisActivate() {
    this.classList.add("row-primary");
  }

  thisDeactivate() {
    this.classList.remove("row-primary");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("table-row", TableRow);

class TabItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["title", "label", "active"];
  }

  connectedCallback() {
    this.classList.add(
      ...[
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
        "text-sm",
      ],
      ...tab.classesInactive()
    );

    this.setAttribute(
      "title",
      this.getAttribute("database") + "/" + this.getAttribute("table")
    );

    this.innerHTML = `
      ${this.getAttribute("table")}
      <img-svg src="remixicon/close.svg" classes="rounded w-5 h-5">
    `;

    tab.onClose(this);
    tab.onClick(this);
  }

  deactivate() {
    this.removeAttribute("active");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (attr) {
      case "active":
        if (newValue == "true") {
          tab.activate(this);
        } else {
          tab.deactivate(this);
        }
        break;
    }
  }
}

customElements.define("tab-item", TabItem);

class TabItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "flex",
      "flex-1",
      "items-center",
      "gap-2",
      "text-white",
      "overflow-auto",
      "w-full",
      "self-end"
    );
  }
}

customElements.define("tab-items", TabItems);

class ActionbarInfo extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    this.innerHTML =
      `
      <div data-action>
        <img-svg src="remixicon/info.svg" classes="w-5 h-5">
        <div>Info</div>
      </div>kkk
    ` + this.modal();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "active") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }
  }

  onClick() {}

  modal() {
    return `
    <div class="bg-black inset-0">test</div>
    `;
  }
}

customElements.define("actionbar-info", ActionbarInfo);

class TopbarItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex gap-2 text-sm text-white py-2">
        ${this.itemHtml("info", "Info", "remixicon/question-fill.svg")}
        ${this.itemHtml(
          "logout",
          "Logout",
          "material-icons/logout_black_24dp.svg"
        )}
      </div>
    `;
    this.onClick();
  }

  itemHtml(name, title, src) {
    return `
      <div title="${title}" data-action="${name}" class="flex items-center gap-1 fill-current px-2 py-1.5 select-none hover:bg-black hover:bg-opacity-20 rounded"
      >
      <img-svg src="${src}"></img-svg>
    </div>
    `;
  }

  onClick() {
    this.querySelectorAll("[data-action]").forEach((item) => {
      item.addEventListener("click", (e) => {
        const el = e.currentTarget;
        const name = el.getAttribute("data-action");

        if (["info", "logout"].includes(name)) {
          $(
            "[data-modal-content]"
          ).innerHTML = `<modal-${name}></modal-${name}>`;
          $("modal-box").activate();
        }
      });
    });
  }
}

customElements.define("topbar-items", TopbarItems);

class TopbarWrap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div
      class="flex items-center justify-between pr-2 text-gray-200 bg-blueGray-700"
    >
      <resize-logo>
        <div class="pl-4 pr-8 flex items-center gap-2 text-2xl text-white uppercase">
          <img-svg
            src="remixicon/checkbox-multiple-blank.svg"
          ></img-svg>
          <img-svg src="logo.svg" classes="h-5"></img-svg>
        </div>
      </resize-logo>
      <tab-items></tab-items>
      <topbar-items></topbar-items>
    </div>
    `;
  }
}

customElements.define("topbar-wrap", TopbarWrap);

class ActionbarRefresh extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div data-action>
        <img-svg src="material-icons/refresh.svg" classes="animate-spin w-5 h-5"></img-svg>
        <div>Refresh</div>
      </div>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "active") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }
  }
}

customElements.define("actionbar-refresh", ActionbarRefresh);

class ButtonItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const href = this.getAttribute("href");
    const title = this.getAttribute("title");
    this.removeAttribute("title");
    let html = "";

    if (href) {
      html = this.linkHtml(title, href);
    } else {
      html = this.buttonHtml(title, href);
    }

    this.innerHTML = html;
  }

  getClasses() {
    const style = this.getAttribute("style");
    let classes = "";

    switch (style) {
      case "default":
        classes = this.classesStyleDefault();
        break;
      case "action":
        classes = this.classesStyleAction();
        break;
      case "ghost":
        classes = this.classesStyleGhost();
        break;
    }

    return this.classesBase().concat(classes);
  }

  linkHtml(title, href) {
    return `<a href="${href}" class="${this.getClasses().join(
      " "
    )}">${title}</a>`;
  }

  buttonHtml(title) {
    return `<button class="focus:outline-none cursor-default ${this.getClasses().join(
      " "
    )}">${title}</button>`;
  }

  classesBase() {
    return [
      "inline-flex",
      "items-center",
      "gap-2",
      "px-4",
      "py-1.5",
      "font-bold",
      "rounded",
      "fill-current",
    ];
  }

  classesStyleDefault() {
    return [
      "text-white",
      "border-2",
      "bg-blueGray-700",
      "border-black",
      "hover:bg-blueGray-800",
    ];
  }

  classesStyleAction() {
    return [
      "text-white",
      "bg-gradient-to-br",
      "from-navy-500",
      "via-navy-600",
      "to-navy-600",
      "hover:from-navy-600",
      "border",
      "border-navy-600",
    ];
  }

  classesStyleGhost() {
    return ["border-2", "border-gray-200", "hover:border-gray-400"];
  }
}

customElements.define("button-item", ButtonItem);

class CheckboxItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const label = this.getAttribute("label");
    const checked = this.getAttribute("checked") == "true" ? " checked" : "";

    this.innerHTML = `
      <label class="flex select-none items-center gap-2">
        <input type="checkbox" class="form-checkbox w-4 h-4 rounded focus:outline-none focus:ring-0 focus:ring-offset-0 text-navy-600" name="${name}" ${checked} />
        ${label ? label : ""}
      </label>
    `;
  }
}

customElements.define("checkbox-item", CheckboxItem);

class ImgSvg extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["classes", "src"];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "src" && newValue != "") {
        fetch(`assets/icons/${newValue}`)
          .then((response) => response.text())
          .then((text) => {
            this.innerHTML = text;
            const svg = this.querySelector("svg");
            svg.setAttribute("class", this.getAttribute("classes"));
            svg.classList.add("fill-current");
          })
          .catch(console.error.bind(console));
      }
    }
  }
}

customElements.define("img-svg", ImgSvg);

class MessageItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const state = this.getAttribute("state");
    const message = this.innerHTML;
    let state_class = "";

    switch (state) {
      case "success":
        state_class = "bg-green-600";
        break;
      case "error":
        state_class = "bg-red-700";
        break;
    }

    this.classList.add("flex", state_class, "text-white", "text-opacity-90");
    this.innerHTML = `
      <div class="flex-1 p-6">${message}</div>
      <div class="p-2">
        <button class="hover:bg-black hover:bg-opacity-10 p-2 focus:outline-none cursor-default">
          <img-svg src="remixicon/close.svg"></img-svg>
        </button>
      </div>
    `;
  }
}

customElements.define("message-item", MessageItem);

class ModalBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.deactivate();
    this.innerHTML = `
      <div
        data-backdrop
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="flex items-start w-full max-w-lg bg-white shadow-md">
          <div class="p-8 flex-1" data-modal-content>
            <modal-info></modal-info>
          </div>
          <button class="p-2 m-2 focus:outline-none hover:bg-gray-100 rounded">
            <img-svg src="remixicon/close.svg"></img-svg>
          </button>
        </div>
      </div>
    `;
    this.onClose();
  }

  onClose() {
    this.querySelector("button").addEventListener("click", (e) => {
      this.deactivate();
    });

    this.querySelector("[data-backdrop]").addEventListener("click", (e) => {
      if (e.target != e.currentTarget) return;
      this.deactivate();
    });
  }

  activate() {
    this.removeAttribute("hidden");
  }

  deactivate() {
    this.setAttribute("hidden", "");
  }
}

customElements.define("modal-box", ModalBox);

class PaneMain extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("flex", "flex-col", "overflow-auto", "flex-1");

    const grid_cols = this.gridCols();
    const grid_cols_class = `auto ${grid_cols.widths.join("px ")}px`;
    console.log(JSON.stringify(grid_cols_class));

    this.innerHTML = `
      <actions-x></actions-x>
      <div class="flex-1 flex overflow-auto">
        <div class="overflow-x-auto flex-1 my-4 border border-gray-200 rounded bg-white">
          <div class="flex-1 text-13" style="width: ${grid_cols.sum}px;">
            <div data-table class="grid gap-y-px bg-white" style="grid-template-columns: ${grid_cols_class};">
              <table-headings></table-headings>
              <table-cells></table-cells>
            </div>
          </div>
        </div>
      </div>
      <pagination-x></pagination-x>
    `;
  }

  gridCols() {
    const this_data = data[table.get(this)];

    let sum = 0;
    let widths = [];

    this_data.cols_order.forEach((item) => {
      let width = null;
      const item_obj = this_data.cols[item];

      if (item_obj.config && item_obj.config.hasOwnProperty("width")) {
        width = item_obj.config.width;
      } else {
        width = 300;
      }

      widths.push(width);

      sum += width;

      console.log(width);
      //console.log(item);
      //console.log(this_data.cols[item].config);
    });

    return {
      sum: sum,
      widths: widths,
    };
  }

  part() {
    return `
      <div class="contents">
        <row-select></row-select>
        <table-cell></table-cell>
        <table-cell></table-cell>
        <table-cell></table-cell>
      </div>`;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.removeAttribute("hidden");
  }

  thisDeactivate() {
    this.setAttribute("hidden", "");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("pane-main", PaneMain);

class RadioItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const label = this.getAttribute("label");
    const checked = this.getAttribute("checked") == "true" ? " checked" : "";

    this.innerHTML = `
      <label class="flex select-none items-center gap-2">
        <input type="radio" class="w-4 h-4 focus:outline-none focus:ring-0 focus:ring-offset-0 text-navy-600" name="${name}" ${checked} />
        ${label}
      </label>
    `;
  }
}

customElements.define("radio-item", RadioItem);


class FieldText extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    const value = cell.getTempValue(this);
    this.innerHTML = `
      <input value="${value}" type="text" class="form-input focus:outline-none focus:ring-yellow-500 focus:ring-offset-1 border-2 focus:ring-2 focus:border-gray-300 border-gray-300">
    `;

    this.onKeyup();
    this.onEnter();
    this.onEscape();

    updatePreview($("input", this).value, this);

    $("input", this).select();
  }

  // On key up
  onKeyup() {
    $("input", this).addEventListener("keyup", (e) => {
      const value = e.currentTarget.value;
      cell.setTempValue(value, this);
      updatePreview(value, this);

      console.log(temp);
    });
  }

  onEnter() {
    $("input", this).addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      leaveEdit(e);
    });
  }

  onEscape() {
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const el_cell_ring = $('cell-ring[state="edit"]');
      if (!el_cell_ring) return;

      e.preventDefault();
      fieldClose();
    });
  }

  // Enter

  attributeChangedCallback(attr, oldValue, newValue) {
    /*if (attr != "active") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }*/
  }
}

customElements.define("field-text", FieldText);

