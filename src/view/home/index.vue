<template>
    <div>子级路由 {{ count }}</div>
</template>

<script setup>
import { login } from '@/api/login/index'
import { storeToRefs } from 'pinia'
import { usePersistStore } from '@/stores/personInfo'

// ----------------调用 login 接口演示----------------------
const submit_login = async () => {
    const params = {}
    const res = await login(params)
    console.log('返回值', res)
}

// ----------------pinia 演示-------------------------------
const store = usePersistStore()
// ----------------操作state-------------------
// 只使用 store 的状态而不调用任何 action 时，使用 storeToRefs(), 实现解构
const { count } = storeToRefs(store) // 响应式（第一种）
console.log(store.count) // 直接访问（第二种）
store.$patch((state) => {
    state.count++ // 对 state 进行直接操作 （第三种）
})
// ----------------操作action-------------------
// 作为 action 的 increment 可以直接解构
const { increment } = store
increment()
</script>

<style></style>
