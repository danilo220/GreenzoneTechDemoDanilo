<template>
	<v-form ref="form" lazy-validation>
		<div class="text-h4 font-weight-bold">{{ header }}</div>
		<v-text-field
			v-model.number="todoIdInput"
			label="Todo Item Id"
			placeholder="e.g 1"
			:rules="todoIdInputRules"
			type="number"
			min="1"
			required
		></v-text-field>
		<v-btn @click="fetchToDoItem"> Fetch todo </v-btn>
	</v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ITodo } from '@/store';
@Component({})
export default class TodoInputAPI extends Vue {
	@Prop({ default: 'Fetch Todo from endpoint' }) readonly header!: string;

	todoIdInput = NaN as number;
	todoIdInputRules = [
		(v: number) => v !== 0 || 'Please enter 1 or above',
		(v: number) => !!v || 'Todo Item Id is required',
		(v: number) => v > 0 || 'Please enter 1 or above',
		(v: number) =>
			(v && !this.checkDuplicateId(v)) || 'Id fetched already exists',
	];

	get isFormValid() {
		return (this.$refs.form as Vue & { validate: () => boolean }).validate();
	}
	checkDuplicateId(value: number): boolean {
		let todosTemp = this.$store.getters.getAllTodos as ITodo[];
		var idFound = todosTemp.filter((todoTemp) => todoTemp.id === value);
		return idFound?.length > 0 ? true : false;
	}
	fetchToDoItem(): void {
		if (!this.isFormValid) {
			return;
		}
		this.$store.dispatch('fetchTodoFromAPI', this.todoIdInput);
	}
}
</script>

<style lang="scss"></style>
