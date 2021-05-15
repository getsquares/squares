class RowActions extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("invisible", "flex", "gap-1");
    this.innerHTML = `
      <delete-x></delete-x>
      <clone-x class="btn btn-default">
        <img-svg src="remixicon/file-copy-2-line.svg" classes="w-5 h-5"></img-svg>
        Duplicate checked
      </clone-x>
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

  toggle() {
    const is_checked = $("row-select input:checked", this.closest("pane-main"));
    if (!is_checked) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  thisActivate() {
    this.classList.remove("invisible");
  }

  thisDeactivate() {
    this.classList.add("invisible");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}
customElements.define("row-actions", RowActions);
