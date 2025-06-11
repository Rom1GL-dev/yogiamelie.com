export interface TLocationModel {
  id: string;
  title: string;
  subtitle: string;
  lieu?: string;
  parking?: string;
  planning?: string;
  image: string | File;
  published: boolean;
}
