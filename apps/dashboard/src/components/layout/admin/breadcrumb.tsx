import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/config/routes.config.ts";

interface BreadcrumbProps {
    breadcrumbs: {
        name: string;
        href: string;
        current: boolean;
    }[];
}

export default function Breadcrumb({ breadcrumbs }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="hidden md:flex">
            <ol role="list" className="flex items-center space-x-4 px-6">
                <li>
                    <div>
                        <Link to={APP_ROUTES.admin.dashboard.getHref()} className="text-white hover:text-gray-100">
                            <HomeIcon aria-hidden="true" className="size-4 shrink-0" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>
                </li>
                {breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.name}>
                        <div className="flex items-center text-nowrap">
                            <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-white" />
                            <a
                                href={breadcrumb.href}
                                aria-current={breadcrumb.current ? "page" : undefined}
                                className="ml-4 text-sm font-medium text-white hover:text-gray-100"
                            >
                                {breadcrumb.name}
                            </a>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
