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
