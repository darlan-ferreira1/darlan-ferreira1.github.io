import { Fragment } from 'react'
import type { ContentBlock, ContentSection, Screenshot } from '../data/projects'
import type { Language } from '../i18n/translations'

export function Figure({ image, language }: { image: Screenshot; language: Language }) {
  return <figure className="screenshot"><img src={image.src} alt={image.alt[language]} loading="lazy" /><figcaption>{image.alt[language]}</figcaption></figure>
}

function Inline({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part)}</>
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'p': return <p><Inline text={block.text} /></p>
    case 'h3': return <h3>{block.text}</h3>
    case 'list': return <ul className="feature-list">{block.items.map(item => <li key={item}><Inline text={item} /></li>)}</ul>
    case 'code': return <pre><code>{block.code}</code></pre>
    case 'table': return <div className="table-wrap"><table><thead><tr>{block.head.map(cell => <th key={cell} scope="col">{cell}</th>)}</tr></thead><tbody>{block.rows.map(row => <tr key={row.join('|')}>{row.map((cell, i) => <td key={i}><Inline text={cell} /></td>)}</tr>)}</tbody></table></div>
  }
}

export function ContentSections({ sections, screenshots = [], language }: { sections: ContentSection[]; screenshots?: Screenshot[]; language: Language }) {
  return <>{sections.map((section, s) => <section key={section.title}><h2>{section.title}</h2>{section.blocks.map((block, i) => {
    const images = screenshots.filter(img => img.at?.section === s && img.at.block === i)
    return <Fragment key={i}><Block block={block} />{images.map(img => <Figure key={img.src} image={img} language={language} />)}</Fragment>
  })}</section>)}</>
}
