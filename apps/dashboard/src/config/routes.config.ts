export const APP_ROUTES = {
  404: '/404',
  app: {
    path: '/',
    getHref: () => '/',
    cours: {
      path: '/cours',
      getHref: () => '/cours'
    },
    blogDetails: {
      path: '/blog/:slug',
      getHref: () => '/blog/:slug'
    },
    eventsDetails: {
      path: '/evenement/:slug',
      getHref: () => '/evenement/:slug'
    },
    mentions: {
      path: '/mentions-legales',
      getHref: () => '/mentions-legales'
    }
  },
  admin: {
    login: {
      path: '/admin/connexion',
      getHref: () => 'admin/connexion'
    },
    dashboard: {
      path: '/admin/tableau-de-bord',
      getHref: () => '/admin/tableau-de-bord'
    },
    blogs: {
      path: '/admin/blogs',
      getHref: () => '/admin/blogs'
    },
    blogsNew: {
      path: '/admin/blogs/nouveau',
      getHref: () => '/admin/blogs/nouveau'
    },
    blogDetails: {
      path: '/admin/blogs/:slug',
      getHref: () => '/admin/blogs/:slug'
    },
    events: {
      path: '/admin/evenements',
      getHref: () => '/admin/evenements'
    },
    eventsDetails: {
      path: '/admin/evenements/:slug',
      getHref: () => '/admin/evenements/:slug'
    },
    eventNew: {
      path: '/admin/evenements/nouveau',
      getHref: () => '/admin/evenements/nouveau'
    },
    users: {
      path: '/admin/utilisateurs',
      getHref: () => '/admin/utilisateurs'
    },
    userNew: {
      path: '/admin/utilisateurs/nouveau',
      getHref: () => '/admin/utilisateurs/nouveau'
    },
    userDetails: {
      path: '/admin/utilisateurs/:slug',
      getHref: () => '/admin/utilisateurs/:slug'
    },
    locations: {
      path: '/admin/lieux',
      getHref: () => '/admin/lieux'
    },
    locationNew: {
      path: '/admin/lieux/nouveau',
      getHref: () => '/admin/lieux/nouveau'
    },
    locationDetails: {
      path: '/admin/lieux/:slug',
      getHref: () => '/admin/lieux/:slug'
    },
    prices: {
      path: '/admin/prix',
      getHref: () => '/admin/prix'
    },
    priceNew: {
      path: '/admin/prix/nouveau',
      getHref: () => '/admin/prix/nouveau'
    },
    priceDetails: {
      path: '/admin/prix/:slug',
      getHref: () => '/admin/prix/:slug'
    },
    siteWeb: {
      path: '/admin/site-web',
      getHref: () => '/admin/site-web'
    },
    liens: {
      path: '/admin/liens',
      getHref: () => '/admin/liens'
    }
  }
};
