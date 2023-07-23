<template>
	<div class="about">
		<v-app-bar color="deep-purple" dark>
			<v-app-bar-title> Todo List </v-app-bar-title>
			<v-spacer />
		</v-app-bar>
		<div>
			<v-row>
				<v-col cols="12" sm="4">
					<div class="paddingLeft">
						<TodoCreate></TodoCreate>
						<TodoInputAPI></TodoInputAPI>
					</div>
				</v-col>
				<v-col cols="12" sm="4">
					<TodoItemsList
						header="Todo"
						removeButtonText="Remove all todo"
						:pageTypeP="pageTypeTodo"
						@onRemoveItems="removeAllTodos"
					></TodoItemsList>
				</v-col>
				<v-col cols="12" sm="4">
					<TodoItemsList
						header="Completed"
						removeButtonText="Remove all completed"
						:pageTypeP="pageTypeCompleted"
						@onRemoveItems="removeAllCompletedTodos"
					></TodoItemsList>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import TodoCreate from '../components/TodoCreate.vue';
import TodoInputAPI from '../components/TodoInputAPI.vue';
import TodoItemsList from '../components/TodoItemsList.vue';
import { pageType } from '../enums/MyEnums';

@Component({
	components: {
		TodoCreate,
		TodoInputAPI,
		TodoItemsList,
	},
})
export default class HomeView extends Vue {
	pageTypeTodo = pageType.todo;
	pageTypeCompleted = pageType.completed;

	//both remove all, one will filter based on the isCompleted flag equals to true and the other one the opposite.
	removeAllTodos(): void {
		this.$store.dispatch('removeAllTodos');
	}
	removeAllCompletedTodos(): void {
		this.$store.dispatch('removeAllCompletedTodos');
	}
}
</script>

<style lang="scss">
.paddingLeft {
	padding-left: 30px;
}
</style>
