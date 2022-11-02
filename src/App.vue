<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component()
export default class App extends Vue {}
</script>
