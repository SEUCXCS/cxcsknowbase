<template>
    <!-- YYYY-MM-DD HH:mm:ss -->
    <p>72前获取数据的时间：{{ update }}</p>
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
            <tr v-for="item in data.data">
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
<script setup lang="ts">
import { ref } from 'vue'
import * as nowcoder from '../api/nowcoder'
// 月初获取数据的时间
let update = ref("")
// 当前获取数据的时间
let update2 = ref("")
let data = ref<nowcoder.nowcoderData>({
    update: "",
    data: []
})
async function main() {
    let res = await nowcoder.getNowcoderDataGetInfo72()
    update.value = res.update
    let res2 = await nowcoder.getNowcoderDataGetInfoAll()
    update2.value = res2.update
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
    data.value = res2
    console.log(res2.data)
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
