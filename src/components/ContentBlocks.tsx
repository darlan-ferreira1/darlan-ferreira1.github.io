import type { ContentBlock, ContentSection } from '../data/projects'

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

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return <>{sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.blocks.map((block, i) => <Block key={i} block={block} />)}</section>)}</>
}
