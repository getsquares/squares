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
