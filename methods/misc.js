// Reset store
function resetStore() {
  dom.current = null;
  dom.left = null;
  dom.right = null;
  dom.up = null;
  dom.down = null;
}

function debug(name, message, type = "span") {
  if (!$(`debug-box [data-${name}] ${type}`)) return;
  $(`debug-box [data-${name}] ${type}`).innerHTML = message;
}

function cellData() {
  const table = state?.databases?.[state.database]?.table_items?.[state.table];
  const cell_value = table?.rows?.[state.index]?.[state.col];
  const cell_meta = table?.cols?.[state.col]?.meta;
  let cell_config = table?.cols?.[state.col]?.config;

  // Saved data
  // Efter saved uppdateras inte value

  const updates = table?.updates?.[`${state.index}:${state.col}`];

  const default_cell_config = {
    field: "text",
    preview: "text",
  };

  const default_field_config = {
    mode: "dropdown",
  };

  cell_config = { ...default_cell_config, ...cell_config };

  field_config = {
    ...default_field_config,
    ...state?.fields[cell_config.field]?.config,
  };

  const meta = {
    is_nullable: cell_meta["Null"] === "YES" ? true : false,
    type: cell_meta["Type"],
  };

  return {
    value: cell_value,
    meta: meta,
    cell_config: cell_config,
    field_config: field_config,
    updates: updates,
  };
}
