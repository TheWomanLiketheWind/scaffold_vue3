<template>
    <div>退出登录</div>
</template>

<script>
import { usePersistStore } from '@/stores/personInfo.js'
const storePersist = usePersistStore()
storePersist.setToken('')
// 用于vue-router 中使用token
sessionStorage.clear()
</script>

<style></style>
