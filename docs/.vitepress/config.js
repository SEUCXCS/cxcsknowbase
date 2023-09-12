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
            { text: 'Home', link: '/readme.md' },
            {
                text: '计协介绍',
                // link: '/计协介绍/',
                items: [
                    { text: '计协历史', link: '/计协介绍/计协历史' },
                    { text: '计协组织结构', link: '/计协介绍/计协组织结构' }
                ],
                collapsed: true
            },
            {
                text: '竞赛相关',
                items: [
                    { text: '蓝桥杯', link: '/比赛/蓝桥杯' },
                    { text: "其他比赛", link: "/比赛/其他比赛" }
                ],
                collapsed: true
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