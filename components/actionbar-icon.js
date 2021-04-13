class ActionbarIcon extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["src", "title", "active"];
  }

  connectedCallback() {
    this.classList.add(
      "flex",
      "hover:bg-lightBlue-50",
      "rounded",
      "cursor-default",
      "items-center",
      "px-2",
      "py-1.5",
      "select-none",
      "gap-2"
    );
    this.innerHTML = `
      <img-svg classes="w-5 h-5" src="${this.getAttribute("src")}"></img-svg>
      <div data-actionbar-action>${this.getAttribute("title")}</div>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (attr) {
        case "active":
          if (newValue == "true") {
            console.log("weew");
            this.classList.add("bg-lightBlue-100");
            this.classList.remove("hover:bg-lightBlue-50");
          } else {
            this.classList.add("hover:bg-lightBlue-50");
            this.classList.remove("bg-lightBlue-100");
          }
          break;
      }
    }
  }

  setTitle(title) {
    this.setAttribute("title", title);
  }

  isActive() {
    return this.getAttribute("active") == "true";
  }

  activate(title, html) {
    $$("actionbar-icon").forEach((el) => {
      el.deactivate();
    });

    this.setAttribute("active", "true");
    const dropdown = $("actionbar-dropdown");
    dropdown.activate();
    dropdown.setTitle(title);
    dropdown.setContent(html);
  }

  deactivate() {
    this.removeAttribute("active");
    $("actionbar-dropdown").deactivate();
  }
}

customElements.define("actionbar-icon", ActionbarIcon);
