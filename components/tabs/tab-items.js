class TabItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "flex",
      "flex-1",
      "items-center",
      "gap-2",
      "text-white",
      "bg-navy-600",
      "overflow-auto",
      "w-full",
      "self-end"
    );
  }
}

customElements.define("tab-items", TabItems);
