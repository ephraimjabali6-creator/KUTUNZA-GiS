import { useState } from 'react';

const USUAL = [
  'Commercial pads cost 80–120 KSh a pack — out of reach for families living on less than $2 a day.',
  'Girls miss four to five school days each month, about 20% of class time.',
  'Disposable aid runs out when a funding cycle ends, and plastic waste blocks local drains.',
];

const WAY = [
  'A washable pack lasts up to three years. Girls receive it after a classroom lesson they share with the boys.',
  'Female educators and teachers run puberty lessons in school, not as a one-off assembly.',
  'Emergency stock sits in the staff room so a stained uniform never sends a girl home.',
];

export default function Approach() {
  const [mode, setMode] = useState<'usual' | 'way'>('way');
  const items = mode === 'usual' ? USUAL : WAY;

  return (
    <section className="section">
      <div className="site-wrap grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">The work</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Period poverty is an education problem, not a hygiene footnote.
          </h2>
          <p className="body-copy mt-6 max-w-md">
            In Kibera, families choose food over sanitary products. The result is absenteeism,
            infection risk, and girls leaving school. Kutunza funds durable kits and classroom
            teaching with partner schools — not a revolving box of disposables.
          </p>
        </div>
        <div>
          <div className="flex gap-2 border-b border-line">
            <button
              type="button"
              onClick={() => setMode('usual')}
              className={`px-1 pb-3 text-xs font-medium uppercase tracking-[0.14em] ${
                mode === 'usual' ? 'border-b-2 border-forest-500 text-ink' : 'text-ink-faint'
              }`}
            >
              The usual story
            </button>
            <button
              type="button"
              onClick={() => setMode('way')}
              className={`ml-6 px-1 pb-3 text-xs font-medium uppercase tracking-[0.14em] ${
                mode === 'way' ? 'border-b-2 border-forest-500 text-ink' : 'text-ink-faint'
              }`}
            >
              The Kutunza way
            </button>
          </div>
          <ul className="mt-8 space-y-5">
            {items.map((item) => (
              <li key={item} className="border-l-2 border-forest-500 pl-4 text-[17px] leading-7 text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
