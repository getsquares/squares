class ActionsBtn extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    const label = this.getAttribute("label");
    const icon = this.getAttribute("icon");

    this.classList.add("btn");
    this.classList.add("btn-default");

    this.innerHTML = `
      <img-svg src="${icon}" classes="w-5 h-5"></img-svg>
      <div>${label}</div>
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

customElements.define("actions-btn", ActionsBtn);
