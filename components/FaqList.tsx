import { useState } from 'react';

const FAQS = [
  {
    q: 'How are donations used?',
    a: 'Public gifts buy washable sanitary packs and teaching materials, and cover transport to Kenya for each visit. Figures live on the donate page.',
  },
  {
    q: 'How do washable sanitary towels work?',
    a: 'They are fabric pads that can be washed and reused for up to three years — cheaper and cleaner than a monthly pack of disposables.',
  },
  {
    q: 'Which schools do you visit?',
    a: 'Olympic Primary and Ayany Primary in Nairobi. We go back to the same year groups each year.',
  },
  {
    q: 'Is payment secure?',
    a: 'Yes. Cards are taken on Stripe Checkout. Kutunza never stores card numbers or CVV codes.',
  },
  {
    q: 'Can UK donors claim Gift Aid?',
    a: 'Only if Kutunza holds active HMRC Gift Aid status. That is marked as awaiting client confirmation so we do not claim incorrectly.',
  },
];

export default function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="site-wrap max-w-3xl">
        <p className="eyebrow">Help</p>
        <h2 className="mt-3 font-serif text-4xl">Questions donors actually ask.</h2>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {FAQS.map((item, i) => (
            <li key={item.q}>
              <button
                type="button"
                className="flex min-h-12 w-full items-center justify-between gap-6 py-5 text-left"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium">{item.q}</span>
                <span aria-hidden>{open === i ? '–' : '+'}</span>
              </button>
              {open === i && <p className="pb-5 text-sm leading-6 text-ink-muted">{item.a}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
