class ExecuteX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("btn", "btn-primary");
    this.innerHTML = `
      <img-svg src="remixicon/flashlight-fill.svg" classes="w-5 h-5"></img-svg>
      Execute
    `;
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", () => {
      const main = this.closest("pane-main");
      $$(`table-cell[state="changed"]`, main).forEach((el) => {
        el.setAttribute("state", "saving");
      });

      this.run().then((data) => {
        data.forEach((item) => {
          const el = $(
            `table-cell[row="${item.row}"][col="${item.col}"]`,
            main
          );

          const table = get.tb.items(main.db, main.tb);
          var field_type = "text";
          if (table?.cols?.[item.col]?.config?.field !== undefined) {
            field_type = table?.cols?.[item.col]?.config?.field;
          }

          console.log(table);
          console.log(field_type);

          if (item.success) {
            el.setAttribute("state", "saved");
          } else {
            el.setAttribute("state", "error");
          }
        });
      });
    });
  }

  async run() {
    const main = this.closest("pane-main");
    const db = main.db;
    const tb = main.tb;

    const items = get.tb.items(db, tb);

    try {
      const resp = await axios.post(
        `http://localhost/tools/squares/server/php/queries/insert.php?database=test&table=a_table_with_a_really_long_name`,
        {
          updates: items?.updates,
        }
      );

      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
}

customElements.define("execute-x", ExecuteX);
