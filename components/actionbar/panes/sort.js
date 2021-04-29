class PaneSort extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add(
      "gap-4",
      "bg-white",
      "flex",
      "hidden",
      "mt-1",
      "text-sm",
      "rounded"
    );
    this.innerHTML = this.template("Filter");
    //this.activate();
  }

  filters() {
    return this.partFilter("test23", true) + this.partFilter("test");
  }

  template(title) {
    return `
      <div class="flex flex-col gap-4 p-6 flex-1">
        <div class="grid grid-cols-[minmax(200px,max-content),minmax(200px,max-content)] gap-2 flex-col">
          <div class="contents">
            ${this.partHeading("Order by")}
            ${this.partHeading("Order")}
          </div>
          <div class="contents">
            <select class="bg-white border-gray-300 rounded focus:ring-0 focus:border-gray-400">
              <option>hello</option>
              <option>hello2</option>
            </select>
            <select class="bg-white border-gray-300 rounded focus:ring-0 focus:border-gray-400">
              ${this.partMatches()}
            </select>
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
          this.classesActivate();
        } else {
          this.classesDeactivate();
        }
      }
    }
  }

  classesActivate(el = this) {
    el.classList.remove("hidden");
  }

  classesDeactivate(el = this) {
    el.classList.add("hidden");
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

customElements.define("pane-sort", PaneSort);
