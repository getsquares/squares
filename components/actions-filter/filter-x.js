class FilterX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-4", "flex", "flex-col", "p-4", "text-sm");
    this.hidden = true;
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
    this.hidden = false;
  }

  thisDeactivate() {
    this.hidden = true;
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("filter-x", FilterX);
