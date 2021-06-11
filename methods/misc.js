// Reset store
function resetStore() {
  dom.current = null;
  dom.left = null;
  dom.right = null;
  dom.up = null;
  dom.down = null;
}

function debug(name, message) {
  if (!$(`debug-box [data-${name}] span`)) return;
  $(`debug-box [data-${name}] span`).innerHTML = message;
}

function cellData() {
  const cell =
    state?.databases?.[state.database]?.table_items?.[state.table]?.rows?.[
      state.index
    ]?.[state.col];

  return JSON.stringify(cell);
  console.log(cell);

  /*const root = context.closest("pane-main");
  const table_cell = context.closest("table-cell");
  const db = root.db;
  const tb = root.tb;
  const col = table_cell.getAttribute("col");
  const row = table_cell.getAttribute("row");
  const index = table_cell.getAttribute("index");

  return { db, tb, col, row, index };*/
}
