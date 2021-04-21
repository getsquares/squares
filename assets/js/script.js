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

function hollowClassActive() {
  return ["bg-blue-100", "text-blue-900", "border-blue-300"];
}

function hollowClassInactive() {
  return ["border-transparent", "hover:border-gray-200", "hover:bg-gray-50"];
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
    return ["bg-blue-700", "hover:bg-blue-800"];
  }

  static classesActiveClose() {
    return ["hover:bg-gray-200"];
  }

  static classesInactiveClose() {
    return ["hover:bg-blue-600"];
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

class ActionbarDropdown extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("hidden", "");
    this.innerHTML = `
      <div class="gap-4 bg-gray-100 border-t flex">
        <div class="flex flex-col gap-4 p-6 flex-1">
          <div data-actionbar-title class="font-bold"></div>
          <div data-actionbar-dropdown-content></div>
        </div>
        <div class="p-2">
          <button class="focus:outline-none hover:bg-gray-200 p-2 rounded">
            <img-svg src="assets/icons/remixicon/close.svg"></img-svg>
          </button>
        </div>
      </div>
    `;

    this.onClose();
  }

  onClose() {
    this.querySelector("button").addEventListener("click", () => {
      this.deactivate();
    });
  }

  setHtml(title, content) {
    this.setTitle(title);
    this.setContent(content);
  }

  setTitle(title) {
    this.querySelector("[data-actionbar-title]").innerHTML = title;
  }

  setContent(content) {
    this.querySelector("[data-actionbar-dropdown-content]").innerHTML = content;
  }

  isActive() {
    return !this.hasAttribute("hidden");
  }

  setActive(state) {
    if (state) {
      this.removeAttribute("hidden", "");
    } else {
      this.setAttribute("hidden", "");
    }
  }

  activate() {
    this.removeAttribute("hidden", "");
  }

  deactivate() {
    this.setAttribute("hidden", "");
    this.setTitle("");
    this.setContent("");
  }
}

customElements.define("actionbar-dropdown", ActionbarDropdown);

class ActionbarItems extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {}

  connectedCallback() {
    this.innerHTML = `
      <div class="flex justify-between gap-4">
        <div data-items class="flex gap-4 p-2">
          ${this.itemHtml(
            "columns",
            "assets/icons/remixicon/eye-off.svg",
            "4 hidden columns"
          )}
          <!--<actionbar-filter></actionbar-filter>-->
          ${this.itemHtml(
            "sort",
            "assets/icons/remixicon/arrow-up-down.svg",
            "Sort"
          )}
        </div>
        <div class="flex gap-4 p-2">
          ${this.buttonHtml(
            "refresh",
            "assets/icons/material-icons/refresh.svg",
            "Refresh"
          )}
          ${this.buttonHtml("add", "assets/icons/remixicon/add.svg", "Add row")}
          
          <!--
          <actionbar-import></actionbar-import>
          <actionbar-export></actionbar-export>
          -->
        </div>
      </div>
    `;

    this.onClick();
  }

  buttonHtml(name, src, title) {
    return `
    <div data-local-add class="${hollowClassInactive().join(
      " "
    )} flex cursor-default items-center px-2 py-1.5 select-none gap-2 rounded border">
      <img-svg src="${src}"></img-svg>
      <div>${title}</div>
    </div>
  `;
  }

  itemHtml(name, src, title) {
    return `
      <div data-title="${title}" data-action="${name}" class="${hollowClassInactive().join(
      " "
    )} flex cursor-default items-center px-2 py-1.5 select-none gap-2 rounded border">
        <img-svg src="${src}"></img-svg>
        <div>${title}</div>
      </div>
    `;
  }

  onClick() {
    this.querySelectorAll("[data-action]").forEach((item) => {
      item.addEventListener("click", (e) => {
        const el = e.currentTarget;
        const is_active = this.isActive(el);
        const name = el.getAttribute("data-action");
        const dropdown = $("actionbar-dropdown");

        this.deactivateAll();

        if (!is_active) {
          this.activate(el);
        } else {
          this.deactivate(el);
        }

        if (["columns", "sort"].includes(name)) {
          const title = el.getAttribute("data-title");

          if (is_active) {
            dropdown.deactivate();
          } else {
            const html = `<actionbar-${name}2></actionbar-${name}2>`;
            dropdown.activate();
            dropdown.setHtml(title, html);
          }
        } else {
          dropdown.deactivate();
        }
      });
    });
  }

  isActive(el) {
    return el.classList.contains("bg-blue-50");
  }

  activate(el) {
    el.classList.add(...hollowClassActive());
    el.classList.remove(...hollowClassInactive());
  }

  deactivate(el) {
    el.classList.add(...hollowClassInactive());
    el.classList.remove(...hollowClassActive());
  }

  deactivateAll() {
    $$("[data-action]").forEach((el) => {
      this.deactivate(el);
    });
  }
}

