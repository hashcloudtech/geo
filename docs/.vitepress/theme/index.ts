import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import ContactForm from './components/ContactForm.client.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ContactForm', ContactForm)
  }
}
