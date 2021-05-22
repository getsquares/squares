class MainX extends HTMLElement {
  constructor() {
    super();
  }

  /*static get observedAttributes() {
    return ["active"];
  }*/

  connectedCallback() {}

  deactivatePanes() {
    $$("pane-main").forEach((item) => {
      item.deactivate();
    });
  }

  addPane() {
    $("main-x").insertAdjacentHTML("beforeend", this.templatePane());
  }

  templatePane() {
    return `
      <pane-main database="${state.database}" db="${state.database}" table="${state.table}" tb="${state.table}"></pane-main>
    `;
  }
}

customElements.define("main-x", MainX);
