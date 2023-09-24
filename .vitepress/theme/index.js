// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from '../../components/showOuthors.vue'


export default {
    ...DefaultTheme,
    Layout: MyLayout
}