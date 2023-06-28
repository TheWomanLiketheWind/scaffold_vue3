<template>登录页面</template>

<script setup>
import { usePersistStore } from '@/stores/personInfo.js'
const storePersist = usePersistStore()
const token = 'setToken123456****'
storePersist.setToken(token)
// 用于vue-router 中使用token
sessionStorage.setItem('token', token)
</script>

<style></style>
