class PaneClose extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="p-2">
        <button class="focus:outline-none hover:bg-gray-100 p-2 rounded">
          <img-svg src="remixicon/close.svg"></img-svg>
        </button>
      </div>`;
    this.onClick();
  }

  onClick() {
    const hide = this.getAttribute("hide");

    $("button", this).addEventListener("click", () => {
      this.closest(hide).deactivate();
    });
  }
}

customElements.define("pane-close", PaneClose);
