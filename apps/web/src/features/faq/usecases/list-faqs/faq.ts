export type BaseFaq = {
  answer: string;
  response: string;
};

export type Faq = BaseFaq & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
