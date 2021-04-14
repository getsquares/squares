class ActionbarColumns extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <actionbar-icon
        src="assets/icons/remixicon/eye-off.svg"
        title="4 hidden fields"
      ></actionbar-icon>
    `;
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      const icon = this.querySelector("actionbar-icon");

      if (icon.isActive()) {
        icon.deactivate();
      } else {
        icon.activate("Toggle columns", this.html());
      }
    });
  }

  html() {
    return `
      <div class="flex gap-4">
        <label class="flex select-none items-center gap-2">
          <input
            type="checkbox"
            class="w-5 h-5 border border-gray-400 text-lightBlue-600 focus:ring-0 focus:ring-offset-0"
          />
          Testing
        </label>
        <label class="flex select-none items-center gap-2">
          <input
            type="checkbox"
            class="w-5 h-5 border border-gray-400 text-lightBlue-600 focus:ring-0 focus:ring-offset-0"
          />
          Testing
        </label>
      </div>
    `;
  }
}

customElements.define("actionbar-columns", ActionbarColumns);