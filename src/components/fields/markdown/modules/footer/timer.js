export default {
	namespaced: true,
	state: {
		timeObject: null,
		durationObject: null,
		timer: 0,
		duration: 0
	},
	mutations: {
		timerSet(state) {
			clearInterval(state.timeObject);
			state.timeObject = setInterval(() => {
				state.timer++;
			}, 1000);
		},
		timerApppend(state) {
			state.timer++;
		},
		timerReset(state) {
			state.timer = 0;
		},
		durationSet(state) {
			clearInterval(state.durationObject);
			state.durationObject = setInterval(() => {
				state.duration++;
			}, 1000);
		},
		durationAppend(state) {
			state.duration++;
		},
		durationReset(state) {
			state.duration = 0;
		}
	}
};
