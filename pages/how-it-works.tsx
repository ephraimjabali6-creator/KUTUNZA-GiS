import SiteLayout from '../components/SiteLayout';
import HowItWorks from '../components/HowItWorks';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <SiteLayout title="How it works">
      <section className="site-wrap py-16 lg:py-24">
        <p className="eyebrow">Visits</p>
        <h1 className="display mt-4 max-w-3xl">Invited in. Taught together. Packs for the girls.</h1>
        <p className="body-copy mt-6 max-w-2xl">
          Girls in School is not a warehouse drop. A church partner already knows the school. We
          teach puberty to the whole class, then girls stay for a washable pack. We come back the
          next year to the same year group.
        </p>
        <Link href="/donate" className="btn-primary mt-8 inline-flex min-h-12">
          Fund a visit
        </Link>
      </section>
      <HowItWorks />
      <section className="border-t border-line py-20">
        <div className="site-wrap grid gap-6 md:grid-cols-3">
          <img src="/images/distribution.jpg" alt="Distribution table in a school courtyard" className="h-64 w-full rounded-2xl object-cover" />
          <img src="/images/kits-table.jpg" alt="Adults unpacking patterned washable packs" className="h-64 w-full rounded-2xl object-cover" />
          <img src="/images/handover.jpg" alt="A volunteer handing a pack to a pupil" className="h-64 w-full rounded-2xl object-cover" />
        </div>
      </section>
    </SiteLayout>
  );
}
