import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MANEUVERS, MANEUVER_GROUPS, MANEUVER_SYSTEMS } from '@content/maneuvers';
import { ManeuverPlaylist } from '@/components/Maneuvers';
import { Icon } from '@/components/Icon';

export function ManeuversPage() {
  const [params, setParams] = useSearchParams();
  const sys = params.get('sistema') ?? 'digestivo';
  const groups = MANEUVER_GROUPS.filter((g) => g.system === sys);
  const [group, setGroup] = useState<string | null>(params.get('grupo'));
  useEffect(() => {
    const m = params.get('m');
    if (m) {
      const found = MANEUVERS.find((x) => x.id === m);
      if (found) {
        setParams({ sistema: found.system, grupo: found.group });
        setGroup(found.group);
      }
    }
  }, [params, setParams]);
  const current = groups.find((g) => g.id === group) ?? null;
  const list = current ? MANEUVERS.filter((m) => m.group === current.id) : [];
  return (
    <div className="page maneuvers">
      <header className="maneuvers__head">
        <h1>Biblioteca de maniobras</h1>
        <p className="muted">
          Elegí aparato y región: aparecen, en orden, las maniobras con su fragmento exacto de video, la técnica y la interpretación. Los fragmentos se reproducen desde el video original de YouTube; no se
          redistribuyen.
        </p>
      </header>
      <div className="seg seg--wide" role="tablist" aria-label="Aparato">
        {MANEUVER_SYSTEMS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={sys === s.id}
            className={sys === s.id ? 'is-on' : ''}
            onClick={() => {
              setParams({ sistema: s.id });
              setGroup(null);
            }}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="mgroups">
        {groups.map((g) => {
          const n = MANEUVERS.filter((m) => m.group === g.id).length;
          const ready = g.status === 'ready' && n > 0;
          return (
            <button
              key={g.id}
              className={`mgroup ${group === g.id ? 'is-on' : ''} ${ready ? '' : 'is-soon'}`}
              disabled={!ready}
              onClick={() => {
                setGroup(g.id);
                setParams({ sistema: sys, grupo: g.id });
              }}
            >
              <span className="mgroup__title">{g.title}</span>
              <span className="mgroup__desc">{g.description}</span>
              <span className="mgroup__foot">{ready ? `${n} maniobra${n === 1 ? '' : 's'}` : 'Próximamente'}</span>
            </button>
          );
        })}
      </div>
      {current ? (
        <section className="mgroup-view">
          <h2>
            <Icon name="hand" size={20} /> {current.title}
          </h2>
          <ManeuverPlaylist key={current.id} list={list} />
        </section>
      ) : (
        <p className="empty">
          {groups.some((g) => g.status === 'ready')
            ? 'Elegí una región para ver sus maniobras.'
            : 'Los grupos de este aparato se habilitan cuando sus fragmentos de video están verificados contra el video real (no se publican marcas de tiempo supuestas).'}
        </p>
      )}
    </div>
  );
}
