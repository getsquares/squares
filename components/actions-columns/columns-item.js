class ColumnsItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["checked"];
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const checked = this.getAttribute("checked");
    this.classList.add("flex");

    this.innerHTML = this.template(name, checked);
    this.onClick();
  }

  template(name, checked) {
    return `
      <checkbox-item class="bg-gray-50 px-3 py-1.5 rounded border border-gray-200" name="${name}" label="${name}" checked="${checked}"></checkbox-item>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "checked") {
        this.onChange();
      }
    }
  }

  onClick() {
    this.querySelector("input").addEventListener("change", (e) => {
      console.log("clicked");
      if (e.currentTarget.checked) {
        this.activate();
      } else {
        this.deactivate();
      }
    });
  }

  onChange() {
    console.log("Something has changed");
  }

  activate() {
    this.setAttribute("checked", "true");
  }

  deactivate() {
    this.removeAttribute("checked");
  }
}

customElements.define("columns-item", ColumnsItem);
