import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type DashboardStatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
};

export function DashboardStatsCard({
  title,
  value,
  icon: Icon,
  description,
}: DashboardStatsCardProps) {
  return (
    <Card className="bg-[#e8ede9]/50">
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-[#667467]">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex size-12 items-center justify-center rounded-lg bg-[#667467]/10">
            <Icon className="size-6 text-[#667467]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
