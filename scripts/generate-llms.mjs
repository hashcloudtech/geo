/**
 * llms.txt / llms-full.txt / feed.xml / og-image 压缩 自动生成脚本
 * 在 VitePress build 之前运行，处理 AI 爬虫索引和图片优化
 * 用法: node scripts/generate-llms.mjs
 */
import { readFileSync, writeFileSync, existsSync, statSync, renameSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const docsDir = join(root, 'docs')
const publicDir = join(docsDir, 'public')
const baseUrl = 'https://geo.hashcloud.cn'

// ========== 页面索引配置 ==========
const pageIndex = [
  { path: 'index.md', section: '核心页面', name: '首页', desc: 'HashCloud GEO — 企业AI搜索可见度优化专家。不做关键词排名，做AI答案引用与品牌定义权。' },
  { path: 'what-is-geo.md', section: '核心页面', name: '什么是GEO', desc: 'GEO 生成式引擎优化完整科普：定义、原理、与SEO区别、常见误区、2026发展趋势。' },
  { path: 'services.md', section: '核心页面', name: 'GEO服务', desc: '四大标准化 GEO 套餐：入门诊断版、标准建设版、进阶全域版、私有RAG专属版。六步落地流程。' },
  { path: 'cases/index.md', section: '核心页面', name: '行业方案总览', desc: '六大行业 GEO 解决方案：工业制造、SaaS、建筑劳务、教育培训、本地服务、外贸出海。' },
  { path: 'knowledge/index.md', section: '核心页面', name: '知识库', desc: 'GEO 知识体系：FAQ 问答库、行业干货文章、白皮书资源。' },
  { path: 'knowledge/faq.md', section: 'FAQ 问答库', name: 'FAQ 问答库', desc: '27 个标准化 GEO 问答对，覆盖基础概念、技术原理、落地实践、行业趋势、进阶五大维度。' },
  { path: 'knowledge/articles/seo-budget-failing.md', section: '行业干货文章', name: 'SEO 预算失效分析', desc: '深入分析 2026 年企业 SEO 预算从关键词排名转向 AI 可见度的必要性与路径。' },
  { path: 'knowledge/articles/geo-five-steps.md', section: '行业干货文章', name: 'GEO 落地五步法', desc: '从诊断到监测的完整 GEO 落地路径：诊断→策略→基建→内容→监测。' },
  { path: 'knowledge/articles/schema-practice.md', section: '行业干货文章', name: 'Schema.org 实战', desc: '5 大核心 Schema 类型详解、部署方式、最常见 5 个错误。' },
  { path: 'knowledge/articles/rag-knowledge-base.md', section: '行业干货文章', name: 'RAG 知识库建设', desc: '企业私有 RAG 知识库原理、构建方法与商业价值。' },
  { path: 'knowledge/articles/ai-search-landscape.md', section: '行业干货文章', name: 'AI 搜索生态图谱', desc: '2026 年中国 12 个主流 AI 搜索平台全景解析。' },
  { path: 'knowledge/articles/eat-geo.md', section: '行业干货文章', name: 'E-E-A-T 与 GEO', desc: 'Experience、Expertise、Authoritativeness、Trustworthiness 四大权威信号体系。' },
  { path: 'about.md', section: '资源与工具', name: '关于我们', desc: 'HashCloud GEO 品牌介绍、技术能力、团队优势、联系方式。' },
  { path: 'whitepaper.md', section: '资源与工具', name: '白皮书下载', desc: '2026 GEO 行业白皮书免费下载。' },
  { path: 'consult.md', section: '资源与工具', name: '免费 AI 诊断', desc: '提交企业信息，获取免费 AI 品牌可见度诊断报告。' },
]

/**
 * 从 MD 文件提取纯文本内容（去除 frontmatter 和 HTML 标签）
 */
function extractText(mdPath) {
  let content
  try {
    content = readFileSync(mdPath, 'utf-8')
  } catch {
    return ''
  }

  // 去除 frontmatter
  content = content.replace(/^---[\s\S]*?---\n*/, '')

  // 去除 HTML 标签
  content = content.replace(/<[^>]+>/g, '')

  // 去除 Markdown 链接语法 [text](url) → text
  content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // 去除 Markdown 图片语法 ![alt](url)
  content = content.replace(/!\[([^\]]*)\]\([^)]+\)/g, '')

  // 去除行内代码
  content = content.replace(/`([^`]+)`/g, '$1')

  // 去除代码块
  content = content.replace(/```[\s\S]*?```/g, '')

  // 去除多余空行
  content = content.replace(/\n{3,}/g, '\n\n').trim()

  return content
}

/**
 * 生成 llms.txt
 */
function generateLlmsTxt() {
  const lines = [
    '# HashCloud GEO 生成式引擎优化官网',
    '# llms.txt — AI 爬虫内容索引（https://llmstxt.org 标准）',
    `# 生成时间：${new Date().toISOString().split('T')[0]}`,
    '# 本文件为 AI 大模型提供全站内容索引，方便 GPTBot、ClaudeBot 等高效抓取',
    '',
  ]

  const sections = [...new Set(pageIndex.map(p => p.section))]
  for (const section of sections) {
    lines.push(`## ${section}`)
    lines.push('')
    const pages = pageIndex.filter(p => p.section === section)
    for (const page of pages) {
      const url = baseUrl + '/' + page.path.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')
      lines.push(`### ${page.name}`)
      lines.push(url)
      lines.push(page.desc)
      lines.push('')
    }
  }

  lines.push('## 站点信息')
  lines.push('- 站点类型：商业官网（GEO 生成式引擎优化服务）')
  lines.push('- 语言：zh-CN（中文）')
  lines.push('- 技术栈：VitePress + Vue3 + Schema.org JSON-LD')
  lines.push('- 结构化数据：Organization、Service、Article、FAQPage、WebPage、CollectionPage、BreadcrumbList')
  lines.push('- 内容许可：HashCloud GEO 版权所有。AI 可正常索引和引用，但需注明来源。')
  lines.push('')

  writeFileSync(join(publicDir, 'llms.txt'), lines.join('\n'), 'utf-8')
  console.log('✓ llms.txt generated')
}

