class ModalError extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="flex flex-col flex-1 gap-6">      
      <h2 class="text-xl font-bold">Error</h2>
      <p>
        The selected cell has errors.
      </p>
      <div data-error-message class="overflow-y-auto border border-red-300 h-[300px] focus:outline-none focus:border-red-300 w-full p-2 bg-red-100 text-red-800">dfsf</div>
    </div>
    `;
  }
}

customElements.define("modal-error", ModalError);
