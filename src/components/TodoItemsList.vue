<template>
	<div>
		<div class="text-h4 font-weight-bold">{{ header }}</div>
		<div>
			<v-btn @click="removeItems"> {{ removeButtonText }} </v-btn>
		</div>
		<div v-for="item in todosInternal" :key="item.id">
			<div v-if="displayItem(item)">
				<ToDoItemCard
					:todoItemTitle="item?.title"
					:todoItemDescription="item?.description"
					:todoItem="item"
				></ToDoItemCard>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import ToDoItemCard from '../components/ToDoItemCard.vue';
import { ITodo } from '@/store';
import { pageType } from '../enums/MyEnums';

@Component({
	components: {
		ToDoItemCard,
	},
})
export default class TodoItemsList extends Vue {
	@Prop(String) readonly header!: string;
	@Prop(String) readonly removeButtonText!: string;
	@Prop() readonly pageTypeP!: pageType;
	todosInternal: ITodo[] = [];

	//I decided to have an internal to do instead of accessing the todos from store and loop around it
	@Watch('$store.state.todos')
	onChildChanged(val: Array<ITodo>) {
		this.todosInternal = val;
	}
	displayItem(item: ITodo): boolean {
		if (this.pageTypeP === pageType.completed && item.isCompleted) {
			return true;
		}
		if (this.pageTypeP === pageType.todo && !item.isCompleted) {
			return true;
		}
		return false;
	}
	//this event can be picked up by the parent HomeView.vue to either delete all todo or all completed
	removeItems(): void {
		this.$emit('onRemoveItems');
	}
}
</script>

<style lang="scss"></style>
