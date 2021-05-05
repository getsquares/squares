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
    this.innerHTML = this.template("Filter");
    this.onAdd();
  }

  template(title) {
    return `
      <div class="flex flex-col gap-4 p-4 pr-0 flex-1">
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
      </div>
      <pane-close hide="pane-filter"></pane-close>
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
