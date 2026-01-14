import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import App from './App.vue'

ModuleRegistry.registerModules([AllCommunityModule]);

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
