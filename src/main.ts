import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  // icons: {
  //   defaultSet: 'mdi', // 必要なアイコンセットだけを指定
  // },
  theme: {
    defaultTheme: 'customLight',
    themes: {
      customLight: {
        dark: false,
        colors: {
          primary: '#B9D7EA',
          secondary: '#D6E6F2',
          accent: '#769FCD',
          background: '#F7FBFC',
        },
      },
      customDark: {
        dark: true,
        colors: {
          primary: '#BB86FC', // 薄紫
          secondary: '#03DAC6', // 青緑
          background: '#121212', // 黒
        },
      },
    },
  },
});

createApp(App).use(router).use(vuetify).mount('#app');
