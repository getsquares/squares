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
