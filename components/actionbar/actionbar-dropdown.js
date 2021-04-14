class ActionbarDropdown extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("hidden", "");
    this.innerHTML = `
      <div class="gap-4 bg-gray-100 border-t flex">
        <div class="flex flex-col gap-4 p-4 flex-1">
          <div data-actionbar-title class="text-xs font-bold uppercase"></div>
          <div data-actionbar-dropdown-content></div>
        </div>
        <div class="p-4">
          <button class="focus:outline-none hover:bg-gray-200 p-2">
            <img-svg src="assets/icons/remixicon/close.svg"></img-svg>
          </button>
        </div>
      </div>
    `;

    this.onClose();
  }

  onClose() {
    this.querySelector("button").addEventListener("click", () => {
      this.deactivate();
    });
  }

  setHtml(title, content) {
    this.setTitle(title);
    this.setContent(content);
  }

  setTitle(title) {
    this.querySelector("[data-actionbar-title]").innerHTML = title;
  }

  setContent(content) {
    this.querySelector("[data-actionbar-dropdown-content]").innerHTML = content;
  }

  isActive() {
    return !this.hasAttribute("hidden");
  }

  setActive(state) {
    if (state) {
      this.removeAttribute("hidden", "");
    } else {
      this.setAttribute("hidden", "");
    }
  }

  activate() {
    this.removeAttribute("hidden", "");
  }

  deactivate() {
    this.setAttribute("hidden", "");
    this.setTitle("");
    this.setContent("");
  }
}

customElements.define("actionbar-dropdown", ActionbarDropdown);