customElements.define("actionbar-items", ActionbarItems);

class BarFooterItems extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["database", "table"];
  }

  connectedCallback() {
    this.classList.add("flex", "items-center", "gap-4");
    this.setAttribute("hidden", "");

    this.innerHTML = `
      ${this.itemHtml(
        this.getAttribute("database"),
        "database",
        "assets/icons/remixicon/database-2.svg"
      )}

      ${this.itemHtml(
        this.getAttribute("table"),
        "table",
        "assets/icons/remixicon/table-line.svg"
      )}

      ${this.itemHtml(
        this.getAttribute("records"),
        "records",
        "assets/icons/remixicon/layout-row-line.svg"
      )}
    `;
  }

  itemHtml(value, type, src) {
    return `
      <div class="py-1.5 px-2 select-none flex gap-2 items-center hover:bg-gray-200 rounded"
      >
        <img-svg src="${src}"></img-svg>
        <div data-local-${type}>${value}</div>
      </div>
    `;
  }

  keyHtml() {
    return `<img-svg src="assets/icons/remixicon/key-2-line.svg"></img-svg>`;
  }

  setRecords(offset, rows, total) {
    this.querySelector(
      `[data-local-records]`
    ).innerHTML = `${offset}-${rows} of ${total}`;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const database = this.querySelector("[data-local-database]");
    const table = this.querySelector("[data-local-table]");

    if (oldValue !== newValue) {
      if (attr == "database" && database) {
        database.innerHTML = newValue;
        this.removeAttribute("hidden");
      } else if (attr == "table" && table) {
        table.innerHTML = newValue;
      }
    }
  }
}

customElements.define("bar-footer-items", BarFooterItems);

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
      )} flex gap-2 p-2 mx-2 cursor-default select-none fill-current items-center rounded border">
        <img-svg src="assets/icons/remixicon/database-2.svg"></img-svg>
        <div data-local-database class="flex-1 truncate font-bold">${title}</div>
        <img-svg data-arrow src="assets/icons/remixicon/arrow-down-s.svg" classes="transform rotate-180 w-6 h-6"></img-svg>
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
      // LOAD FROM FETCH
      tables.innerHTML = `
        <sidebar-table title="wp_post_categories"></sidebar-table>
        <sidebar-table title="wp_taxonomies"></sidebar-table>
      `;

      $("sidebar-filter").filter();
      //current.database = this.getValue();

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
      });
    }
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

class SidebarFilter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <label class="flex flex-col gap-2 mx-4">
        <div class="uppercase font-bold text-sm">Filter tables</div>
        <input spellcheck="false" placeholder="Show matching tables..." type="text" class="bg-white border-gray-200 focus:shadow-inner rounded focus:bg-gray-100 focus:ring-0 focus:border-gray-300">
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
      // Fetch
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

  connectedCallback() {
    this.classList.add(
      ...[
        "flex",
        "flex-col",
        "pb-4",
        "overflow-auto",
        "resize-x",
        "bg-white",
        "w-80",
        "border-r",
        "border-gray-300",
        "gap-6",
        "rounded-tr",
      ]
    );
    this.innerHTML = `
      <h2 class="p-4 pb-0 text-xl">Databases and tables</h2>
      <sidebar-filter></sidebar-filter>
      <div class="flex flex-col">
        <sidebar-database title="jiddra_se"></sidebar-database>
        <sidebar-database title="jiddra2_se"></sidebar-database>
      </div>
    `;
  }
}

