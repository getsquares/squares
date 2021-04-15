class TopbarItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex gap-2 text-sm text-white">
        ${this.itemHtml("info", "assets/icons/remixicon/question-fill.svg")}
        ${this.itemHtml(
          "logout",
          "assets/icons/material-icons/logout_black_24dp.svg"
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
      ${typeof title !== "undefined" ? title : ""}
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
