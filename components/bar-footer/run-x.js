class RunX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("btn", "btn-primary");
    this.innerHTML = `
      <img-svg src="remixicon/flashlight-fill.svg" classes="w-5 h-5"></img-svg>
      Run queries
    `;
    //this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      this.run();
    });
  }

  async run() {
    const ids = [1, 2, 3];
    try {
      const resp = await axios.post(
        `http://localhost/tools/squares/server/php/queries/delete.php?database=asda&table=asda`,
        {
          ids: ids,
        }
      );

      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
}

customElements.define("run-x", RunX);