customElements.define("sidebar-wrap", SidebarWrap);

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
    this.classList.add("block", "relative", "p-2");
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
    this.classList.add(
      "absolute",
      "block",
      "inset-0",
      "ring-1",
      "z-10",
      "ring-gray-300"
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "state") return;
    if (oldValue !== newValue) {
      this.classList.remove(
        "ring-1",
        "ring-2",
        "ring-gray-300",
        "ring-gray-500",
        "ring-blue-500",
        "z-10",
        "z-30"
      );
      switch (newValue) {
        case "default":
          this.classList.add("ring-1", "ring-gray-300", "z-10");
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
    }
  }
}

customElements.define("cell-ring", CellRing);

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
          <img-svg src="assets/icons/remixicon/checkbox-multiple-blank.svg" classes="h-12 w-12"></img-svg>
          <img-svg
            src="assets/icons/logo.svg"
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

class RowSelect extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("relative", "flex", "bg-white");
    this.innerHTML = `
      <label class="py-2 px-4 relative">
        <input type="checkbox" class="w-5 h-5 rounded-sm text-white" name="test" />
        <div class="absolute block inset-0 ring-1 ring-gray-300"></div>
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
    el.classList.add("bg-blue-100");
    el.classList.remove("bg-white");
  }

  deselectOne(el) {
    el.classList.remove("bg-blue-100");
    el.classList.add("bg-white");
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("row-select", RowSelect);

class TableHeadingCheck extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "ring-1",
      "ring-gray-300",
      "sticky",
      "top-0",
      "z-40",
      "flex"
    );
    this.innerHTML = `
      <label class="py-2 px-4 relative bg-gray-100 flex items-center">
        <input type="checkbox" class="w-5 h-5 rounded-sm text-white" name="test" />
        <div class="absolute block inset-0 ring-1 ring-gray-300"></div>
      </label>
    `;
    this.onChange();
  }

  keyHtml() {
    return `<img-svg src="assets/icons/remixicon/key-2-line.svg"></img-svg>`;
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
      "px-2",
      "py-3",
      "ring-1",
      "ring-gray-300",
      "bg-gray-100",
      "font-bold",
      "sticky",
      "top-0",
      "z-40",
      "flex",
      "gap-2",
      "items-center",
      "text-base"
    );
    this.innerHTML = `
      ${key_html}
      ${title}
    `;
  }

  keyHtml() {
    return `<img-svg src="assets/icons/remixicon/key-2-line.svg"></img-svg>`;
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
        "py-2",
        "cursor-default",
        "select-none",
        "focus:outline-none",
        "flex",
        "gap-3",
        "items-center",
      ],
      ...tab.classesInactive()
    );

    this.setAttribute(
      "title",
      this.getAttribute("database") + "/" + this.getAttribute("table")
    );

    this.innerHTML = `
      ${this.getAttribute("table")}
      <img-svg src="assets/icons/remixicon/close.svg" class="rounded">
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
    this.classList.add("flex", "items-center", "gap-2", "text-white", "px-2");
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
        <img-svg src="assets/icons/remixicon/info.svg" classes="w-5 h-5">
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
      <div class="flex gap-2 text-sm text-white">
        ${this.itemHtml(
          "info",
          "Info",
          "assets/icons/remixicon/question-fill.svg"
        )}
        ${this.itemHtml(
          "logout",
          "Logout",
          "assets/icons/material-icons/logout_black_24dp.svg"
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
      class="flex items-center justify-between py-2 pl-4 pr-2 text-gray-200"
    >
      <div class="flex items-center gap-2 text-2xl text-white uppercase">
        <img-svg
          src="assets/icons/remixicon/checkbox-multiple-blank.svg"
        ></img-svg>
        <img-svg src="assets/icons/logo.svg" classes="h-5"></img-svg>
      </div>
      <topbar-items></topbar-items>
    </div>
    `;
  }
}

customElements.define("topbar-wrap", TopbarWrap);

class ActionbarColumns2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex gap-8">
        <checkbox-item name="test" label="id" checked="true"></checkbox-item>
        <checkbox-item name="test" label="title" checked="true"></checkbox-item>
        <checkbox-item name="test" label="slug" checked="true"></checkbox-item>
        <checkbox-item name="test" label="description" checked="true"></checkbox-item>
        <checkbox-item name="test" label="categories" checked="true"></checkbox-item>
      </div>
    `;
  }
}

