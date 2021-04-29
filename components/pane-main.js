class PaneMain extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("flex", "flex-col", "overflow-auto");
    this.innerHTML = `
      ${this.actionbar()}

      <div class="flex-1 flex my-4 overflow-auto">
        <div class="flex-1 overflow-x-auto border border-gray-200">
    <!-- Table wrap -->
    <div class="flex-1 text-[13px] w-[1300px]">
      
        <!-- Table -->
        <div data-table class="grid gap-y-px bg-white grid-cols-[auto,1200px,300px,300px]">
          ${this.headings()}
          <div data-cells class="contents"></div>
        </div>
      
    </div>
  </div>
  </div>

  <prev-next></prev-next>

`;
    let parts = "";
    for (let i = 0; i < 100; i++) {
      parts += this.part();
    }

    $("[data-cells]").innerHTML = parts;
  }

  headings() {
    return `
    <div data-headings class="z-40 contents">
      <table-heading-check></table-heading-check>
      <table-heading title="id" key="true"></table-heading>
      <table-heading title="title"></table-heading>
      <table-heading title="description"></table-heading>
    </div>`;
  }

  actionbar() {
    return `<!-- Actionbar -->
    <div>
      <actionbar-items></actionbar-items>
      <pane-items class="mx-8 block">
        <pane-columns></pane-columns>
        <pane-filter></pane-filter>
        <pane-sort></pane-sort>
      </pane-items>
    </div>`;
  }

  part() {
    return `
      <div class="contents">
        <row-select></row-select>
        <table-cell></table-cell>
        <table-cell></table-cell>
        <table-cell></table-cell>
      </div>`;
  }
}

customElements.define("pane-main", PaneMain);
