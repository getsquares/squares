class TopbarWrap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div
      class="flex items-center justify-between py-2 pl-4 pr-2 text-gray-200"
    >
      <div class="flex items-center gap-2 text-2xl text-white uppercase">
        <img-svg
          src="assets/icons/remixicon/checkbox-multiple-blank.svg"
        ></img-svg>
        <img-svg src="assets/icons/logo.svg" classes="h-5"></img-svg>
      </div>
      <topbar-items></topbar-items>
    </div>
    `;
  }
}

customElements.define("topbar-wrap", TopbarWrap);
