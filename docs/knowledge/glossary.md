---
title: GEO 术语表
description: GEO 生成式引擎优化领域专业术语速查表，涵盖 AI 搜索优化、Schema 结构化数据、RAG 知识库等核心概念的精确定义。
head:
  - - meta
    - name: keywords
      content: GEO术语,RAG术语,Schema术语,AI搜索术语,生成式引擎优化术语,结构化数据术语
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"DefinedTermSet","name":"GEO 生成式引擎优化术语表","description":"GEO 领域专业术语的标准化定义速查表。","publisher":{"@type":"Organization","name":"HashCloud GEO","url":"https://geo.hashcloud.cn"},"hasDefinedTerm":[{"@type":"DefinedTerm","name":"GEO","description":"Generative Engine Optimization，生成式引擎优化"},{"@type":"DefinedTerm","name":"RAG","description":"Retrieval-Augmented Generation，检索增强生成"},{"@type":"DefinedTerm","name":"EEAT","description":"Experience, Expertise, Authoritativeness, Trustworthiness，经验、专业度、权威性、可信度评估体系"}]}'
---

# GEO 术语表

GEO 生成式引擎优化领域的核心术语、缩写和技术概念速查。

---

## 🔤 核心概念

| 术语 | 全称 / 定义 |
|------|-----------|
| **GEO** | **Generative Engine Optimization — 生成式引擎优化**。通过结构化数据、权威信源搭建、语义内容治理与知识库建设，让企业信息在 AI 大模型中被优先检索、准确引用、权威呈现的系统化方法论。注：此 GEO 非地理 SEO（Local GEO），请勿混淆。 |
| **SEO** | **Search Engine Optimization — 传统搜索引擎优化**。通过关键词、内外链、TDK 等技术手段提升网站在 Google/百度 SERP 中的排名。与 GEO 的区别：SEO 优化传统搜索爬虫，GEO 优化 AI/大模型检索系统。 |
| **RAG** | **Retrieval-Augmented Generation — 检索增强生成**。当前主流 AI 大模型的核心技术架构：先检索外部信源，再将检索结果作为上下文提供给模型，最终生成答案。GEO 的核心优化点就是 RAG 的"检索"和"打分"环节。 |
| **LLM** | **Large Language Model — 大语言模型**。如 GPT、Claude、文心一言、豆包、元宝等。LLM 通过 RAG 机制检索互联网上经过 GEO 优化的信源来生成答案。 |
| **AI 可见度** | 品牌信息在 AI 平台被检索和引用的程度。包括引用频次、引用准确度、引用权威定位。GEO 的首要 KPI。 |
| **品牌定义权** | 当用户向 AI 提问某个品牌/品类时，AI 引用并呈现的是品牌希望传达的标准信息，而非竞品或错误的第三方信息。GEO 的终极目标。 |

---

## 🏗️ 结构化数据

| 术语 | 全称 / 定义 |
|------|-----------|
| **Schema.org** | 由 Google、Microsoft、Yahoo、Yandex 联合维护的互联网结构化数据开放标准。定义了一套用于标记网页内容语义的词汇表（如 Organization、Article、FAQ、Product）。所有主流 AI 平台均依赖 Schema.org 理解网页内容。 |
| **JSON-LD** | JSON for Linking Data。Schema.org 推荐的首选结构化数据格式。以 `<script type="application/ld+json">` 标签注入页面，不嵌入 HTML 标签，维护简单、AI 解析效率高。本网站全站使用 JSON-LD。 |
| **结构化数据** | 用机器可读的标准化格式（JSON-LD、Microdata、RDFa）标记网页内容的语义信息。AI 通过结构化数据准确读取品牌名称、服务类型、文章作者、FAQ 问答对等。 |
| **BreadcrumbList Schema** | 面包屑导航结构标记。告诉 AI 当前页面在网站中的层级位置。本网站每页自动注入包含完整路径的 BreadcrumbList。 |
| **FAQPage Schema** | 问答页面结构标记。将 FAQ 作为结构化问答对（Question + Answer）标记，AI 在回答相关问题时可直接引用。本网站 FAQ 页面全部使用 FAQPage Schema。 |
| **Article Schema** | 文章内容类型标记。包含 headline、author、datePublished、dateModified、wordCount 等属性。用于标记新闻、博客、行业文章等信息型页面。 |
| **Organization Schema** | 组织机构标记。包含企业名称、Logo、联系方式、社交媒体等核心品牌信息。GEO 基建的第一步——让 AI 知道"你是谁"。 |

