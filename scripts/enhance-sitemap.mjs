/**
 * 增强 sitemap.xml：添加 lastmod、priority、changefreq
 * 在 vitepress build 之后执行
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sitemapPath = resolve(__dirname, '../dist/sitemap.xml')
let xml = readFileSync(sitemapPath, 'utf-8')

const today = new Date().toISOString().split('T')[0]

// 页面分级规则
const priorityMap = {
  '/': { priority: '1.0', freq: 'weekly' },
  '/what-is-geo': { priority: '0.9', freq: 'monthly' },
  '/services': { priority: '0.9', freq: 'monthly' },
  '/about': { priority: '0.8', freq: 'monthly' },
  '/consult': { priority: '0.8', freq: 'weekly' },
  '/whitepaper': { priority: '0.8', freq: 'monthly' },
  '/knowledge/': { priority: '0.7', freq: 'weekly' },
  '/knowledge/faq': { priority: '0.9', freq: 'weekly' },
  '/knowledge/glossary': { priority: '0.7', freq: 'monthly' },
  '/knowledge/articles/': { priority: '0.7', freq: 'weekly' },
  '/cases/': { priority: '0.7', freq: 'monthly' },
  '/privacy': { priority: '0.4', freq: 'yearly' },
  '/changelog': { priority: '0.5', freq: 'monthly' },
}

function getConfig(url) {
  const path = new URL(url).pathname
  // 案例详情页
  if (path.startsWith('/cases/') && !path.endsWith('/cases/')) {
    return { priority: '0.6', freq: 'monthly' }
  }
  // 文章页
  if (path.startsWith('/knowledge/articles/') && !path.endsWith('/articles/')) {
    return { priority: '0.7', freq: 'monthly' }
  }
  return priorityMap[path] || { priority: '0.5', freq: 'monthly' }
}

// 为每个 <url> 添加 lastmod、changefreq、priority
xml = xml.replace(
  /<url><loc>(https:\/\/geo\.hashcloud\.cn(\/[^<]*)?)<\/loc><\/url>/g,
  (match, loc) => {
    if (loc.endsWith('/404')) return '' // 从 sitemap 中移除 404 页面
    const { priority, freq } = getConfig(loc)
    return `<url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`
  }
)

// 格式化 XML：在 >< 之间插入换行，在 <urlset 开头加换行
xml = xml
  .replace(/><url>/g, '>\n  <url>')
  .replace(/<\/url></g, '</url>\n<')
  .replace(/<\/url><\/urlset>/, '</url>\n</urlset>')

writeFileSync(sitemapPath, xml, 'utf-8')

// 同步到 docs/public/ 目录，确保 dev 模式也能访问 sitemap
const publicSitemapPath = resolve(__dirname, '../docs/public/sitemap.xml')
writeFileSync(publicSitemapPath, xml, 'utf-8')
console.log('✅ Sitemap enhanced with lastmod, priority, changefreq → dist/ + docs/public/')
