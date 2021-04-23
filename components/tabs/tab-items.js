class TabItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "flex",
      "items-center",
      "gap-2",
      "text-white",
      "px-2",
      "bg-blue-600"
    );
  }
}

customElements.define("tab-items", TabItems);
