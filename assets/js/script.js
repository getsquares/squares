// Get dom cell rings
function getDomCellRings() {
  return document.querySelectorAll("cell-ring");
}

// Get dom cell prev
function getDomCellLeft() {
  const prev = dom.current.table_cell.previousElementSibling;

  if (prev && prev.tagName == "TABLE-CELL") return prev;
  return dom.current.table_cell.closest("div").lastElementChild;
}

// Get dom cell next
function getDomCellRight() {
  const next = dom.current.table_cell.nextElementSibling;

  if (next && next.tagName == "TABLE-CELL") return next;
  return dom.current.table_cell.closest("div").querySelector("table-cell");
}

// Get dom cell down
function getDomCellDown() {
  const el_table = dom.current.table_cell;
  const index = cellActiveIndex(el_table);
  const down = el_table.parentElement.nextElementSibling;

  if (down) return down.querySelector(`table-cell:nth-child(${index})`);
  return document.querySelector(
    `[data-cells] div.contents:first-child table-cell:nth-child(${index})`
  );
}

// Get dom cell up
function getDomCellUp() {
  const el_table = dom.current.table_cell;
  const index = cellActiveIndex(el_table);
  const up = el_table.parentElement.previousElementSibling;

  if (up) return up.querySelector(`table-cell:nth-child(${index})`);
  return document.querySelector(
    `[data-cells] div.contents:last-child table-cell:nth-child(${index})`
  );
}

// Reset dom cell rings
function resetDomCellRings() {
  getDomCellRings().forEach((el) => {
    el.setAttribute("state", "default");
  });
}

// Reset dom cell edit
function resetDomCellEdits() {
  document.querySelectorAll("cell-edit").forEach((el) => {
    el.setAttribute("active", "false");
  });
}

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
  return ["bg-navy-100", "text-navy-900", "shadow-navy"];
}

function hollowClassInactive() {
  return ["hover:bg-grayExtra"];
}

function resetDomCells() {
  resetDomCellRings();
  resetDomCellEdits();
}

// Event cell click
function eventCellClick() {
  getDomCellRings().forEach((el) => {
    el.addEventListener("click", (e) => {
      handleCellActive(e);
    });
  });
}

// Event cell doubleclick
function eventCellDoubleclick() {
  getDomCellRings().forEach((el) => {
    el.addEventListener("dblclick", () => {
      handleCellEdit();
    });
  });
}

// Event cell step
function eventCellKeydown() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        handleCellStep("left");
        break;
      case "ArrowRight":
        handleCellStep("right");
        break;
      case "ArrowDown":
        handleCellStep("down");
        break;
      case "ArrowUp":
        handleCellStep("up");
        break;
      case "Escape":
        handleCellEscape(e);
        break;
      case "Tab":
        handleCellTab(e);
        break;
      case "Enter":
        handleCellEdit();
        break;
    }
  });
}

// KOPPLA IN
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
}

// Handle cell active
function handleCellActive(e) {
  storeDomCell(e.currentTarget.closest("table-cell"));
  resetDomCells();
  dom.current.cell_ring.setAttribute("state", "active");
}

// Handle cell step
function handleCellStep(direction) {
  if (!isCellActive()) return;

  storeDomCell(dom[direction].table_cell);
  resetDomCells();
  dom.current.cell_ring.setAttribute("state", "active");
}

// Handle cell escape
function handleCellEscape(e) {
  if (!isCellActive()) return;

  e.preventDefault();

  dom.current.cell_ring.setAttribute("state", "default");
  resetStore();
}

function handleCellClose() {
  if (!isCellState("edit")) return;

  dom.current.cell_ring.setAttribute("state", "active");
  resetEdit();
}

// Handle cell tab
function handleCellTab(e) {
  if (!isCellActive()) return;

  e.preventDefault();

  handleCellStep(e.shiftKey ? "left" : "right");
}

// Handle cell edit
// Enter and doubleclick
function handleCellEdit() {
  if (in_field) {
    in_field = false;
    return;
  }
  if (!isCellActive()) return;

  resetDomCells();
  dom.current.cell_ring.setAttribute("state", "edit");
  dom.current.cell_edit.setAttribute("active", "true");
  dom.current.cell_edit.innerHTML = `<field-text></field-text>`;
}

