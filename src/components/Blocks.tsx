import { useState } from 'react';
import type { Block, CalloutKind, Priority } from '@/types';
import { Rich, Refs } from './Rich';
import { Icon } from './Icon';

const CALLOUT: Record<CalloutKind, { label: string; icon: string }> = {
  prof: { label: 'Énfasis del profesor', icon: 'cap' },
  tip: { label: 'Para entenderlo', icon: 'bulb' },
  warn: { label: 'Error frecuente', icon: 'alert' },
  clinic: { label: 'En la clínica', icon: 'stethoscope' },
  key: { label: 'Clave', icon: 'star' },
  note: { label: 'Nota', icon: 'info' },
  bib: { label: 'Bibliografía actual', icon: 'book' },
};

export function PriorityBadge({ p }: { p: Priority }) {
  const label = p === 'imprescindible' ? 'Imprescindible' : p === 'muy-importante' ? 'Muy importante' : 'Complementario';
  return <span className={`badge badge--${p}`}>{label}</span>;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return (
        <p className="prose-p">
          <Rich text={b.text} />
        </p>
      );
    case 'lead':
      return (
        <p className="lead">
          <Rich text={b.text} />
        </p>
      );
    case 'h':
      return (
        <h4 className="block-h">
          <Rich text={b.text} />
        </h4>
      );
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul';
      return (
        <Tag className={`blist ${b.ordered ? 'blist--ol' : ''}`}>
          {b.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </Tag>
      );
    }
    case 'def':
      return (
        <div className="def">
          <div className="def__term">{b.term}</div>
          <div className="def__text">
            <Rich text={b.text} />
          </div>
          <Refs refs={b.refs} />
        </div>
      );
    case 'callout': {
      const c = CALLOUT[b.kind];
      return (
        <aside className={`callout callout--${b.kind}`}>
          <div className="callout__head">
            <Icon name={c.icon} size={18} />
            <span>{b.title ?? c.label}</span>
          </div>
          {b.text && (
            <p>
              <Rich text={b.text} />
            </p>
          )}
          {b.items && (
            <ul>
              {b.items.map((it, i) => (
                <li key={i}>
                  <Rich text={it} />
                </li>
              ))}
            </ul>
          )}
          <Refs refs={b.refs} />
        </aside>
      );
    }
    case 'table':
      return (
        <div className="table-wrap">
          <table className="btable">
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>
                      <Rich text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {b.caption && (
            <div className="table-caption">
              <Rich text={b.caption} />
            </div>
          )}
        </div>
      );
    case 'cards':
      return (
        <div className={`cards cards--${b.cols ?? 3}`}>
          {b.items.map((it, i) => (
            <div key={i} className={`card tone-${it.tone ?? 'lilac'}`}>
              {it.tag && <span className="card__tag">{it.tag}</span>}
              <div className="card__title">{it.title}</div>
              <div className="card__text">
                <Rich text={it.text} />
              </div>
            </div>
          ))}
        </div>
      );
    case 'steps':
      return (
        <div className="steps">
          {b.title && <div className="steps__title">{b.title}</div>}
          <ol>
            {b.items.map((it, i) => (
              <li key={i}>
                <span className="steps__n">{i + 1}</span>
                <div>
                  <div className="steps__h">{it.title}</div>
                  <div className="steps__t">
                    <Rich text={it.text} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'chain':
      return (
        <div className="chain">
          {b.title && <div className="chain__title">{b.title}</div>}
          <div className="chain__row">
            {b.items.map((it, i) => (
              <div key={i} className="chain__cell">
                <div className={`chain__node chain__node--${it.kind}`}>
                  <span className="chain__kind">{it.kind === 'cause' ? 'Causa' : it.kind === 'mech' ? 'Mecanismo' : 'Manifestación'}</span>
                  <Rich text={it.label} />
                </div>
                {i < b.items.length - 1 && <span className="chain__arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </div>
      );
    case 'compare':
      return (
        <div className="compare">
          {b.title && <div className="compare__title">{b.title}</div>}
          <div className="compare__cols" style={{ gridTemplateColumns: `repeat(${b.cols.length}, minmax(0, 1fr))` }}>
            {b.cols.map((c, i) => (
              <div key={i} className={`compare__col tone-${c.tone ?? 'lilac'}`}>
                <div className="compare__head">{c.title}</div>
                <ul>
                  {c.items.map((it, j) => (
                    <li key={j}>
                      <Rich text={it} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    case 'accordion':
      return <Accordion items={b.items} />;
    case 'case':
      return <CaseBlock b={b} />;
    case 'kv':
      return (
        <dl className="kv">
          {b.items.map((it, i) => (
            <div key={i} className="kv__row">
              <dt>{it.k}</dt>
              <dd>
                <Rich text={it.v} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

function Accordion({ items }: { items: { title: string; blocks: Block[] }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <div key={i} className={`acc ${open === i ? 'is-open' : ''}`}>
          <button className="acc__btn" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{it.title}</span>
            <Icon name="chevronDown" size={18} />
          </button>
          {/* Contenido siempre en el DOM (buscable e imprimible); se oculta visualmente. */}
          <div className="acc__body" hidden={open !== i}>
            <Blocks blocks={it.blocks} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CaseBlock({ b }: { b: Extract<Block, { t: 'case' }> }) {
  const [show, setShow] = useState(false);
  return (
    <div className="case">
      <div className="case__head">
        <Icon name="stethoscope" size={18} /> {b.title}
      </div>
      <p>
        <Rich text={b.text} />
      </p>
      {b.question && (
        <p className="case__q">
          <Rich text={b.question} />
        </p>
      )}
      {b.answer && (
        <>
          <button className="btn btn--soft btn--sm" onClick={() => setShow(!show)}>
            {show ? 'Ocultar razonamiento' : 'Ver razonamiento'}
          </button>
          <div className="case__a" hidden={!show}>
            <Rich text={b.answer} />
          </div>
        </>
      )}
    </div>
  );
}
