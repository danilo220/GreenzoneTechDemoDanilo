import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store<any>({
	state: {
		todos: [] as ITodo[],
	},
	getters: {
		//getter to get all todos, currently used to check for duplicates
		getAllTodos(state) {
			return state.todos;
		},
	},
	mutations: {
		//I only use my mutations to change the value of the state
		addToDo(state, todo: ITodo) {
			state.todos.push(todo);
		},
		//I decided to add a remove individual and all items to make the app nicer to use
		removeTodo(state, todo: ITodo) {
			const todoToRemove = state.todos.indexOf(todo);
			state.todos.splice(todoToRemove, 1);
		},
		removeAllTodos(state) {
			state.todos = state.todos.filter(
				(todo: ITodo) => todo.isCompleted === true
			);
		},
		removeAllCompletedTodos(state) {
			state.todos = state.todos.filter(
				(todo: ITodo) => todo.isCompleted === false
			);
		},
		//The same applies to editing, this was a bit tricky to get working but I got there at the end :)
		editTodo(state, todoP: ITodo) {
			const todoToEditFound = state.todos.filter(
				(todo: ITodo) => todo.id === todoP.id
			);
			const todoToEdit = state.todos.indexOf(todoToEditFound[0]);
			state.todos.splice(todoToEdit, 1, todoP);
		},
	},
	actions: {
		//addToDo action to be called by components
		addToDo({ commit }, todo: ITodo) {
			commit('addToDo', todo);
		},
		removeTodo({ commit }, todo: ITodo) {
			commit('removeTodo', todo);
		},
		removeAllTodos({ commit }) {
			commit('removeAllTodos');
		},
		removeAllCompletedTodos({ commit }) {
			commit('removeAllCompletedTodos');
		},
		//fetching data from API needs to be done in an action and call mutation to change the state of todos
		async fetchTodoFromAPI({ commit }, todoId: number) {
			const todo = await axios.get(
				`https://jsonplaceholder.typicode.com/todos/${todoId}`
			);
			const todoToAdd: ITodo = {
				title: todo?.data?.title,
				description: todo?.data?.description,
				id: todo?.data?.id,
				isCompleted: todo?.data?.completed,
				imageUrl: todo?.data?.imageUrl,
			};
			commit('addToDo', todoToAdd);
		},
		editTodo({ commit }, todo: ITodo) {
			commit('editTodo', todo);
		},
	},
	modules: {},
});

//I renamed Todo to ITodo because I decided to use Todo as an interface
//I was going to create a new folder to add this interface but since there was already an import for it in HomeView.vue I decided to keep it here
export interface ITodo {
	title: string;
	description: string;
	id: number | string; //number = Id from api, string = id from uuidv4
	isCompleted: boolean;
	imageUrl: string;
}
