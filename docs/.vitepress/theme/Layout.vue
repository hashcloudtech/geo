<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import ContactFloat from './components/ContactFloat.vue'

const { Layout: DefaultLayout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <div class="geo-site">
    <DefaultLayout />
    <!-- 全站悬浮咨询按钮（PRD 5.4） -->
    <ContactFloat />
  </div>
</template>
