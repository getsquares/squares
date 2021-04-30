class ActionsWrap extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("flex", "flex-col", "gap-2");
    this.innerHTML = `      
      <actionbar-items></actionbar-items>
      <pane-items class="block bg-white border rounded border-gray-200">
        <pane-columns></pane-columns>
        <pane-filter></pane-filter>
        <pane-sort></pane-sort>
      </pane-items>
      `;
  }
}

customElements.define("actions-wrap", ActionsWrap);
