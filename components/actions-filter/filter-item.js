class FilterItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("contents");
    this.innerHTML = `
      <select class="actionbar-select">
        <option>hello</option>
        <option>hello2</option>
      </select>
      <select class="actionbar-select">
        ${this.matchesOptions()}
      </select>
      <input type="text" class="actionbar-select" />
      <filter-delete class="btn btn-default">
        <img-svg src="remixicon/delete-bin-line.svg" classes="w-5 h-5"></img-svg>
      </filter-delete>
    `;
    this.onRemove();
  }

  onRemove() {
    this.querySelector("filter-delete").addEventListener("click", (e) => {
      e.currentTarget.closest("filter-item").remove();
    });
  }

  matchesOptions() {
    const matches = [
      {
        name: "contains",
        label: "Contains",
      },
      {
        name: "not_contains",
        label: "Not contains",
      },
      {
        name: "starts_with",
        label: "Starts with",
      },
      {
        name: "ends_with",
        label: "Ends with",
      },
      {
        name: "equals",
        label: "Equals",
      },
      {
        name: "not_equals",
        label: "Not equals",
      },
      {
        name: "less_than",
        label: "Less than",
      },
      {
        name: "larger_than",
        label: "Larger than",
      },
    ];

    let html_part = [];

    matches.forEach((item) => {
      html_part.push(`<option value="${item.name}">${item.label}</option>`);
    });

    return html_part.join(" ");
  }
}

customElements.define("filter-item", FilterItem);