function resetEdit() {
  dom.current.cell_ring.setAttribute("state", "active");
  dom.current.cell_edit.setAttribute("active", "false");
  dom.current.cell_edit.innerHTML = "";
}

// Leave edit
function leaveEdit() {
  in_field = true;
  resetDomCellEdits();
  const el_edit = document.querySelector(`cell-ring[state="edit"]`);
  if (!el_edit) return;
  el_edit.setAttribute("state", "active");
}

// Field close helper
function fieldClose() {
  handleCellClose();
}

// Update preview
function updatePreview(html, obj) {
  const preview = obj.closest("table-cell").querySelector("cell-preview");
  preview.setAttribute("active", "true");
  preview.innerHTML = html;
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
  $("resize-logo").style.width = $("sidebar-wrap").offsetWidth + "px";
}

function error(message) {}

function success(message) {}

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
    return ["bg-white", "text-gray-800"];
  }

  static classesInactive() {
    return ["bg-navy-700", "text-navy-200", "hover:bg-navy-800"];
  }

  static classesActiveClose() {
    return ["hover:bg-gray-200"];
  }

  static classesInactiveClose() {
    return ["hover:bg-navy-600"];
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
    console.log(name);
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
    `;

    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      const active = this.getAttribute("active") == "true";
      const name = this.getAttribute("name");

      $("actions-tabs").deactivate();
      $("actions-panes").deactivate();

      if (!active) {
        this.activate();
        $("actions-panes").activate(name);
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
      "justify-between",
      "gap-4",
      "pt-2",
      "bg-gray-50"
    );
    this.innerHTML = `
      <div data-items class="flex rounded overflow-hidden gap-1">
        <actions-tab name="panes-x" label="Panes" icon="remixicon/layout-5-line.svg"></actions-tab>
        <actions-tab name="columns-x" label="Columns" icon="remixicon/layout-column-line.svg"></actions-tab>
        <actions-tab name="filter-x" label="Filter" icon="remixicon/filter-3-line.svg"></actions-tab>
        <actions-tab name="order-x" label="Order" icon="remixicon/arrow-up-down.svg"></actions-tab>
      </div>
    `;
  }

  deactivate() {
    $$("actions-tab").forEach((el) => {
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
    this.classList.add("flex", "flex-col", "gap-2");
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
    const hide = this.getAttribute("hide");

    $("button", this).addEventListener("click", () => {
      this.closest(hide).deactivate();
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
      <checkbox-item class="bg-gray-50 px-3 py-1.5 rounded border border-gray-200" name="${name}" label="${name}" checked="${checked}"></checkbox-item>
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
    this.querySelector("input").addEventListener("change", (e) => {
      console.log("clicked");
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
    this.classList.add("gap-4", "flex", "text-sm");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template("Columns");
  }

  checkboxes() {
    return `
      <columns-item name="alright" checked="true"></columns-item>
      <columns-item name="asd"></columns-item>
    `;
  }

  template(title) {
    return `
      <div class="flex flex-col gap-2 p-4 flex-1">
        <div class="font-bold">${title}</div>
        <div class="flex gap-2">
          ${this.checkboxes()}
        </div>
      </div>
      <pane-close hide="pane-columns"></pane-close>
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
      <select class="actionbar-select">
        <option>hello</option>
        <option>hello2</option>
      </select>
      <select class="actionbar-select">
        ${this.matchesOptions()}
      </select>
      <input type="text" class="actionbar-select" />
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
    this.classList.add("gap-4", "flex", "text-sm");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template("Filter");
    this.onAdd();
  }

  template(title) {
    return `
      <div class="flex flex-col gap-4 p-4 pr-0 flex-1">
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
      </div>
      <pane-close hide="pane-filter"></pane-close>
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

class OrderX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-4", "flex", "text-sm");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template("Sort by");
  }

  filters() {
    return this.partFilter("test23", true) + this.partFilter("test");
  }

  template(title) {
    return `
      <div class="flex flex-col gap-6 p-4 flex-1">
        <div class="flex flex-col gap-2">
          <div class="font-bold">Order by</div>
          <div class="flex gap-8">
            <radio-item name="order_by" label="Unsorted" checked=""></radio-item>
            <radio-item name="order_by" label="id" checked=""></radio-item>
            <radio-item name="order_by" label="title" checked=""></radio-item>
            <radio-item name="order_by" label="slug" checked=""></radio-item>
            <radio-item name="order_by" label="description" checked=""></radio-item>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="font-bold">Order direction</div>
          <div class="flex gap-8">
            <radio-item name="order" label="Unsorted" checked=""></radio-item>
            <radio-item name="order" label="Ascending" checked=""></radio-item>
            <radio-item name="order" label="Descending" checked=""></radio-item>
          </div>
        </div>
      </div>
      <pane-close hide="pane-filter"></pane-close>
    `;
  }

  partHeading(label) {
    return `<div class="font-bold text-sm uppercase">${label}</div>`;
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
    this.removeAttribute("hidden", "");
  }

  partFilter(name, checked) {
    //&filter[]=slug%20equals%202
    return `
    <div class="contents">
      <select class="bg-white border-gray-300 rounded focus:ring-0 focus:border-gray-400 text-sm">
        <option>hello</option>
        <option>hello2</option>
      </select>
      <select class="bg-white border-gray-300 rounded focus:ring-0 focus:border-gray-400 text-sm">
        ${this.partMatches()}
      </select>
    </div>
    `;
  }

  partMatches() {
    const matches = [
      {
        name: "asc",
        label: "Ascending",
      },
      {
        name: "desc",
        label: "Descending",
      },
    ];

    let html_part = [];

    matches.forEach((item) => {
      html_part.push(`<option value="${item.name}">${item.label}</option>`);
    });

    return html_part.join(" ");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("order-x", OrderX);

class PaginationX extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="flex py-2 bg-gray-50">
      <div class="flex gap-4 ml-auto">
        ${this.buttonTemplate("prev", "remixicon/arrow-left-s-line.svg")}
        <records-x offset="101" rows="100" total="120234233"></records-x>
        ${this.buttonTemplate("next", "remixicon/arrow-right-s-line.svg")}
      </div>
    </div>
    `;
  }

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

