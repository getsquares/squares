class ActionsX extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("flex", "flex-col", "gap-4");
    this.innerHTML = `      
      <actions-tabs></actions-tabs>
      <actions-panes></actions-panes>
      `;
  }
}

customElements.define("actions-x", ActionsX);
