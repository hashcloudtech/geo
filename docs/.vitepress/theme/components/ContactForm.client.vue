<script setup lang="ts">
/**
 * 通用咨询表单组件 — 金数据（jinshuju.net）iframe 嵌入
 * 金数据原生表单嵌入，无 CSRF/跨域问题，100% 可靠
 */
import { ref } from 'vue'

const iframeFailed = ref(false)

function onIframeError() {
  iframeFailed.value = true
}

const props = withDefaults(defineProps<{
  formTitle?: string
  formSubtitle?: string
  /** 金数据表单 iframe 嵌入地址（可携带 URL 参数，如 ?x_field_1=hashcloudgeo） */
  formUrl: string
  /** iframe 高度（px），不同表单字段数量不同，避免滚动条 */
  height?: number
}>(), {
  formTitle: '立即咨询',
  formSubtitle: '',
  height: 800,
})
</script>

<template>
  <div class="geo-form-wrap">
    <div class="geo-form">
      <h3>{{ formTitle }}</h3>
      <p v-if="formSubtitle" class="form-subtitle">{{ formSubtitle }}</p>
      <div class="iframe-container" :style="{ height: height + 'px' }">
        <div v-if="iframeFailed" class="iframe-fallback">
          <p>⚠️ 表单加载失败，请直接联系我们</p>
          <p>📧 邮箱：<a href="mailto:hashcloud@foxmail.com">hashcloud@foxmail.com</a></p>
          <p>📱 电话：<a href="tel:17623262071">17623262071</a></p>
          <p>💬 微信：hash_cloud</p>
        </div>
        <iframe
          v-show="!iframeFailed"
          :src="formUrl"
          frameborder="0"
          scrolling="no"
          allow="fullscreen"
          title="咨询表单"
          @error="onIframeError"
        >加载中...</iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.geo-form-wrap {
  max-width: 640px;
  margin: 32px auto;
}

.geo-form {
  background: var(--vp-c-bg-soft, #f8fafc);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--vp-c-divider, #e2e8f0);
}

.geo-form h3 {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.form-subtitle {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-bottom: 24px;
}

.iframe-container {
  width: 100%;
}

.iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.iframe-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 32px;
  line-height: 2;
}
.iframe-fallback a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}
</style>
