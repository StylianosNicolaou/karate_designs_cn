import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function Breadcrumbs({ items = [] }) {
  const breadcrumbItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    ...items,
  ];

  return (
    <nav
      className="flex items-center space-x-2 text-sm text-gray-400 mb-6"
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const Icon = item.icon;

        return (
          <div key={item.name} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-500" />
            )}

            {isLast ? (
              <span className="text-white font-medium">
                {Icon && <Icon className="h-4 w-4 inline mr-1" />}
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors duration-200 flex items-center"
              >
                {Icon && <Icon className="h-4 w-4 mr-1" />}
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
