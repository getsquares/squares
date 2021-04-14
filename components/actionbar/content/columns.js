class ActionbarColumns2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
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

customElements.define("actionbar-columns2", ActionbarColumns2);
