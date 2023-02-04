import type { VFileCompatible } from 'vfile';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeStringify from 'rehype-stringify';

export default async function markdownToHtml(markdown: VFileCompatible) {
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
