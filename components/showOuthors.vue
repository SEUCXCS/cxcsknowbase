<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme



/**
 * 将时间字符串转为YYYY/M/D HH/mm格式
 * @param {*} date 
 */
function formatDate(date) {
    if (!date) return '未知'
    console.log("date", date)
    const d = new Date(date)
    // -8时区
    d.setSeconds(d.getSeconds() - 8 * 60 * 60)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    return `${year}/${num2str(month)}/${num2str(day)} ${num2str(hour)}:${num2str(minute)}`
}

// num to str
function num2str(num) {
    return num < 10 ? '0' + num : num
}

// get outhers
function getOuthers(outher) {
    if (!outher) return '未知'
    else if (typeof outher == 'string') return outher
    else if (Array.isArray(outher)) return outher.join('、')
    else return '未知'
}

</script>

<template>
    <Layout>
        <!-- 在底部添加网站说明 -->
        <template #doc-bottom>
            <p> Copyright © 2022
                <a href="/">
                    <!-- 田园幻想乡 -->
                    成贤计协知识库
                </a>
                <a href="https://beian.miit.gov.cn/">
                    浙ICP备2021038778号-1
                </a>
            </p>
        </template>
        <!-- 在文章结尾添加第一次上传时间 -->
        <template #doc-footer-before>
            <p>贡献者：
                {{ getOuthers($frontmatter.outhor) }}
            </p>
            <p>
                发布时间:
                <!-- YYYY/M/D HH/mm -->
                <time>{{ formatDate($frontmatter.date) }}</time>
            </p>
            <!-- 最后修改时间 -->
        </template>
    </Layout>
</template>

<style scoped>
p {
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
}
</style>