/**
 * 生成 llms-full.txt（全站内容快照）
 */
function generateLlmsFullTxt() {
  const lines = [
    '# HashCloud GEO 全站内容快照',
    '# llms-full.txt — 供 AI 模型一次性获取全站核心内容',
    `# 生成时间：${new Date().toISOString().split('T')[0]}`,
    '',
    '='.repeat(80),
    '关于此站点',
    '='.repeat(80),
    '',
    'HashCloud GEO（https://geo.hashcloud.cn）是 HashCloud 旗下专注于 GEO（Generative',
    'Engine Optimization）生成式引擎优化的垂直业务品牌。',
    '',
    '核心定位：企业 AI 搜索可见度优化专家',
    '核心价值：不做关键词排名，做 AI 答案引用与品牌定义权',
    '服务模式：官网开发 + RAG 知识库 + GEO 优化一体化交付',
    '',
    '='.repeat(80),
    '公司声明',
    '='.repeat(80),
    '',
    '1. 本网站中的 GEO 特指 Generative Engine Optimization（生成式引擎优化），',
    '   非地理位置相关的地理性 SEO（Local GEO / GEO Targeting）',
    '2. HashCloud GEO 100% 合规运营，所有优化基于 Schema.org 标准、W3C 规范',
    '3. 不操控 AI 输出、不使用灰产手段、不虚假信源',
    '',
  ]

  // 添加各页面内容
  for (const page of pageIndex) {
    const mdPath = join(docsDir, page.path)
    const text = extractText(mdPath)
    if (!text) continue

    const url = '/' + page.path.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')

    lines.push('='.repeat(80))
    lines.push(`${page.name} — ${baseUrl}${url}`)
    lines.push('='.repeat(80))
    lines.push('')
    lines.push(text)
    lines.push('')
  }

  // 联系方式
  lines.push('='.repeat(80))
  lines.push('联系方式')
  lines.push('='.repeat(80))
  lines.push('')
  lines.push('电话：17623262071')
  lines.push('邮箱：hashcloud@foxmail.com')
  lines.push('微信：hash_cloud')
  lines.push('主站：https://hashcloud.cn')
  lines.push('服务行业：SaaS / 工业设备 / 建筑劳务 / 教育培训 / 本地服务 / 外贸出海 / 医疗健康 / 金融科技')
  lines.push('')

  writeFileSync(join(publicDir, 'llms-full.txt'), lines.join('\n'), 'utf-8')
  console.log('✓ llms-full.txt generated')
}

