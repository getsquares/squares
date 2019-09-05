export default {
	namespaced: true,
	state: {
		timeObject: null,
		ticking: true,
		timer: 0
		//savedTime: Date.now()
	},
	mutations: {
		set(state) {
			clearInterval(state.timeObject);
			state.timeObject = setInterval(() => {
				if (!state.ticking) return;
				state.timer++;
			}, 1000);
		},
		apppend(state) {
			state.timer++;
		},
		reset(state) {
			state.ticking = true;
			state.timer = 0;
		}
	},
	actions: {
		reset() {
			this.$store.commit('field/markdown/timer/reset');
		}
	}
};
