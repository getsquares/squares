class TabItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["title", "label", "active"];
  }

  connectedCallback() {
    this.classList.add(
      ...[
        "rounded-t",
        "px-4",
        "pr-2",
        "py-1.5",
        "cursor-default",
        "select-none",
        "focus:outline-none",
        "flex",
        "gap-3",
        "items-center",
        "text-sm",
      ],
      ...tab.classesInactive()
    );

    this.setAttribute(
      "title",
      this.getAttribute("database") + "/" + this.getAttribute("table")
    );

    this.innerHTML = `
      ${this.getAttribute("table")}
      <img-svg src="remixicon/close.svg" classes="rounded w-5 h-5">
    `;

    tab.onClose(this);
    tab.onClick(this);
  }

  deactivate() {
    this.removeAttribute("active");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (attr) {
      case "active":
        if (newValue == "true") {
          tab.activate(this);
        } else {
          tab.deactivate(this);
        }
        break;
    }
  }
}

customElements.define("tab-item", TabItem);