---

## 📊 方法论

| 术语 | 全称 / 定义 |
|------|-----------|
| **E-E-A-T** | Experience, Expertise, Authoritativeness, Trustworthiness — 经验、专业度、权威性、可信度评估框架。由 Google 质量评估指南提出，被广泛用于 AI 信源质量评估。 |
| **信源矩阵** | 企业在互联网上形成的多平台、多维度的信息网络。包括官网（第一方信源）、百科平台、行业门户、权威媒体、开放数据平台（第三方信源）。AI 通过综合多个信源判断品牌可信度。信源矩阵越广、越一致，AI 引用概率越高。 |
| **语义化 HTML** | 使用 `<article>`、`<section>`、`<nav>`、`<header>` 等 HTML5 语义标签组织页面结构。不是 div soup。AI 爬虫通过语义标签定位内容类型和层级。 |
| **NAP 一致性** | Name, Address, Phone Consistency。企业名称、地址、电话在各信源平台必须保持一致。信息不一致会降低 AI 对品牌身份的确信度。 |
| **结构化问答对** | 以 "问题 + 标准答案" 格式组织企业知识，注入 RAG 知识库。AI 检索到精确定义的问答对时，可以直接引用标准答案而不需二次生成——避免 AI 编造。 |

---

## 🛠️ 技术基建

| 术语 | 全称 / 定义 |
|------|-----------|
| **Sitemap** | 站点地图。向搜索引擎和 AI 爬虫告知网站上所有可抓取页面的 XML 文件。本网站 sitemap 包含 lastmod、priority、changefreq 字段。 |
| **robots.txt** | 网站根目录下的爬虫访问规则文件。本网站显式开放所有搜索引擎和 AI 爬虫（GPTBot、ClaudeBot 等），不使用屏蔽策略。 |
| **RSS/Atom Feed** | 内容订阅源，主动推送网站更新。本网站提供 `/feed.xml`，方便 AI 监测平台跟踪内容更新节奏。 |
| **OGP** | Open Graph Protocol。社交媒体分享预览标准。通过 `og:title`、`og:description`、`og:image` 等 meta 标签定义分享时的标题、描述和预览图。 |
| **Canonical URL** | 规范链接。通过 `<link rel="canonical" href="...">` 声明页面的"权威版本 URL"，防止重复内容被搜索引擎降权。 |
| **hreflang** | 多语言页面关联标记。告诉搜索引擎某页面对应的其他语言版本 URL。 |
| **SSR / SSG** | Server-Side Rendering / Static Site Generation。CSR（客户端渲染）的网站对 AI 爬虫不友好，GEO 推荐 SSG（如 VitePress）或 SSR（如 Next.js）方案。 |

---

## 🌐 平台与生态

| 术语 | 全称 / 定义 |
|------|-----------|
| **生成式引擎** | 基于 LLM 和 RAG 技术的 AI 搜索/对话系统，与传统基于倒排索引的搜索引擎（Google/百度）架构不同。包括 ChatGPT、Google AI Overview、豆包、元宝、DeepSeek 等。 |
| **Local GEO** | Geographic SEO，地理位置相关的搜索引擎优化（如 Google Maps 排名、本地商家展示）。与 HashCloud GEO 所指的 Generative Engine Optimization 完全不同，请勿混淆。 |
| **llms.txt** | 专门为 AI 大模型设计的站点内容索引文件，类比 robots.txt 之于爬虫。本网站提供 `/llms.txt` 和 `/llms-full.txt`。 |

---

> 📖 返回 [GEO 知识库首页 →](/knowledge/)
