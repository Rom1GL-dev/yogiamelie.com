import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/config/routes.config';

interface Props {
  title: string;
}
export default function BlogBreadcrumb({ title }: Props) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              href={routes.public.home.getHref()}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg
                className="size-5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <Image
              src={'/icons/chevron-right.svg'}
              alt={'chevron'}
              height={20}
              width={20}
            />
            <Link
              href={routes.public.blog.getHref()}
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Blog
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <Image
              src={'/icons/chevron-right.svg'}
              alt={'chevron'}
              height={20}
              width={20}
            />
            <div
              className="ml-4 text-sm font-medium text-gray-700"
              aria-current="page"
            >
              {title}
            </div>
          </div>
        </li>
      </ol>
    </nav>
  );
}
