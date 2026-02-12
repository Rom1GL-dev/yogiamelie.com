const authRoot = '/auth';
const usersRoot = '/users';
const logsRoot = '/logs';
const blogsRoot = '/blogs';
const faqsRoot = '/faqs';
const eventsRoot = '/events';
const imagesRoot = '/images';
const linksRoot = '/links';
const locationRoot = '/location';
const priceRoot = '/prices';
const siteWebRoot = '/site-web';
const emailRoot = '/email';
const settingsRoot = '/settings';

const v1 = 'v1';

export const routesV1 = {
  version: v1,
  auth: {
    root: authRoot,
    login: `${authRoot}/login`,
    logout: `${authRoot}/logout`,
    me: `${authRoot}/me`,
  },
  users: {
    root: usersRoot,
    byCustomerId: `${usersRoot}/user/:userEmail`,
  },
  blogs: {
    root: blogsRoot,
  },
  faqs: {
    root: faqsRoot,
  },
  events: {
    root: eventsRoot,
  },
  logs: {
    root: logsRoot,
  },
  links: {
    root: linksRoot,
  },
  location: {
    root: locationRoot,
  },
  price: {
    root: priceRoot,
  },
  siteWeb: {
    root: siteWebRoot,
    bySection: `${siteWebRoot}/:section`,
  },
  image: {
    root: imagesRoot,
    upload: `${imagesRoot}/upload/:category`,
    getImage: `${imagesRoot}/:category/:imageName`,
  },
  email: {
    root: emailRoot,
  },
  settings: {
    root: settingsRoot,
  },
};
