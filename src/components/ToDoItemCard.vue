<template>
	<div class="to-do-card">
		<v-card class="item-card"> </v-card>
	</div>
</template>

<script lang="ts">
import { Todo } from '@/store';
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component({})
export default class ToDoItemCard extends Vue {
	toggleStatus(): void {}
}
</script>

<style lang="scss"></style>
