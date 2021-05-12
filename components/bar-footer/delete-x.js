class DeleteX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("btn", "btn-delete");
    this.innerHTML = `
      <img-svg src="remixicon/delete-bin-line.svg" classes="w-5 h-5"></img-svg>
      Delete
    `;
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      $$(".row-new[active]").forEach((el) => {
        el.remove();
      });

      this.delete();

      /* {
        id: 3
        database: asdas
        table: asdas
      }
      {
        id: 3
        database: asdas
        table: asdas
      }
      */
    });
  }

  async delete() {
    const ids = [1, 2, 3];
    try {
      const resp = await axios.post(
        `http://localhost/tools/squares/server/php/queries/delete.php?database=asda&table=asda`,
        {
          ids: ids,
        }
      );

      console.log(resp.data);

      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
}

customElements.define("delete-x", DeleteX);