class SidebarDatabaseLoading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
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
      "px-4",
      "cursor-default",
      "select-none",
      "fill-current",
      "items-center"
    );
    this.innerHTML = `
      <img-svg src="material-icons/refresh.svg" classes="w-4 h-4 text-gray-400"></img-svg>
      <div data-local-table class="flex-1 truncate text-13">Refresh</div>
    `;
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
      )} flex gap-2 px-4 py-1 cursor-default select-none fill-current items-center">
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

        const offset = 1;
        const rows = 300;
        const total = 1235;

        //$("bar-footer-items").setAttribute("database", this.getValue());
        //$("bar-footer-items").setAttribute("table", el.getValue());
        $("bar-footer-items").setRecords(offset, rows, total);
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
      <label class="flex flex-col gap-2 mx-4">
        <div class="uppercase font-bold text-sm">Filter tables</div>
        <input spellcheck="false" placeholder="Show matching tables..." type="text" class="bg-white border-gray-200 text-sm rounded focus:ring-0 focus:border-gray-400">
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
      ]
    );
    this.innerHTML = `
      <h2 class="p-4 pb-0 text-sm text-gray-400 uppercase">Databases and tables</h2>
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
    return ["active"];
  }

  connectedCallback() {
    this.setAttribute("active", "false");
    this.classList.add(
      "z-20",
      "hidden",
      "block",
      "absolute",
      "bg-gray-100",
      "shadow-md",
      "top-full",
      "p-4",
      "left-0",
      "mt-0.5"
    );
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

customElements.define("cell-edit", CellEdit);

class CellPreview extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("block", "relative", "tp");
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

customElements.define("cell-preview", CellPreview);

class CellRing extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["state"];
  }

  connectedCallback() {
    this.classList.add("absolute", "block", "inset-0", "z-10");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "state") return;
    if (oldValue !== newValue) {
      this.classList.remove(
        "ring-1",
        "ring-2",
        "ring-gray-500",
        "ring-blue-500",
        "ring-orange-500",
        "z-10",
        "z-30",
        "shadow-y",
        "ml-2px"
      );
      const prev_el = this.closest("table-cell").previousElementSibling;
      const next_el = this.closest("table-cell").nextElementSibling;

      switch (newValue) {
        case "default":
          this.classList.add("shadow-y");
          this.classList.add("z-10");
          break;
        case "active":
          this.classList.add("ring-2", "ring-gray-500", "z-30");
          break;
        case "changed":
          this.classList.add("ring-2", "ring-orange-500", "z-30");
          break;
        case "edit":
          this.classList.add("ring-2", "ring-blue-500", "z-30");
          break;
      }

      if (newValue != "default") {
        if (prev_el.tagName == "ROW-SELECT") this.classList.add("ml-2px");
        if (!next_el) this.classList.add("mr-2px");
      }
    }
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
        <input type="checkbox" class="checkstyle" name="test" />
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

      el_cells.forEach((el) => {
        if (checked) {
          this.selectOne(el);
        } else {
          this.deselectOne(el);
        }
      });
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
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("relative", "bg-white");
    this.innerHTML = `
      <cell-ring state="default"></cell-ring>
      <cell-edit></cell-edit>
      <cell-preview active="true" class="select-none">
        ${this.value}
      </cell-preview>
    `;
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("table-cell", TableCell);

class TableHeadingCheck extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      //"ring-1",
      //"ring-gray-100",
      "sticky",
      "top-0",
      "left-0",
      "z-50",
      "flex",
      "sticky"
    );
    this.innerHTML = `
      <label class="tp relative heading-bkg flex items-center">
        <input type="checkbox" class="checkstyle" name="test" />
        <div class="absolute block inset-0 ring-1 ring-gray-100"></div>
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
      const el_cells = item
        .closest(".contents")
        .querySelectorAll("row-select, table-cell");

      el_cells.forEach((el) => {
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
      "z-50"
    );
    this.innerHTML = `
      ${key_html}
      ${title}
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
        "py-1.5",
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
      "bg-navy-600",
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
      class="flex items-center justify-between pr-2 text-gray-200 bg-navy-600"
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
        <input type="checkbox" class="w-4 h-4 rounded focus:outline-none focus:ring-0 focus:ring-offset-0 text-navy-600" name="${name}" ${checked} />
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
    this.classList.add("flex", "flex-col", "overflow-auto", "gap-2");
    this.innerHTML = `
      <actions-x></actions-x>
      <div class="flex-1 flex overflow-auto">
        <div class="flex-1 overflow-x-auto border border-gray-200 rounded">
          <div class="flex-1 text-13 w-[1300px]">
            <div data-table class="grid gap-y-px bg-white grid-cols-[auto,1200px,300px,300px]">
              ${this.headings()}
              <div data-cells class="contents"></div>
            </div>
          </div>
        </div>
      </div>
      <pagination-x></pagination-x>
    `;
    let parts = "";
    for (let i = 0; i < 100; i++) {
      parts += this.part();
    }

    $("[data-cells]").innerHTML = parts;
  }

  headings() {
    return `
    <div data-headings class="z-40 contents">
      <table-heading-check></table-heading-check>
      <table-heading title="id" key="true"></table-heading>
      <table-heading title="title"></table-heading>
      <table-heading title="description"></table-heading>
    </div>`;
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
    const value = "test";
    this.innerHTML = `
      <input value="${value}" type="text" class="focus:outline-none focus:ring-yellow-500 focus:ring-offset-1 border-2 focus:ring-2 focus:border-gray-300 border-gray-300">
    `;

    this.onKeyup();
    this.onEnter();
    this.onEscape();

    updatePreview(this.querySelector("input").value, this);

    this.querySelector("input").select();
  }

  // On key up
  onKeyup() {
    this.querySelector("input").addEventListener("keyup", (e) => {
      updatePreview(e.currentTarget.value, this);
    });
  }

  onEnter() {
    this.querySelector("input").addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      leaveEdit();
    });
  }

  onEscape() {
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
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

