import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MobileDonateBar() {
  const router = useRouter();
  if (router.pathname.startsWith('/donate') || router.pathname.startsWith('/thank-you')) {
    return null;
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <Link href="/donate" className="btn-primary flex min-h-12 w-full">
        Donate now
      </Link>
    </div>
  );
}
