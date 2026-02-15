import { useEffect, useState } from 'react';
import { FileText, Activity, Users, Eye, MousePointerClick, Timer } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { DashboardStatsCard } from '@/features/dashboard/components/dashboard-stats-card';

const UMAMI_URL = 'https://analytics.romain-gilot.fr';
const UMAMI_SHARE_ID = 'DF764lrXIUbMwpVI';
const UMAMI_WEBSITE_ID = '03868712-b356-47e7-a7cd-419af93791c0';

interface Stats {
  blogs: number;
  users: number;
}

interface UmamiStats {
  activeVisitors: number;
  pageviews: number;
  visitors: number;
  visits: number;
  avgTime: string;
}

async function fetchUmamiStats(): Promise<UmamiStats> {
  const shareRes = await fetch(`${UMAMI_URL}/api/share/${UMAMI_SHARE_ID}`);
  const { token } = await shareRes.json();
  const headers = { 'x-umami-share-token': token };

  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const [statsRes, activeRes] = await Promise.all([
    fetch(`${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/stats?startAt=${thirtyDaysAgo}&endAt=${now}`, { headers }),
    fetch(`${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/active`, { headers }),
  ]);

  const stats = await statsRes.json();
  const active = await activeRes.json();

  const totalSeconds = stats.totaltime ?? 0;
  const avgSeconds = stats.visits > 0 ? Math.round(totalSeconds / stats.visits) : 0;
  const minutes = Math.floor(avgSeconds / 60);
  const seconds = avgSeconds % 60;

  return {
    activeVisitors: active.visitors ?? 0,
    pageviews: stats.pageviews ?? 0,
    visitors: stats.visitors ?? 0,
    visits: stats.visits ?? 0,
    avgTime: `${minutes}m${seconds.toString().padStart(2, '0')}s`,
  };
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ blogs: 0, users: 0 });
  const [umami, setUmami] = useState<UmamiStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [blogsRes, usersRes, umamiStats] = await Promise.all([
          api.get('/v1/blogs'),
          api.get('/v1/users'),
          fetchUmamiStats().catch(() => null),
        ]);
        setStats({
          blogs: blogsRes.data.blogs?.length ?? 0,
          users: usersRes.data.users?.length ?? 0,
        });
        setUmami(umamiStats);
      } catch {
        // stats stay at 0
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#667467]">
          Bonjour {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre espace d'administration.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardStatsCard
          title="Blogs"
          value={isLoading ? '-' : stats.blogs}
          icon={FileText}
          description="Articles publiés"
        />
        <DashboardStatsCard
          title="Sessions"
          value={isLoading ? '-' : (umami?.visits ?? 0)}
          icon={Activity}
          description="30 derniers jours"
        />
        <DashboardStatsCard
          title="Utilisateurs"
          value={isLoading ? '-' : stats.users}
          icon={Users}
          description="Comptes actifs"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatsCard
          title="En ligne"
          value={isLoading ? '-' : (umami?.activeVisitors ?? 0)}
          icon={Activity}
          description="Visiteurs actifs"
        />
        <DashboardStatsCard
          title="Visiteurs"
          value={isLoading ? '-' : (umami?.visitors ?? 0)}
          icon={Eye}
          description="30 derniers jours"
        />
        <DashboardStatsCard
          title="Pages vues"
          value={isLoading ? '-' : (umami?.pageviews ?? 0)}
          icon={MousePointerClick}
          description="30 derniers jours"
        />
        <DashboardStatsCard
          title="Durée moy."
          value={isLoading ? '-' : (umami?.avgTime ?? '0m00s')}
          icon={Timer}
          description="Par session"
        />
      </div>
    </div>
  );
}
