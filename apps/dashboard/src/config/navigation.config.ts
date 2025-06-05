import { APP_ROUTES } from '@/config/routes.config.ts';
import {
  FaBlogger,
  FaCalendarAlt,
  FaGlobe,
  FaInfo,
  FaTachometerAlt,
  FaUsers
} from 'react-icons/fa';

export const navigation = [
  {
    path: APP_ROUTES.admin.dashboard.path,
    name: 'Tableau de bord',
    icon: FaTachometerAlt
  },
  { title: 'Gestion' },
  {
    path: APP_ROUTES.admin.events.path,
    name: 'Évènements',
    icon: FaCalendarAlt
  },
  { path: APP_ROUTES.admin.blogs.path, name: 'Blogs', icon: FaBlogger },
  { path: APP_ROUTES.admin.users.path, name: 'Utilisateurs', icon: FaUsers },
  { title: 'Paramétrage' },
  { path: APP_ROUTES.admin.siteWeb.path, name: 'Site web', icon: FaGlobe },
  { path: APP_ROUTES.admin.mentions.path, name: 'Mentions', icon: FaInfo }
];

export const navigationCours = [
  {
    label: 'Accueil',
    href: APP_ROUTES.app.getHref()
  },
  {
    label: 'À propos',
    href: '#a-propos'
  },
  {
    label: 'Lieux',
    href: '#lieux'
  },
  {
    label: 'Tarifs',
    href: '#tarifs'
  },
  {
    label: 'Matériel nécessaire',
    href: '#materiel'
  },
  {
    label: 'Questions fréquentes',
    href: '#faq'
  },
  {
    label: 'Contact',
    href: '#contact'
  }
];
