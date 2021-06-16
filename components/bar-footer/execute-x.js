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
      Commit
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
        console.log(data);
        data.forEach((item) => {
          const el = $(
            `table-cell[row="${item.row}"][col="${item.col}"]`,
            main
          );

          const index = el.getAttribute("index");

          const table = get.tb.items(main.db, main.tb);
          var field_type = "text";
          if (table?.cols?.[item.col]?.config?.field !== undefined) {
            field_type = table?.cols?.[item.col]?.config?.field;
          }

          const table_data =
            state?.databases?.[state.database]?.table_items?.[state.table];
          table_data.rows[index][item.col] = item.content;

          const cell_state = item.success && item.match ? "saved" : "error";
          el.setAttribute("state", cell_state);

          if (item.success && item.match) {
            console.log("SUCCESS");
            delete table_data.updates[`${index}:${item.col}`];
          } else {
            // UPPDATERA Update

            table_data.updates[`${index}:${item.col}`].success = item.success;
            table_data.updates[`${index}:${item.col}`].match = item.match;
            //table_data.updates[`${index}:${item.col}`].content = item.content;
            /*table_data.updates[`${index}:${item.col}`]["content:after"] =
              item["content:after"];*/
            table_data.updates[`${index}:${item.col}`].message = item.message;
          }
        });

        debug("response", JSON.stringify(data, null, 4), "textarea");
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
