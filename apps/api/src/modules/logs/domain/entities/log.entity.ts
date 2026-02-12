import { z } from 'zod';

export enum LogType {
  AJOUT = 'AJOUT',
  SUPPRESSION = 'SUPPRESSION',
  MODIFICATION = 'MODIFICATION',
  CONNEXION = 'CONNEXION',
  DECONNEXION = 'DÉCONNEXION',
  AUTRE = 'AUTRE',
}

export const LogSchema = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  message: z.string(),
  userId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
});

export type LogEntity = z.infer<typeof LogSchema>;
