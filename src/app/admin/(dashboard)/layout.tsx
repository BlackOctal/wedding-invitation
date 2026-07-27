import Link from "next/link";
import { logoutAction } from "../login/actions";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/images", label: "Images" },
  { href: "/admin/guests", label: "Guests" },
  { href: "/admin/rsvps", label: "RSVPs" },
  { href: "/admin/moments", label: "Moments" },
  { href: "/admin/blessings", label: "Blessings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-divider bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <nav className="flex flex-wrap gap-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-espresso no-underline hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction}>
            <button
              type="submit"
              className="cursor-pointer rounded border border-divider bg-transparent px-4 py-1.5 text-xs tracking-[0.06em] text-muted uppercase"
            >
              Log Out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
