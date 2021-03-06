class TopbarWrap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div
      class="flex items-center justify-between pr-2 text-gray-200 bg-blueGray-700"
    >
      <resize-logo>
        <div class="pl-4 pr-8 flex items-center gap-2 text-2xl text-white uppercase">
          <img-svg
            src="remixicon/checkbox-multiple-blank.svg"
          ></img-svg>
          <img-svg src="logo.svg" classes="h-5"></img-svg>
        </div>
      </resize-logo>
      <topbar-items></topbar-items>
    </div>
    `;
  }
}

customElements.define("topbar-wrap", TopbarWrap);
