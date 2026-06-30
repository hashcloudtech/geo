<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showQR = ref(false)
const showBackTop = ref(false)

const phoneNumber = '17623262071'
const wechatId = 'hash_cloud'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleScroll() {
  showBackTop.value = window.scrollY > 400
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div class="contact-float">
    <!-- 悬浮咨询按钮组 -->
    <div class="float-group">
      <!-- 电话 -->
      <a :href="'tel:' + phoneNumber" class="float-btn phone" title="电话咨询" aria-label="电话咨询">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
      
      <!-- 微信 -->
      <div class="float-btn wechat" title="微信咨询" aria-label="微信咨询" @click="showQR = !showQR">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </div>

      <!-- 免费诊断 -->
      <a href="/consult" class="float-btn diagnose" title="免费AI诊断" aria-label="免费AI诊断">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </a>

      <!-- 回到顶部 -->
      <Transition name="qr-fade">
        <button v-if="showBackTop" class="float-btn back-top" title="回到顶部" @click="scrollToTop" aria-label="回到顶部">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </Transition>
    </div>

    <!-- 微信二维码弹出 -->
    <Transition name="qr-fade">
      <div v-if="showQR" class="qr-popup">
        <div class="qr-content">
          <p class="qr-title">微信扫码咨询</p>
          <div class="qr-placeholder">
            <img
              src="/images/hash_cloud.webp"
              :alt="'微信二维码: ' + wechatId"
              width="150"
              height="150"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p class="qr-id">微信号：{{ wechatId }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.contact-float {
  position: fixed;
  right: 24px;
  bottom: 120px;
  z-index: 1000;
}

.float-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.float-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
  color: #fff;
  text-decoration: none;
}

.float-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.float-btn.phone { background: #2563EB; }
.float-btn.wechat { background: #07C160; }
.float-btn.diagnose { background: #F59E0B; }
.float-btn.back-top { background: #64748b; }

.qr-popup {
  position: absolute;
  right: 64px;
  bottom: 0;
  background: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 160px;
}

.qr-content { text-align: center; }

.qr-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.qr-placeholder {
  width: 150px;
  height: 150px;
  margin: 0 auto 8px;
}

.qr-placeholder img {
  display: block;
}

.qr-id {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.qr-fade-enter-active,
.qr-fade-leave-active {
  transition: all 0.2s ease;
}
.qr-fade-enter-from,
.qr-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

@media (max-width: 640px) {
  .contact-float { right: 16px; bottom: 100px; }
  .float-btn { width: 44px; height: 44px; }
}
</style>
