import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store<any>({
	state: {
		todos: [],
	},
	getters: {},
	mutations: {
		addToDo(state, todo: any) {},
	},
	actions: {
		addToDo({ commit }, todo: any) {},
	},
	modules: {},
});
