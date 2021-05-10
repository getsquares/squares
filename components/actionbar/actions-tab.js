class ActionsTab extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    const label = this.getAttribute("label");
    const icon = this.getAttribute("icon");

    this.classList.add("btn", "btn-default");

    this.innerHTML = `
      <img-svg src="${icon}" classes="w-5 h-5"></img-svg>
      <div>${label}</div>
      <img-svg src="remixicon/arrow-down-s.svg" classes="w-5 h-5 fill-current opacity-30"></img-svg>
    `;

    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      const active = this.getAttribute("active") == "true";
      const name = this.getAttribute("name");
      const panes_el = this.closest("pane-main").querySelector("actions-panes");

      console.log(panes_el);

      this.closest("pane-main").querySelector("actions-tabs").deactivate();
      panes_el.deactivate();

      if (!active) {
        this.activate();
        panes_el.activate(name);
      }
      /*
      const pane = $(`pane-${this.getAttribute("name")}`);

      $$("actions-tab").forEach((el) => {
        this.deactivate(el);
      });

      $$("pane-items > *").forEach((el) => {
        el.deactivate();
      });

      if (active) {
        pane.deactivate();
      } else {
        pane.activate();
      }*/
    });
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
    this.classList.replace("btn-default", "btn-default-active");
  }

  thisDeactivate() {
    this.classList.replace("btn-default-active", "btn-default");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("actions-tab", ActionsTab);
