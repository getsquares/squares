class ActionbarFilter extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div data-action>
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
        <div>Filter</div>
      </div>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "active") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }
  }
}

customElements.define("actionbar-filter", ActionbarFilter);