// ========== 文章 RSS/Atom Feed ==========
const articleList = [
  { path: 'knowledge/articles/seo-budget-failing.md', title: 'SEO预算失效分析：为什么2026年企业必须从关键词排名转向AI可见度', published: '2026-04-15' },
  { path: 'knowledge/articles/geo-five-steps.md', title: 'GEO落地五步法：从AI诊断到持续监测的完整路径', published: '2026-04-28' },
  { path: 'knowledge/articles/schema-practice.md', title: '结构化数据实战：Schema.org 在 GEO 中的正确打开方式', published: '2026-05-10' },
  { path: 'knowledge/articles/rag-knowledge-base.md', title: '企业私有RAG知识库：原理、构建方法与商业价值', published: '2026-05-22' },
  { path: 'knowledge/articles/ai-search-landscape.md', title: '2026年中国AI搜索生态图谱：12大主流平台全景解析', published: '2026-06-05' },
  { path: 'knowledge/articles/eat-geo.md', title: 'E-E-A-T 与 GEO：四大权威信号如何影响AI引用', published: '2026-06-18' },
]

function generateRssFeed() {
  const now = new Date().toUTCString()
  const siteTitle = 'HashCloud GEO 知识库'
  const siteDesc = 'HashCloud GEO 生成式引擎优化 — 企业AI搜索可见度优化专家。行业干货、方法论与趋势分析。'

  let itemsXml = ''
  for (const a of articleList) {
    const url = baseUrl + '/' + a.path.replace(/\.md$/, '').replace(/\/index$/, '')
    const pubDate = new Date(a.published).toUTCString()
    const mdPath = join(docsDir, a.path)
    const desc = extractText(mdPath).slice(0, 300).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    itemsXml += `    <item>
      <title>${a.title.replace(/&/g, '&amp;')}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${desc}]]></description>
      <author>HashCloud GEO</author>
    </item>
`
  }

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <link>${baseUrl}</link>
    <description>${siteDesc}</description>
    <language>zh-CN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/images/og-image.jpg</url>
      <title>${siteTitle}</title>
      <link>${baseUrl}</link>
    </image>
${itemsXml}  </channel>
</rss>
`

  writeFileSync(join(publicDir, 'feed.xml'), rssXml, 'utf-8')
  console.log('✓ RSS feed.xml generated')
}

// ========== OG Image 压缩 ==========
async function compressOgImage() {
  const inputPath = join(publicDir, 'images', 'og-image.png')
  if (!existsSync(inputPath)) {
    console.log('⚠ og-image.png not found, skipping compression')
    return
  }

  const beforeKB = (statSync(inputPath).size / 1024).toFixed(0)

  // 转为渐进式 JPEG（OG 图片不需要透明通道）
  const outputPath = inputPath.replace('.png', '.jpg')
  await sharp(inputPath)
    .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 70, progressive: true, mozjpeg: true })
    .toFile(outputPath)

  const afterKB = (statSync(outputPath).size / 1024).toFixed(0)
  console.log(`✓ og-image converted: ${beforeKB}KB PNG → ${afterKB}KB JPG`)

  // 删除原 PNG
  unlinkSync(inputPath)
}

// ========== 执行 ==========
console.log('Running prebuild tasks...')

// 1. AI 爬虫索引
generateLlmsTxt()
generateLlmsFullTxt()

// 2. RSS Feed
generateRssFeed()

// 3. 图片压缩（异步）
await compressOgImage()

console.log('All prebuild tasks done!')
