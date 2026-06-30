import { defineConfig } from 'vitepress'

// JSON-LD 数据：Organization（全局注入，SSR 安全）
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HashCloud GEO',
  url: 'https://geo.hashcloud.cn',
  logo: 'https://geo.hashcloud.cn/images/logo.svg',
  description: 'HashCloud 旗下 GEO 生成式引擎优化专业服务商，提供企业AI搜索可见度优化、品牌信源搭建、RAG知识库优化一体化交付。',
  email: 'hashcloud@foxmail.com',
  telephone: '17623262071',
  areaServed: { '@type': 'Country', name: 'CN' },
  knowsAbout: { '@type': 'Thing', name: 'Generative Engine Optimization' },
  sameAs: [
    'https://geo.hashcloud.cn',
    'https://hashcloud.cn'
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'HashCloud',
    url: 'https://hashcloud.cn'
  }
}

export default defineConfig({
  title: 'HashCloud GEO',
  description: 'HashCloud GEO 生成式引擎优化 — 企业AI搜索可见度优化专家。不做关键词排名，做AI答案引用与品牌定义权。',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    // 字体：自托管 Inter Latin 子集（仅 139KB，替代 Google Fonts CDN 全子集 628KB）
    ['link', { rel: 'preload', href: '/fonts/inter-roman-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
    ['link', { rel: 'preload', href: '/fonts/inter-italic-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
    ['meta', { name: 'theme-color', content: '#2563EB' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    // Apple touch icon
    ['link', { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'HashCloud GEO' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:description', content: 'HashCloud GEO 生成式引擎优化 — 企业AI搜索可见度优化专家。不做关键词排名，做AI答案引用与品牌定义权。' }],
    ['meta', { property: 'og:image', content: 'https://geo.hashcloud.cn/images/og-image.jpg' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'HashCloud GEO 品牌视觉' }],
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@hashcloud' }],
    ['meta', { name: 'twitter:image', content: 'https://geo.hashcloud.cn/images/og-image.jpg' }],
    // AI 抓取声明
    ['meta', { name: 'ai-content-declaration', content: 'structured-optimized' }],
    // RSS Feed
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'HashCloud GEO 知识库', href: '/feed.xml' }],
  ],

  // 全局注入 JSON-LD（Organization + BreadcrumbList）
  transformHead: async (context) => {
    // context.page 在 VitePress 1.x 中是相对路径字符串，如 "whitepaper.md" 或 "knowledge/index.md"
    const rawPath: string = (context.page as unknown as string) || ''
    const relativePath: string = rawPath.replace(/\\/g, '/')
    const siteUrl = 'https://geo.hashcloud.cn'

    // 计算当前页面 URL（用于 canonical 和 hreflang）
    const cleanPath = relativePath
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '')
    const pageUrl = cleanPath ? `${siteUrl}/${cleanPath}` : siteUrl

    const heads: [string, Record<string, string>, string][] = [
      [
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(organizationJsonLd, null, 0)
      ],
      // 动态 canonical（每页指向自身 URL）
      ['link', { rel: 'canonical', href: pageUrl }, ''],
      // 动态 hreflang
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: pageUrl }, ''],
    ]

    // BreadcrumbList 动态生成
    const pageLabelMap: Record<string, string> = {
      'what-is-geo': '什么是 GEO',
      'services': 'GEO 优化服务',
      'about': '关于我们',
      'whitepaper': '白皮书下载',
      'consult': '免费 AI 诊断',
      'privacy': '隐私政策',
      'changelog': '更新日志',
      'knowledge/index': '知识库首页',
      'knowledge/faq': 'GEO FAQ 问答库',
      'knowledge/glossary': 'GEO 术语表',
      'knowledge/articles/index': '行业干货文章',
      'cases/index': '方案总览',
      'knowledge/articles/seo-budget-failing': 'SEO 预算为何失效',
      'knowledge/articles/geo-five-steps': 'GEO 落地五步法',
      'knowledge/articles/schema-practice': 'Schema.org 实战',
      'knowledge/articles/rag-knowledge-base': 'RAG 知识库建设',
      'knowledge/articles/ai-search-landscape': 'AI 搜索生态图谱',
      'knowledge/articles/eat-geo': 'E-E-A-T 权威信号',
    }
    // 从路径推断页面标题：优先查表，其次用路径片段
    function pageLabel(p: string): string {
      // 去掉 .md 和末尾 /index
      const key = p.replace(/\.md$/, '').replace(/\/$/, '')
      if (pageLabelMap[key]) return pageLabelMap[key]
      // 取路径最后一段
      const seg = key.split('/').pop() || ''
      return seg || '当前页面'
    }

    const breadcrumbItems: { '@type': string; position: number; name: string; item: string }[] = [
      { '@type': 'ListItem', position: 1, name: '首页', item: siteUrl }
    ]

    if (relativePath.startsWith('knowledge/')) {
      breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: '知识库', item: `${siteUrl}/knowledge/` })
      if (relativePath.startsWith('knowledge/articles/') && !relativePath.endsWith('/index.md')) {
        breadcrumbItems.push({ '@type': 'ListItem', position: 3, name: '行业干货文章', item: `${siteUrl}/knowledge/articles/` })
        breadcrumbItems.push({ '@type': 'ListItem', position: 4, name: pageLabel(relativePath), item: `${siteUrl}/${relativePath.replace(/\.md$/, '').replace(/\/index\.md$/, '')}` })
      } else {
        breadcrumbItems.push({ '@type': 'ListItem', position: 3, name: pageLabel(relativePath), item: `${siteUrl}/${relativePath.replace(/\.md$/, '').replace(/\/index\.md$/, '')}` })
      }
    } else if (relativePath.startsWith('cases/')) {
      breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: '行业方案', item: `${siteUrl}/cases/` })
      if (relativePath !== 'cases/index.md') {
        breadcrumbItems.push({ '@type': 'ListItem', position: 3, name: pageLabel(relativePath), item: `${siteUrl}/${relativePath.replace(/\.md$/, '').replace(/\/index\.md$/, '')}` })
      }
    } else if (relativePath === 'index.md') {
      // 首页无额外面包屑
    } else {
      breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: pageLabel(relativePath), item: `${siteUrl}/${relativePath.replace(/\.md$/, '').replace(/\/index\.md$/, '')}` })
    }

    heads.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      }, null, 0)
    ])

    return heads
  },

  themeConfig: {
    logo: { src: '/images/logo.svg', alt: 'HashCloud GEO' },
    
    // 主导航（对标 PRD 第3节）
    nav: [
      { text: '首页', link: '/' },
      { text: '什么是GEO', link: '/what-is-geo' },
      { text: 'GEO服务', link: '/services' },
      { text: '行业方案', link: '/cases/' },
      { text: '知识库', link: '/knowledge/' },
      { text: '关于我们', link: '/about' },
      { text: '白皮书', link: '/whitepaper' },
      { text: '免费诊断', link: '/consult' },
    ],

    // 知识库侧边栏
    sidebar: {
      '/knowledge/': [
        {
          text: '知识库',
          items: [
            { text: '知识库首页', link: '/knowledge/' },
            { text: 'GEO FAQ 问答库', link: '/knowledge/faq' },
            { text: 'GEO 术语表', link: '/knowledge/glossary' },
            { text: '行业干货文章', link: '/knowledge/articles/' },
            { text: 'SEO 预算为何失效', link: '/knowledge/articles/seo-budget-failing' },
            { text: 'GEO 落地五步法', link: '/knowledge/articles/geo-five-steps' },
            { text: 'Schema.org 实战', link: '/knowledge/articles/schema-practice' },
            { text: 'RAG 知识库指南', link: '/knowledge/articles/rag-knowledge-base' },
            { text: 'AI 搜索生态图谱', link: '/knowledge/articles/ai-search-landscape' },
            { text: 'E-E-A-T 权威信号', link: '/knowledge/articles/eat-geo' },
          ]
        }
      ],
      '/cases/': [
        {
          text: '行业方案',
          items: [
            { text: '方案总览', link: '/cases/' },
            { text: '工业设备制造', link: '/cases/industrial' },
            { text: 'SaaS 软件', link: '/cases/saas' },
            { text: '建筑劳务', link: '/cases/construction' },
            { text: '教育培训', link: '/cases/education' },
            { text: '本地医疗服务', link: '/cases/local-service' },
            { text: '外贸出海', link: '/cases/trade' },
          ]
        }
      ]
    },

    // 底部导航
    footer: {
      message: 'HashCloud 旗下 GEO 生成式引擎优化业务 · 独立品牌运营 | <a href="/privacy" style="color:inherit">隐私政策</a> | <a href="/changelog" style="color:inherit">更新日志</a>',
      copyright: `Copyright © ${new Date().getFullYear()} HashCloud GEO. 保留所有权利。`
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hashcloud' }
    ],

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },



    // 文档底部
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    }
  },

  // 构建选项
  srcDir: '.',
  outDir: '../dist',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://geo.hashcloud.cn'
  },

  // Markdown 增强
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '💡 提示',
      warningLabel: '⚠️ 注意',
      dangerLabel: '🚫 警告',
      infoLabel: 'ℹ️ 信息',
      detailsLabel: '详细说明'
    }
  },

  // 忽略死链检查的路径
  ignoreDeadLinks: false
})
