class TopbarItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex gap-2 text-sm text-white">
        ${this.itemHtml(
          "info",
          "assets/icons/remixicon/information.svg",
          "Info"
        )}
        ${this.itemHtml(
          "logout",
          "assets/icons/remixicon/door-open-fill.svg",
          "Logout"
        )}
      </div>
    `;
    this.onClick();
  }

  itemHtml(name, src, title) {
    return `
      <div data-action="${name}" class="flex items-center gap-1 fill-current px-2 py-1.5 select-none hover:bg-lightBlue-700 rounded"
      >
      <img-svg src="${src}"></img-svg>
      ${title}
    </div>
    `;
  }

  onClick() {
    this.querySelectorAll("[data-action]").forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log("click");
        const el = e.currentTarget;
        const name = el.getAttribute("data-action");

        console.log(name);

        if (["info", "logout"].includes(name)) {
          console.log($("modal-box"));
          $("modal-box").activate();
        }
      });
    });
  }
}

customElements.define("topbar-items", TopbarItems);
