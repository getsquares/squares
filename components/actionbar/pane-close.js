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
    $("button", this).addEventListener("click", () => {
      //this.closest(hide).deactivate();
      $("actions-panes > *:not([hidden])", this).hidden = true;
      $("actions-panes", this).removeAttribute("active");
      $(`actions-tab[active="true"]`, this).deactivate();
    });
  }
}

customElements.define("pane-close", PaneClose);
