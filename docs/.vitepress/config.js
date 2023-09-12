const { getSideBar } = require('vitepress-plugin-autobar')
module.exports = {
    title: '成贤计协知识库',
    description: 'debug the world',
    // themeConfig: {
    //     // ...
    //     sidebar: getSideBar("./docs"),
    // },
    themeConfig: {
        // 上端导航栏
        nav: [
            { text: 'Guide', link: '/guide' },
            { text: 'Config', link: '/config' },
            { text: 'Changelog', link: 'https://github.com/...' }
        ],
        // 侧边栏
        sidebar: [
            { text: 'Home', link: '/' },
            {
                text: '计协介绍',
                // link: '/计协介绍/',
                items: [
                    { text: '计协历史', link: '/计协介绍/计协历史' },
                    { text: '计协组织结构', link: '/计协介绍/计协组织结构' }
                ]
            }
        ],
        // footer: {
        //     message: 'Released under the MIT License.',
        //     copyright: 'Copyright © 2019-present Evan You'
        // }
        search: {
            provider: 'local'
        }
    }
}