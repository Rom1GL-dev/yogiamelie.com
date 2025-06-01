import { Header } from '@/components/layout/admin/header.tsx';
import { Sidebar } from '@/components/layout/admin/sidebar.tsx';

export default function LayoutAdmin({
  children,
  title,
  description,
  button,
  breadcrumbs
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  button?: React.ReactNode;
  breadcrumbs?: {
    name: string;
    href: string;
    current: boolean;
  }[];
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header breadcrumbs={breadcrumbs ?? []} />
        <div className="flex-1 overflow-auto p-5 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-800 md:mb-5">
                {title}
              </h1>
              <p className="mb-5 text-sm text-gray-800 md:text-base">
                {description}
              </p>
            </div>
            {button}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
