class SidebarDatabase extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["state"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div
        class="flex gap-2 px-4 py-1 pl-2 mx-2 rounded cursor-default select-none fill-current hover:bg-blueGray-700 items-center text-blueGray-500"
      >
        <icon-arrow-down classes="w-5 h-5 text-blueGray-500"></icon-arrow-down>
        <icon-database-2 classes="w-5 h-5 text-blueGray-500"></icon-database-2>
        <div class="flex-1 truncate text-xs uppercase font-bold">my_long_database_name_that_will_break</div>
      </div>
      `;
  }
}

customElements.define("sidebar-database", SidebarDatabase);
