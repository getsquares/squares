class PanesItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["checked"];
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const label = this.getAttribute("label");
    const checked = this.getAttribute("checked");

    this.classList.add("flex");

    this.innerHTML = this.template(name, label, checked);
    this.onClick();
  }

  template(name, label, checked) {
    return `
      <label class="btn btn-borderless">
        <input type="checkbox" name="${name}" class="checkbox form-checkbox" ${
      checked ? "checked" : ""
    }>
        ${label}
      </label>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "checked") {
        this.onChange(newValue);
      }
    }
  }

  onClick() {
    this.querySelector("input").addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        this.activate();
      } else {
        this.deactivate();
      }
    });
  }

  onChange(checked) {
    const name = this.getAttribute("name");

    $$(name).forEach((el) => {
      if (!checked) {
        el.setAttribute("hidden", "");
      } else {
        el.removeAttribute("hidden", "");
      }

      // Sync
      $$(`panes-item[name="${name}"]`).forEach((item) => {
        if (!checked) {
          item.removeAttribute("checked");
        } else {
          item.setAttribute("checked", "true");
        }
        item.querySelector("input").checked = checked;
      });
    });
  }

  activate() {
    this.setAttribute("checked", "true");
  }

  deactivate() {
    this.removeAttribute("checked");
  }
}

customElements.define("panes-item", PanesItem);
