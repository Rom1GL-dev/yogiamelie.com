export const routes = {
  public: {
    home: {
      getHref: () => '/'
    },
    cours: {
      getHref: () => '/cours'
    },
    blog: {
      getHref: () => '/blogs'
    },
    mentionLegale: {
      getHref: () => '/mentions-legales'
    },
    politiqueDeConfidentialite: {
      getHref: () => '/politique-de-confidentialite'
    }
  }
} as const;
