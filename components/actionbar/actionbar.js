class ActionbarItems extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {}

  connectedCallback() {
    this.innerHTML = `
      <div class="flex justify-between gap-4">
        <div data-items class="flex gap-4 p-2">
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
        <div class="flex gap-4 p-2">
          ${this.buttonHtml(
            "refresh",
            "assets/icons/material-icons/refresh.svg",
            "Refresh"
          )}
          ${this.buttonHtml("add", "assets/icons/remixicon/add.svg", "Add row")}
          
          <!--
          <actionbar-import></actionbar-import>
          <actionbar-export></actionbar-export>
          -->
        </div>
      </div>
    `;

    this.onClick();
  }

  buttonHtml(name, src, title) {
    return `
    <div data-local-add class="${hollowClassInactive().join(
      " "
    )} flex cursor-default items-center px-2 py-1.5 select-none gap-2 rounded border">
      <img-svg src="${src}"></img-svg>
      <div>${title}</div>
    </div>
  `;
  }

  itemHtml(name, src, title) {
    return `
      <div data-title="${title}" data-action="${name}" class="${hollowClassInactive().join(
      " "
    )} flex cursor-default items-center px-2 py-1.5 select-none gap-2 rounded border">
        <img-svg src="${src}"></img-svg>
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

        if (!is_active) {
          this.activate(el);
        } else {
          this.deactivate(el);
        }

        if (["columns", "sort"].includes(name)) {
          const title = el.getAttribute("data-title");

          if (is_active) {
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
    return el.classList.contains("bg-blue-50");
  }

  activate(el) {
    el.classList.add(...hollowClassActive());
    el.classList.remove(...hollowClassInactive());
  }

  deactivate(el) {
    el.classList.add(...hollowClassInactive());
    el.classList.remove(...hollowClassActive());
  }

  deactivateAll() {
    $$("[data-action]").forEach((el) => {
      this.deactivate(el);
    });
  }
}

customElements.define("actionbar-items", ActionbarItems);
