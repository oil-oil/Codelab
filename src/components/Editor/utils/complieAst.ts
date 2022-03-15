import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'
import Renderer from 'markdown-it/lib/renderer'

import hljs from 'highlight.js'

const md: MarkdownIt = new MarkdownIt()

const renderer = new Renderer()

export interface Level2 {
	title: string
	content: Token[] | string
	finish: boolean
}
export interface Level1 {
	title: string
	children: Level2[]
	finish: boolean
}

export type complieData = Level1[]

export default function (ast: Token[]) {
	const data: complieData = []
	ast.forEach((token, index) => {
		if (token.markup === '#' && token.type === 'heading_open') {
			data.push({
				title: ast[index + 1].content,
				children: [],
				finish: false
			})
		} else if (
			token.markup === '##' &&
			token.type === 'heading_open' &&
			data[data.length - 1]
		) {
			const { children } = data[data.length - 1]
			children.push({
				title: ast[index + 1].content,
				content: [token],
				finish: false
			})
		} else if (data.length && data[data.length - 1].children.length) {
			;(
				data[data.length - 1].children[
					data[data.length - 1].children.length - 1
				].content as Token[]
			).push(token)
		}
	})
	data.map((item) =>
		item.children.map((item) => {
			item.content = renderer.render(
				item.content as Token[],
				{
					highlight: (str, lang) => {
						// 当前时间加随机数生成唯一的id标识
						const codeIndex =
							parseInt(`${Date.now()}`) + Math.floor(Math.random() * 10000000)
						// 复制功能主要使用的是 clipboard.js
						let html = `<span class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</span>`
						const linesLength = str.split(/\n/).length - 1
						// 生成行号
						let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
						for (let index = 0; index < linesLength; index++) {
							linesNum += '<span></span>'
						}
						linesNum += '</span>'
						if (lang && hljs.getLanguage(lang)) {
							try {
								// highlight.js 高亮代码
								const preCode = hljs.highlight(lang, str, true).value
								html += preCode
								// 将代码包裹在 textarea 中
								return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
									/<\/textarea>/g,
									'&lt;/textarea>'
								)}</textarea>`
							} catch (error) {
								console.log(error)
							}
						}

						const preCode = md.utils.escapeHtml(str)
						html += preCode
						// 将代码包裹在 textarea 中
						return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
							/<\/textarea>/g,
							'&lt;/textarea>'
						)}</textarea>`
					}
				},
				{}
			)
			return item
		})
	)
	return data
}
