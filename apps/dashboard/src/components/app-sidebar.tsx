import { LayoutDashboard, FileText, HelpCircle, Users, Calendar, MapPin, CreditCard, Link2, Globe } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth } from '@/lib/auth';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '@/config/routes.config';

const contentItems = [
  {
    title: 'Blogs',
    url: routes.blogs,
    icon: FileText,
  },
  {
    title: 'FAQs',
    url: routes.faqs,
    icon: HelpCircle,
  },
  {
    title: 'Événements',
    url: routes.events,
    icon: Calendar,
  },
  {
    title: 'Lieux',
    url: routes.locations,
    icon: MapPin,
  },
  {
    title: 'Tarifs',
    url: routes.prices,
    icon: CreditCard,
  },
];

const configItems = [
  {
    title: 'Site web',
    url: routes.siteWeb,
    icon: Globe,
  },
  {
    title: 'Liens sociaux',
    url: routes.links,
    icon: Link2,
  },
  {
    title: 'Utilisateurs',
    url: routes.users,
    icon: Users,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="bg-[#e8ede9]" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={routes.app}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#667467] text-white">
                  <span className="text-sm font-bold">KY</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Kesharini Yoga</span>
                  <span className="truncate text-xs">Administration</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Général</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Tableau de bord"
                isActive={location.pathname === routes.app}
                className="data-[active=true]:bg-[#667467] data-[active=true]:text-white hover:bg-[#667467]/10"
              >
                <Link to={routes.app}>
                  <LayoutDashboard />
                  <span>Tableau de bord</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavMain items={contentItems} label="Contenu" />
        <NavMain items={configItems} label="Configuration" />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
