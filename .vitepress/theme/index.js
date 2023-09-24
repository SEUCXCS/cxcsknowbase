// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from '../../components/showAuthors.vue'


export default {
    ...DefaultTheme,
    Layout: MyLayout
}