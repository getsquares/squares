class ModalBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.deactivate();
    this.innerHTML = `
      <div
        data-backdrop
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="flex items-start w-full max-w-lg bg-white shadow-md">
          <div class="p-8" data-modal-content>
            <modal-info></modal-info>
          </div>
          <button class="p-2 m-2 focus:outline-none hover:bg-gray-100">
            <img-svg src="assets/icons/remixicon/close.svg"></img-svg>
          </button>
        </div>
      </div>
    `;
    this.onClose();
  }

  onClose() {
    this.querySelector("button").addEventListener("click", (e) => {
      this.deactivate();
    });

    this.querySelector("[data-backdrop]").addEventListener("click", (e) => {
      if (e.target != e.currentTarget) return;
      this.deactivate();
    });
  }

  activate() {
    this.removeAttribute("hidden");
  }

  deactivate() {
    this.setAttribute("hidden", "");
  }
}

customElements.define("modal-box", ModalBox);