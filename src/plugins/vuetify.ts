import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
	iconfont: 'md',

	options: {
		customProperties: true,
	},
	// theme: {
	//   primary: "#4fa928",
	//   primaryDark: "#326918",
	//   secondary: "#673ab7",
	//   accent: "#83db59",
	//   error: "#D2232A",
	//   yellow: "#FFCC00",
	//   brown: "#654321",
	// },
});
