<template>
    <!-- YYYY-MM-DD HH:mm:ss -->
    <p>月初获取数据的时间：{{ update }}</p>
    <p>榜单更新时间：{{ update2 }}</p>
    <table>
        <thead>
            <tr>
                <th>排名</th>
                <th>用户</th>
                <!-- <th>学号</th> -->
                <th>提交数</th>
                <th>已通过</th>
                <th>通过率</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" :key="item.id">
                <td>{{ item.rank }}</td>
                <td>
                    <a :href="`https://ac.nowcoder.com/acm/contest/profile/${item.niukeID}/practice-coding`">{{ item.name
                    }}</a>
                </td>
                <!-- <td>{{ item.user_id }}</td> -->
                <td>{{ item.submit }}</td>
                <td>{{ item.pass }}</td>
                <td>{{ Math.round((item.pass / item.submit || 0) * 100)
                }}%</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup >
import { ref } from 'vue'
// 月初获取数据的时间
let update = ref("")
// 当前获取数据的时间
let update2 = ref("")
let data = ref({})
async function main() {
    // 获取月初的数据
    let res = (await (await fetch('http://cxcs.truraly.fun/api/getInfoMonth')).json()).data
    // 获取当前的数据
    let res2 = (await (await fetch('http://cxcs.truraly.fun/api/getInfoAll')).json()).data
    console.log(res)
    // 获取差值
    res2.data.forEach(element => {
        // 如果月初有这个人，则减去月初的pass数据和submit数据
        let index = res.data.findIndex((item) => {
            return item.user_id == element.user_id
        })
        if (index != -1) {
            element.pass -= res.data[index].pass
            element.submit -= res.data[index].submit
        } else {
            // 如果月初没有这个人，则pass和submit都为0
            element.pass = 0
            element.submit = 0
        }
    })
    // 删除submit为0的人
    res2.data = res2.data.filter((item) => {
        return item.submit != 0
    })
    // 排序
    res2.data.sort((a, b) => {
        return b.pass - a.pass
    })
    // 添加排名
    res2.data.forEach((element, index) => {
        element.rank = index + 1
    });
    data.value = res2.data
    console.log(res2.data)
    let d = new Date(res2.update)
    update2.value = `${d.getFullYear()
        }-${d.getMonth() + 1}-${d.getDate()}
        ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    d = new Date(res.update)
    update.value = `${d.getFullYear()
        }-${d.getMonth() + 1}-${d.getDate()}
        ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}


main()
// interface resdata {
//     data: {
//         id: number,
//         name: string,
//         user_id: string,
//         submit: number,
//         pass: number,
//         rank: number
//     }[],
//     update: string
// }
</script>
