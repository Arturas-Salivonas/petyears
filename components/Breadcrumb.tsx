import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-text/70">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-text/40">/</span>}
            {index === items.length - 1 ? (
              <span className="text-secondary font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-secondary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}