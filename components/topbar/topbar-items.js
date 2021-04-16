class TopbarItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex gap-2 text-sm text-white">
        ${this.itemHtml(
          "info",
          "Info",
          "assets/icons/remixicon/question-fill.svg"
        )}
        ${this.itemHtml(
          "logout",
          "Logout",
          "assets/icons/material-icons/logout_black_24dp.svg"
        )}
      </div>
    `;
    this.onClick();
  }

  itemHtml(name, title, src) {
    return `
      <div title="${title}" data-action="${name}" class="flex items-center gap-1 fill-current px-2 py-1.5 select-none hover:bg-black hover:bg-opacity-20 rounded"
      >
      <img-svg src="${src}"></img-svg>
    </div>
    `;
  }

  onClick() {
    this.querySelectorAll("[data-action]").forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log("click");
        const el = e.currentTarget;
        const name = el.getAttribute("data-action");

        if (["info", "logout"].includes(name)) {
          $(
            "[data-modal-content]"
          ).innerHTML = `<modal-${name}></modal-${name}>`;
          $("modal-box").activate();
        }
      });
    });
  }
}

customElements.define("topbar-items", TopbarItems);
