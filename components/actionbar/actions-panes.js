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
    this.hidden = true;
    this.innerHTML = `
      <panes-x></panes-x>
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
    this.hidden = false;
  }

  thisDeactivate() {
    this.hidden = true;
  }

  activate(name) {
    this.setAttribute("active", "true");

    this.querySelector(name).hidden = false;
  }

  deactivate() {
    // Hide all panes
    [...this.children].forEach((el) => {
      el.hidden = true;
    });

    // Hide pane container
    this.removeAttribute("active");
  }
}

customElements.define("actions-panes", ActionsPanes);
