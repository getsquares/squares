class ErrorX extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("btn", "btn-error");
    this.innerHTML = `
      <img-svg src="remixicon/error-warning-line.svg" classes="w-5 h-5"></img-svg>
      Error in selected cell
    `;
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      console.log(cellData());
      $("[data-modal-content]").innerHTML = `<modal-error></modal-error>`;
      $("modal-error [data-error-message]").innerText =
        cellData().updates.message;
      $("modal-box").activate();
    });
  }
}

customElements.define("error-x", ErrorX);
