class ActionItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    const label = this.getAttribute("label");
    const icon = this.getAttribute("icon");

    this.classList.add(
      "flex",
      "cursor-default",
      "items-center",
      "px-3",
      "py-1.5",
      "text-sm",
      "select-none",
      "gap-2",
      "ring-1",
      ...tabClassInactive()
    );

    this.innerHTML = `
      <img-svg src="${icon}" classes="w-5 h-5"></img-svg>
      <div>${label}</div>
    `;

    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      const active = this.getAttribute("active") == "true";
      const pane = $(`pane-${this.getAttribute("name")}`);

      $$("action-item").forEach((el) => {
        this.deactivate(el);
      });

      $$("pane-items > *").forEach((el) => {
        el.deactivate();
      });

      if (active) {
        this.deactivate();
        pane.deactivate();
      } else {
        this.activate();
        pane.activate();
      }
    });
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

  classesActivate() {
    this.classList.add(...tabClassActive());
    this.classList.remove(...tabClassInactive());
  }

  classesDeactivate(el = this) {
    el.classList.remove(...tabClassActive());
    el.classList.add(...tabClassInactive());
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate(el = this) {
    el.removeAttribute("active");
  }
}

customElements.define("action-item", ActionItem);
