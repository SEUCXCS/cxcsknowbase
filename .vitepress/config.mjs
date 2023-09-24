import { defineConfig } from 'vitepress'
import mdTaskLists from 'markdown-it-task-lists'


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
    ".git",
    "img",
    "public",
    "components"
]

const basePath = path.join(__dirname, "../")

const sidebar = [
    {
        text: "关于本知识库",
        link: "/README"
    },
    ...readfile(path.join(__dirname, "../docs"))
]



/**
 * 读取文件夹以及文件
 * @param {string} dir 
 */
function readfile(dir) {
    let sidebarnode = []
    // 获取文件夹下的所有文件以及文件夹
    let files = fs.readdirSync(dir)
    // 排序
    files.sort((a, b) => {
        // 数字开头优先
        if (/^\d+/.test(a) && !/^\d+/.test(b)) {
            return -1
        }
        else if (!/^\d+/.test(a) && /^\d+/.test(b)) {
            return 1
        }
        else if (/^\d+/.test(a) && /^\d+/.test(b)) {
            // 数字开头的按数字排序
            return parseInt(a) - parseInt(b)
        }
        else {
            // 其他按字母排序
            return a.localeCompare(b)
        }
    })
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

                let obj = {
                    text: file,
                    items: readfile(filePath),
                    collapsed: false,
                }
                // 如果以-结尾,则折叠
                if (/\-$/.test(file)) {
                    // console.log(file)
                    obj.collapsed = true
                    obj.text = obj.text.replace(/\-$/, "")
                }
                // 如果有
                if (index) {
                    // 将文件夹名和文件夹路径添加到sidebarnode中
                    obj.link = path.join(filePath, "README.md").replace(basePath, "").replace(".md", "")
                    obj.text += "(README)"
                } else if (obj.items.length == 0) {
                    return
                }
                // 如果以\d+\.开头,则去掉\d+\.
                if (/^\d+\./.test(file)) {
                    obj.text = obj.text.replace(/^\d+\./, "")
                }
                // 递归读取文件夹
                sidebarnode.push(obj)
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
                    // 如果以\d+\.开头,则去掉\d+\.
                    if (/^\d+\./.test(filename)) {
                        filename = filename.replace(/^\d+\./, "")
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
        ],
        
    },
    ignoreDeadLinks: true,
    markdown: {
        config: (md) => {
            // md.use(mdFootnote)
            md.use(mdTaskLists)
        }
    },
})
