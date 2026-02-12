import { useEffect, useState } from 'react';
import { FileText, HelpCircle, Users } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { DashboardStatsCard } from '@/features/dashboard/components/dashboard-stats-card';

interface Stats {
  blogs: number;
  faqs: number;
  users: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ blogs: 0, faqs: 0, users: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, faqsRes, usersRes] = await Promise.all([
          api.get('/v1/blogs'),
          api.get('/v1/faqs'),
          api.get('/v1/users'),
        ]);
        setStats({
          blogs: blogsRes.data.blogs?.length ?? 0,
          faqs: faqsRes.data.faqs?.length ?? 0,
          users: usersRes.data.users?.length ?? 0,
        });
      } catch {
        // stats stay at 0
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
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
          title="FAQs"
          value={isLoading ? '-' : stats.faqs}
          icon={HelpCircle}
          description="Questions fréquentes"
        />
        <DashboardStatsCard
          title="Utilisateurs"
          value={isLoading ? '-' : stats.users}
          icon={Users}
          description="Comptes actifs"
        />
      </div>
    </div>
  );
}
