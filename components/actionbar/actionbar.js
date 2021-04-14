class ActionbarItems extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {}

  connectedCallback() {
    this.innerHTML = `
      <div class="flex justify-between gap-4 p-2">
        <div data-items class="flex gap-4">
          ${this.itemHtml(
            "refresh",
            "assets/icons/material-icons/refresh.svg",
            "Refresh"
          )}
          ${this.itemHtml(
            "columns",
            "assets/icons/remixicon/eye-off.svg",
            "4 hidden columns"
          )}
          <!--<actionbar-filter></actionbar-filter>-->
          ${this.itemHtml(
            "sort",
            "assets/icons/remixicon/arrow-up-down.svg",
            "Sort"
          )}
        </div>
        <!--
        <div class="flex gap-4">
          <actionbar-import></actionbar-import>
          <actionbar-export></actionbar-export>
        </div>
        -->
      </div>
    `;

    this.onClick();
  }

  attributeChangedCallback(attr, oldValue, newValue) {}

  itemHtml(name, src, title) {
    return `
      <div data-title="${title}" data-action="${name}" class="flex hover:bg-lightBlue-50 rounded cursor-default items-center px-2  py-1.5 select-none gap-2">
        <img-svg classes="w-5 h-5" src="${src}"></img-svg>
        <div>${title}</div>
      </div>
    `;
  }

  onClick() {
    this.querySelectorAll("[data-action]").forEach((item) => {
      item.addEventListener("click", (e) => {
        const el = e.currentTarget;
        const is_active = this.isActive(el);
        const name = el.getAttribute("data-action");
        const dropdown = $("actionbar-dropdown");

        this.deactivateAll();

        if (is_active) {
          this.activate(el);
        } else {
          this.deactivate(el);
        }

        if (["columns", "sort"].includes(name)) {
          const title = el.getAttribute("data-title");

          if (this.isActive(el)) {
            dropdown.deactivate();
          } else {
            const html = `<actionbar-${name}2></actionbar-${name}2>`;
            dropdown.activate();
            dropdown.setHtml(title, html);
          }
        } else {
          dropdown.deactivate();
        }
      });
    });
  }

  isActive(el) {
    return el.classList.contains("hover:bg-lightBlue-50");
  }

  activate(el) {
    el.classList.add("bg-lightBlue-100");
    el.classList.remove("hover:bg-lightBlue-50");
  }

  deactivate(el) {
    el.classList.add("hover:bg-lightBlue-50");
    el.classList.remove("bg-lightBlue-100");
  }

  deactivateAll() {
    $$("[data-action]").forEach((el) => {
      this.deactivate(el);
    });
  }
}

customElements.define("actionbar-items", ActionbarItems);
