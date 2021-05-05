class OrderItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("contents");
    this.innerHTML = `
      <select class="form-select actionbar-select">
        <option>hello</option>
        <option>hello2</option>
      </select>
      <select class="form-select actionbar-select">
        ${this.matchesOptions()}
      </select>
      <order-delete class="btn btn-default">
        <img-svg src="remixicon/delete-bin-line.svg" classes="w-5 h-5"></img-svg>
      </order-delete>
    `;
    this.onRemove();
  }

  onRemove() {
    this.querySelector("order-delete").addEventListener("click", (e) => {
      e.currentTarget.closest("order-item").remove();
    });
  }

  matchesOptions() {
    const matches = [
      {
        name: "ASC",
        label: "Ascending",
      },
      {
        name: "DESC",
        label: "Descending",
      },
    ];

    let html_part = [];

    matches.forEach((item) => {
      html_part.push(`<option value="${item.name}">${item.label}</option>`);
    });

    return html_part.join(" ");
  }
}

customElements.define("order-item", OrderItem);
