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
        "cursor-default",
        "select-none",
        "rounded",
        "fill-current",
        "hover:bg-gray-200",
      ]
    );

    this.innerHTML = `
      <div class="ml-8 flex-1 truncate" title="${title}">
        ${title}
      </div>
      `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active" && newValue == "true") {
        this.classList.add("bg-blue-800", "text-white");
        this.classList.remove("hover:bg-gray-200");
      } else {
        this.classList.remove("bg-blue-800", "text-white");
        this.classList.add("hover:bg-gray-200");
      }
    }
  }

  activate() {
    this.setAttribute("active", "true");

    // Fetch
  }

  deactivate() {
    this.removeAttribute("active");
  }

  isActive() {
    return this.getAttribute("active") == "true";
  }
}

customElements.define("sidebar-table", SidebarTable);
