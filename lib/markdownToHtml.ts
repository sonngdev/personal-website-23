import type { VFileCompatible } from 'vfile'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypePrism from '@mapbox/rehype-prism'
import rehypeStringify from 'rehype-stringify'

export default async function markdownToHtml(markdown: VFileCompatible) {
  const result = await remark()
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown)
  return result.toString()
}
