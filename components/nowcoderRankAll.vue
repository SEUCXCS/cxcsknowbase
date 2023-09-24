<template>
    <!-- YYYY-MM-DD HH:mm:ss -->
    <p>榜单更新时间：{{ data.update }}</p>
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
            <tr v-for="item in data.data" :key="item.id">
                <td>{{ item.rank }}</td>
                <!-- <td></td> -->
                <td>
                    <a :href="`https://ac.nowcoder.com/acm/contest/profile/${item.niukeID}/practice-coding`">{{ item.name
                    }}</a>
                </td>
                <!-- <td>{{ item.user_id }}</td> -->
                <td>{{ item.submit }}</td>
                <td>{{ item.pass }}</td>
                <td>{{ Math.round(item.pass / item.submit * 100)
                }}%</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>

import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import * as nowcoder from '../api/nowcoder.ts'

let data = ref({})
nowcoder.getNowcoderDataGetInfoAll().then(res => {
    data.value = res
    data.value.data.sort((a, b) => {
        return b.pass - a.pass
    })
    data.value.data.forEach((element, index) => {
        element.rank = index + 1
    })
})
</script>
