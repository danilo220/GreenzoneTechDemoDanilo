<template>
	<v-card :max-height="700" :max-width="300" v-click-outside="resetValidation">
		<v-form ref="form" lazy-validation>
			<v-card-title>
				<v-textarea
					v-model="internalTitle"
					label="Title"
					background-color="orange"
					:rules="titleRules"
					:counter="titleMaxCharacters"
					@keydown.enter.prevent
					@change="editTodoTitle"
				>
				</v-textarea>
			</v-card-title>
			<v-card-subtitle>
				<v-textarea
					v-model="internalDescription"
					label="Description"
					background-color="yellow"
					:rules="descriptionRules"
					:counter="descriptionMaxCharacters"
					@change="editTodoDescription"
				></v-textarea>
			</v-card-subtitle>
			<div>
				<v-file-input v-model="image" />
				<v-img :width="300" :height="150" :src="todoItem.imageUrl" />
			</div>
			<v-card-actions>
				<v-checkbox v-model="completedTick" label="Complete"></v-checkbox>
				<!-- <v-btn icon="delete" size="small"></v-btn> -->
				<div class="paddingLeft">
					<v-btn @click="removeToDoItem"> Remove </v-btn>
				</div>
			</v-card-actions>
			<v-snackbar v-model="snackbar" :timeout="timeout" color="green">
				{{ snackBarMessage }}
			</v-snackbar>
		</v-form>
	</v-card>
</template>

<script lang="ts">
import { ITodo } from '@/store';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';

@Component({})
export default class ToDoItemCard extends Vue {
	@Prop(String) readonly todoItemTitle!: string;
	@Prop(String) readonly todoItemDescription!: string;
	@Prop(Boolean) readonly isTicked!: boolean;
	@Prop() readonly todoItem!: ITodo;
	image = null;
	completedTick = false as boolean;
	internalTitle = '' as string;
	internalDescription = '' as string;
	titleMaxCharacters = 100 as number;
	descriptionMaxCharacters = 200 as number;
	titleRules = [
		(v: string) => !!v || 'Title is required',
		(v: string) =>
			v?.length <= this.titleMaxCharacters ||
			`Title must not exceed ${this.titleMaxCharacters} characters`,
		(v: string) =>
			(v && !this.checkDuplicateTitle(v)) || 'Title already exists',
	];
	descriptionRules = [
		(v: string) => !!v || 'Description is required',
		(v: string) =>
			v?.length <= this.descriptionMaxCharacters ||
			`Description must not exceed ${this.descriptionMaxCharacters} characters`,
	];
	snackbar = false as boolean;
	snackBarMessage = '' as string;
	timeout = 2000 as number;

	@Watch('completedTick')
	completedTickChanged(val: boolean) {
		this.completeItem(this.todoItem, val);
	}
	@Watch('image')
	imageChanged(val: Blob | MediaSource) {
		if (!this.image) return;
		var urlTemp = URL.createObjectURL(val);
		this.todoItem.imageUrl = urlTemp;
	}
	checkDuplicateTitle(value: string): boolean {
		let todosTemp = this.$store.getters.getAllTodos as ITodo[];
		var foundDescription = todosTemp.filter(
			(todoTemp) => todoTemp.title === value
		);

		return foundDescription?.length > 0 ? true : false;
	}
	removeToDoItem(): void {
		this.$store.dispatch('removeTodo', this.todoItem);
	}
	editTodoTitle(): void {
		if (!this.isFormValid) {
			return;
		}
		this.todoItem.title = this.internalTitle;
		this.$store.dispatch('editTodo', this.todoItem);
		this.displaySnackBar('Edited title successfully');
	}
	editTodoDescription(): void {
		this.todoItem.description = this.internalDescription;
		this.$store.dispatch('editTodo', this.todoItem);
		this.displaySnackBar('Edited description successfully');
	}
	displaySnackBar(snackBarMessage: string) {
		this.snackbar = true;
		this.snackBarMessage = snackBarMessage;
	}
	completeItem(item: ITodo, isCompleted: boolean): void {
		item.isCompleted = isCompleted;
	}
	resetValidation() {
		return (
			this?.$refs?.form as Vue & { resetValidation: () => boolean }
		)?.resetValidation();
	}
	get isFormValid() {
		return (this?.$refs?.form as Vue & { validate: () => boolean })?.validate();
	}
	mounted() {
		this.completedTick = this.todoItem.isCompleted;
		//it's good practice to not have the props go straight into v-models that's why I created a internal title and description
		this.internalTitle = this.todoItemTitle;
		this.internalDescription = this.todoItemDescription;
		this.resetValidation();
	}
}
</script>

<style lang="scss">
.paddingLeft {
	padding-left: 10px;
}
</style>
