class PanesX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-4", "flex", "text-sm");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template();
    this.onClose();
  }

  checkboxes() {
    return `
      <panes-item name="topbar-wrap" label="Top" checked="true"></panes-item>
      <panes-item name="sidebar-wrap" label="Sidebar" checked="true"></panes-item>
      <panes-item name="pagination-x" label="Footer" checked="true"></panes-item>
    `;
  }

  template() {
    return `
      <div class="flex flex-col gap-2 p-4 flex-1">
        <div class="font-bold">Panes</div>
        <div class="flex gap-4">
          ${this.checkboxes()}
        </div>
        <div class="mt-2">
          <button-done class="btn btn-default">
            <img-svg src="remixicon/close.svg" classes="w-5 h-5"></img-svg>
            <div>Close</div>
          </button-done>
        </div>
      </div>
      <pane-close></pane-close>
    `;
  }

  onClose() {
    $("button-done", this).addEventListener("click", () => {
      $("actions-panes > *:not([hidden])").setAttribute("hidden", "");
      $("actions-panes").removeAttribute("active");
      $(`actions-tab[name="${this.tagName.toLowerCase()}"]`).deactivate();
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
    this.classList.remove("hidden");
  }

  thisDeactivate() {
    this.classList.add("hidden");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("panes-x", PanesX);
