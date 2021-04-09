class SidebarTable extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["state"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div
        class="flex gap-2 px-2 py-1 ml-10 mr-2 border border-transparent rounded cursor-default select-none fill-current hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="w-5 h-5 text-gray-500"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M13 10v4h6v-4h-6zm-2 0H5v4h6v-4zm2 9h6v-3h-6v3zm-2 0v-3H5v3h6zm2-14v3h6V5h-6zm-2 0H5v3h6V5zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
          />
        </svg>
        <div class="flex-1 truncate text-sm" title="asdjasi">wp_term_relationships</div>
      </div>
      `;
  }
}

customElements.define("sidebar-table", SidebarTable);
