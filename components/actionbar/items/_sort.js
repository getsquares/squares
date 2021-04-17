class ActionbarSort extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <actionbar-icon
        src="assets/icons/remixicon/arrow-up-down.svg"
        title="Sort"
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
        icon.activate("Sort", this.html());
      }
    });
  }

  html() {
    return `
      <div class="flex gap-4">
        <label class="flex select-none items-center gap-2">
          <input
            type="radio"
            class="w-5 h-5 border border-gray-400 text-blue-600 focus:ring-0 focus:ring-offset-0"
            name="same"
          />
          Testing
        </label>
        <label class="flex select-none items-center gap-2">
          <input
            type="radio"
            class="w-5 h-5 border border-gray-400 text-blue-600 focus:ring-0 focus:ring-offset-0"
            name="same"
          />
          Testing
        </label>
      </div>
    `;
  }
}

customElements.define("actionbar-sort", ActionbarSort);
