<template>
	<v-form ref="form" lazy-validation>
		<div class="text-h4 font-weight-bold">{{ header }}</div>
		<v-text-field
			v-model="todoItemTitle"
			label="Todo Item Title"
			placeholder="e.g Clean the car"
			:rules="titleRules"
			:counter="titleMaxCharacters"
			required
			clearable
		></v-text-field>
		<v-text-field
			v-model="todoItemDescription"
			label="Todo Item Description"
			placeholder="e.g. Clean the car by using the pressure washer and snowfoam"
			:rules="descriptionRules"
			:counter="descriptionMaxCharacters"
			required
			clearable
		></v-text-field>
		<v-btn @click="addToDoItem"> Add to list </v-btn>
	</v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ITodo } from '@/store';
import { v4 as uuidv4 } from 'uuid';

@Component({})
export default class TodoCreate extends Vue {
	@Prop({ default: 'Create todo item' }) readonly header!: string;

	todoItemTitle = '' as string;
	todoItemDescription = '' as string;
	titleMaxCharacters = 100 as number;
	descriptionMaxCharacters = 200 as number;
	descriptionExist = false as boolean;

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
	get isFormValid() {
		return (this.$refs.form as Vue & { validate: () => boolean }).validate();
	}
	//Check if the Duplicate title exists by grabbing all the todos from the store
	checkDuplicateTitle(value: string): boolean {
		let todosTemp = this.$store.getters.getAllTodos as ITodo[];
		var foundDescription = todosTemp.filter(
			(todoTemp) => todoTemp.title === value
		);
		return foundDescription?.length > 0 ? true : false;
	}
	//I decided to use uuidv4 when creating a new todo for the id
	// to make it very unique instead of just using integers
	//however the Ids from the 3rd party API is still integers
	//Using uuidv4 also helps Id key duplication when adding those todos from the endpoint
	addToDoItem(): void {
		if (!this.isFormValid) {
			return;
		}
		let todoToAdd: ITodo = {
			title: this.todoItemTitle,
			description: this.todoItemDescription,
			id: uuidv4(),
			isCompleted: false,
			imageUrl: '',
		};
		this.$store.dispatch('addToDo', todoToAdd);
	}
}
</script>

<style lang="scss"></style>
