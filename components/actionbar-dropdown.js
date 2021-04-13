class ActionbarDropdown extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["title", "active"];
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

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (attr) {
        case "title":
          document.querySelector("[data-actionbar-title]").innerHTML = newValue;
          break;
        case "active":
          if (newValue == "true") {
            this.removeAttribute("hidden");
          } else {
            this.setAttribute("hidden", "");
          }
          break;
      }
    }
  }

  onClose() {
    this.querySelector("button").addEventListener("click", () => {
      this.deactivate();
    });
  }

  setTitle(title) {
    this.setAttribute("title", title);
  }

  setContent(html) {
    this.querySelector("[data-actionbar-dropdown-content]").innerHTML = html;
  }

  isActive() {
    return this.getAttribute("active") == "true";
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("actionbar-dropdown", ActionbarDropdown);