customElements.define("actionbar-columns2", ActionbarColumns2);

class ActionbarSort2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex gap-4">
        <radio-item name="test" label="Hegllo" checked="true"></radio-item>
        <radio-item name="test" label="Hegllo" checked="true"></radio-item>
      </div>
    `;
  }
}

customElements.define("actionbar-sort2", ActionbarSort2);

class ActionbarColumns extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <actionbar-icon
        src="assets/icons/remixicon/eye-off.svg"
        title="4 hidden fields"
      ></actionbar-icon>
    `;
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      const icon = this.querySelector("actionbar-icon");

      if (icon.isActive()) {
        icon.deactivate();
      } else {
        icon.activate("Toggle columns", this.html());
      }
    });
  }

  html() {
    return `
      <div class="flex gap-4">
        <label class="flex select-none items-center gap-2">
          <input
            type="checkbox"
            class="w-5 h-5 border border-gray-400 text-blue-600 focus:ring-0 focus:ring-offset-0"
          />
          Testing
        </label>
        <label class="flex select-none items-center gap-2">
          <input
            type="checkbox"
            class="w-5 h-5 border border-gray-400 text-blue-600 focus:ring-0 focus:ring-offset-0"
          />
          Testing
        </label>
      </div>
    `;
  }
}

customElements.define("actionbar-columns", ActionbarColumns);

class ActionbarExport extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div data-action>
        <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z"
        />
      </svg>
        <div>Export</div>
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

customElements.define("actionbar-export", ActionbarExport);

class ActionbarFilter extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div data-action>
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
        <div>Filter</div>
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

customElements.define("actionbar-filter", ActionbarFilter);

class ActionbarImport extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div data-action>
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M3 19h18v2H3v-2zM13 5.828V17h-2V5.828L4.929 11.9l-1.414-1.414L12 2l8.485 8.485-1.414 1.414L13 5.83z"
          />
        </svg>
        <div>Import</div>
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

customElements.define("actionbar-import", ActionbarImport);

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
        <img-svg src="assets/icons/material-icons/refresh.svg" classes="animate-spin w-5 h-5"></img-svg>
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

class ActionbarSort extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <actionbar-icon
        src="assets/icons/remixicon/arrow-up-down.svg"
        title="Sort"
      ></actionbar-icon>
    `;
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      const icon = this.querySelector("actionbar-icon");

      if (icon.isActive()) {
        icon.deactivate();
      } else {
        icon.activate("Sort", this.html());
      }
    });
  }

  html() {
    return `
      <div class="flex gap-4">
        <label class="flex select-none items-center gap-2">
          <input
            type="radio"
            class="w-5 h-5 border border-gray-400 text-blue-600 focus:ring-0 focus:ring-offset-0"
            name="same"
          />
          Testing
        </label>
        <label class="flex select-none items-center gap-2">
          <input
            type="radio"
            class="w-5 h-5 border border-gray-400 text-blue-600 focus:ring-0 focus:ring-offset-0"
            name="same"
          />
          Testing
        </label>
      </div>
    `;
  }
}

customElements.define("actionbar-sort", ActionbarSort);

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
      "py-2",
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
      "border-2",
      "bg-blue-600",
      "border-transparent",
      "hover:bg-blue-900",
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
        <input type="checkbox" class="w-5 h-5 rounded-sm text-white" name="${name}" ${checked} />
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
        fetch(newValue)
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
          <img-svg src="assets/icons/remixicon/close.svg"></img-svg>
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
            <img-svg src="assets/icons/remixicon/close.svg"></img-svg>
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
        <input type="radio" class="w-5 h-5 text-white" name="${name}" ${checked} />
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

