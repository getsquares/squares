class ActionsPanes extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add(
      "block",
      "bg-white",
      "border",
      "rounded",
      "border-gray-200"
    );
    this.setAttribute("hidden", "");
    this.innerHTML = `
      <columns-x></columns-x>
      <filter-x></filter-x>
      <order-x></order-x>
    `;
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

  activate(name) {
    this.setAttribute("active", "true");
    console.log(name);
    this.querySelector(name).removeAttribute("hidden");
  }

  deactivate() {
    // Hide all panes
    [...this.children].forEach((el) => {
      el.setAttribute("hidden", "");
    });

    // Hide pane container
    this.removeAttribute("active");
  }
}

customElements.define("actions-panes", ActionsPanes);
