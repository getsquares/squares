class RowSelect extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add(
      "relative",
      "flex",
      "sticky",
      "z-50",
      "left-0",
      "heading-bkg"
    );
    this.innerHTML = `
      <label class="tp relative">
        <input type="checkbox" class="checkstyle form-checkbox" name="test" />
        <div class="absolute block inset-0 shadow-y"></div>
      </label>
    `;
    this.onClick();
  }

  onClick() {
    this.querySelector("input").addEventListener("input", (e) => {
      const checked = e.currentTarget.checked;
      const el_cells = this.closest(".contents").querySelectorAll(
        "row-select, table-cell"
      );

      if (checked) {
        this.closest("table-row").setAttribute("active", "true");
      } else {
        this.closest("table-row").removeAttribute("active");
      }

      el_cells.forEach((el) => {
        if (checked) {
          this.selectOne(el);
        } else {
          this.deselectOne(el);
        }
      });
      $("row-actions").toggle();
    });
  }

  selectOne(el) {
    el.classList.add("bg-navy-100");
    el.classList.remove("bg-white");
  }

  deselectOne(el) {
    el.classList.remove("bg-navy-100");
    el.classList.add("bg-white");
  }
}

/*
Enter - Triggar annan component i annan typ
Bostav eller siffra - om allowKeypress från fält options
*/

customElements.define("row-select", RowSelect);
