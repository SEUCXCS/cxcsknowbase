import { defineConfig } from 'vitepress'


import fs from 'fs'
import path from 'path'

// 忽略的文件夹和文件
let ban = [
    "node_modules",
    ".vitepress",
    "api-examples.md",
    "markdown-examples.md",
    "index.md",
    "README.md",
    ".git"
]

const basePath = path.join(__dirname, "../")

const sidebar = [
    {
        text: "关于本知识库",
        link: "/README"
    },
    ...readfile(path.join(__dirname, "../"))
]



/**
 * 读取文件夹以及文件
 * @param {string} dir 
 */
function readfile(dir) {
    let sidebarnode = []
    // 获取文件夹下的所有文件以及文件夹
    let files = fs.readdirSync(dir)
    // 遍历文件夹
    files.forEach((file) => {
        // 获取文件夹或文件的路径
        let filePath = path.join(dir, file)
        // 获取文件信息
        let stat = fs.statSync(filePath)
        // 判断是否为文件夹
        if (stat.isDirectory()) {
            // 是否hidden开头
            if (file.indexOf(".") == 0) {
                return
            }
            // 判断是否为忽略的文件夹
            if (ban.indexOf(file) == -1) {
                // 查询是否有READMD.md
                let index = fs.existsSync(path.join(filePath, "README.md"))
                // 如果有
                if (index) {
                    // 将文件夹名和文件夹路径添加到sidebarnode中
                    sidebarnode.push({
                        text: file + "(README)",
                        link: path.join(filePath, "README.md").replace(basePath, "").replace(".md", ""),
                        items: readfile(filePath),
                        collapsed: false,
                    })
                } else {
                    // 递归读取文件夹
                    sidebarnode.push({
                        text: file,
                        items: readfile(filePath),
                        collapsed: false,
                    })
                }
            }
        } else {
            // 判断是否为忽略的文件
            if (ban.indexOf(file) == -1) {
                // 获取文件后缀
                let extname = path.extname(filePath)
                // 是否为hidden开头
                if (file.indexOf(".") == 0) {
                    return
                }
                // 判断是否为md文件
                if (extname == ".md") {
                    // 获取文件名
                    let filename = path.basename(filePath, extname)
                    // 忽略README.md
                    if (filename == "README") {
                        return
                    }
                    // 将文件名和文件路径添加到sidebar中
                    sidebarnode.push({
                        text: filename,
                        link: filePath.replace(basePath, "").replace(".md", "")
                    })
                }
                // pdf
                if (extname == ".pdf") {
                    // 获取文件名
                    let filename = path.basename(filePath, extname)
                    // 将文件名和文件路径添加到sidebar中
                    sidebarnode.push({
                        text: filename + "(pdf)",
                        link: "http://localhost:5173/" + filePath.replace(basePath, ""),
                    })
                }
            }
        }
    })
    return sidebarnode
}



// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "成贤计协知识库",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            // { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar,
        search: {
            provider: 'local'
        },
        lastUpdated: true,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/SEUCXCS/cxcsknowbase' }
        ]
    }
})
