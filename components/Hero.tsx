import Link from 'next/link';
import { useState } from 'react';
import { CAMPAIGN_DATA } from '../content/campaignData';

const HERO_IMAGES = [
  { src: '/images/hero-assembly.jpg', caption: 'Assembly courtyard, Nairobi partner school' },
  { src: '/images/kits-table.jpg', caption: 'Unpacking washable packs before a visit' },
  { src: '/images/handover.jpg', caption: 'Handing kits to girls after the lesson' },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const current = HERO_IMAGES[active];
  return (
    <section className="site-wrap grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
      <div>
        <p className="eyebrow">{CAMPAIGN_DATA.projectTitle}</p>
        <h1 className="display mt-4">
          Keep girls in <span className="text-forest-500">school</span> when their period starts.
        </h1>
        <p className="body-copy mt-6 max-w-lg">
          {CAMPAIGN_DATA.projectTagline} We teach boys and girls together, then give every girl a
          washable pack she can use for years — currently at Olympic Primary and Ayany Primary.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link href="/donate" className="btn-primary min-h-12">
            Donate
          </Link>
          <Link href="/how-it-works" className="btn-ghost min-h-12">
            How the visits work
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-line">
        <img
          src={current.src}
          alt={current.caption}
          className="h-[420px] w-full object-cover sm:h-[520px]"
        />
        <div className="absolute bottom-4 left-4 flex gap-2 rounded-xl bg-ink/40 p-1.5 backdrop-blur">
          {HERO_IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={img.caption}
              onClick={() => setActive(i)}
              className={`h-9 w-12 overflow-hidden rounded-lg ${i === active ? 'ring-2 ring-white' : 'opacity-70'}`}
            >
              <img src={img.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
