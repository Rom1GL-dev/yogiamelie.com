import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { SiteWebFilter } from '@/features/site-web/components/site-web-filter.tsx';
import { siteWebStore } from '@/stores/site-web-store.ts';
import SiteWebPagePrincipale from '@/features/site-web/components/principale/site-web-page-principale.tsx';
import SiteWebPageCours from '@/features/site-web/components/cours/site-web-page-cours.tsx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

export const SiteWebRoute = observer(() => {
  const navigation = useNavigate();
  return (
    <LayoutAdmin
      title={'Site web'}
      description="Paramètres du site web"
      breadcrumbs={[{ name: 'Site web', href: '', current: true }]}
      button={
        <div
          className={
            'flex cursor-pointer items-center gap-x-2 text-gray-500 hover:text-gray-800'
          }
          onClick={() => navigation('/')}
        >
          Accéder au site web <FaChevronRight size={15} />
        </div>
      }
    >
      <SiteWebFilter
        selectedType={siteWebStore.selectedType}
        siteWebParametreType={siteWebStore.siteWebParametreType}
        onSelect={siteWebStore.setSelectedType.bind(siteWebStore)}
      />

      {siteWebStore.selectedType === 'pagePrincipale' && (
        <SiteWebPagePrincipale />
      )}

      {siteWebStore.selectedType === 'pageCours' && <SiteWebPageCours />}
    </LayoutAdmin>
  );
});
