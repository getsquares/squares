class PaneFilter extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-4", "flex", "hidden", "text-sm");
    this.innerHTML = this.template("Filter");
  }

  filters() {
    return this.partFilter("test23", true) + this.partFilter("test");
  }

  template(title) {
    return `
      <div class="flex flex-col gap-2 p-4 flex-1">
        <div class="grid grid-cols-[minmax(200px,max-content),minmax(200px,max-content),1fr] gap-2 flex-col">
          <div class="contents">
            ${this.partHeading("Column")}
            ${this.partHeading("Match")}
            ${this.partHeading("Value")}
          </div>
          ${this.filters()}
        </div>
        <button-item style="action" title="Filter data" class="ml-auto"></button-item>
      </div>
      <pane-close hide="pane-filter"></pane-close>
    `;
  }

  partHeading(label) {
    return `<div class="font-bold text-sm">${label}</div>`;
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
      <select class="actionbar-select">
        <option>hello</option>
        <option>hello2</option>
      </select>
      <select class="actionbar-select">
        ${this.partMatches()}
      </select>
      <input type="text" class="actionbar-select">
    </div>
    `;
  }

  partMatches() {
    const matches = [
      {
        name: "contains",
        label: "Contains",
      },
      {
        name: "not_contains",
        label: "Not contains",
      },
      {
        name: "starts_with",
        label: "Starts with",
      },
      {
        name: "ends_with",
        label: "Ends with",
      },
      {
        name: "equals",
        label: "Equals",
      },
      {
        name: "not_equals",
        label: "Not equals",
      },
      {
        name: "less_than",
        label: "Less than",
      },
      {
        name: "larger_than",
        label: "Larger than",
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

customElements.define("pane-filter", PaneFilter);
