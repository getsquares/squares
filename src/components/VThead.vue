<template>
  <thead>
    <tr>
      <th class="checkbox">
        <input type="checkbox" @click="checkAll" id="all" />
        <label class="slot" for="all"></label>
      </th>
      <th
        class="heading"
        :class="columnClass(colIndex)"
        v-for="(column, colIndex) in columns"
        :key="colIndex"
      >
        <div>
          <span>{{ column.name }}</span>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "VThead"
  /*methods: {
		checkAll() {
			this.checked = [];

			if (!this.checkedAll) {
				for (let i = 0; i < this.rowsCount; i++) {
					this.checked.push(i);
				}
			}
			this.$store.commit('checkedAll', !this.checkedAll);
		},
		columnClass(colIndex) {
			return {
				'current-column': colIndex == this.pos.x
			};
		}
	},
	computed: {
		checkedAll() {
			return this.$store.state.table.checked_all;
		},
		columns() {
			return this.$store.state.table.columns;
		},
		pos() {
			return this.$store.state.table.pos;
		}
	}*/
};
