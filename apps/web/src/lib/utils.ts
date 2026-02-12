import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPhoneForm(telephone: string | undefined): string {
  if (!telephone) return 'Aucun téléphone';

  // Normalise : enlève les espaces et remplace +33 par 0
  const normalized = telephone.replace(/\s+/g, '').replace(/^\+33/, '0');

  // Découpe en blocs de 2 chiffres
  const parts = normalized.match(/.{1,2}/g) ?? [];

  return parts.join(' ').trim();
}

export const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const reformatForUrl = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD') //
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const generateImageName = (title: string, file: File): string => {
  if (!file || !file.name) {
    throw new Error('Fichier invalide ou manquant pour la génération du nom');
  }

  const slugifiedTitle = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .substring(0, 30);

  const uniqueSuffix = Date.now();
  const ext = file.name.split('.').pop();
  return `${slugifiedTitle}-${uniqueSuffix}.${ext}`;
};

export const renameFile = (file: File, newName: string): File => {
  return new File([file], newName, { type: file.type });
};

export const formatDate = (
  dateStart: string,
  hourStart?: string,
  dateEnd?: string,
  hourEnd?: string
): string => {
  const sameDay =
    dateStart &&
    dateEnd &&
    dayjs(dateStart).format('DD/MM/YYYY') ===
      dayjs(dateEnd).format('DD/MM/YYYY');

  const formattedStartDate = dayjs(dateStart).format('D MMMM YYYY');
  const formattedEndDate = dateEnd
    ? dayjs(dateEnd).format('D MMMM YYYY')
    : null;

  if (sameDay) {
    const hours =
      hourStart && hourEnd
        ? ` / ${hourStart} - ${hourEnd}`
        : hourStart
          ? ` / à partir de ${hourStart}`
          : hourEnd
            ? ` / jusqu’à ${hourEnd}`
            : '';

    return `${formattedStartDate}${hours}`;
  }

  // Dates différentes
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  if (hourStart && !hourEnd) {
    return `${range} / à partir de ${hourStart}`;
  } else if (!hourStart && hourEnd) {
    return `${range} / jusqu’à ${hourEnd}`;
  } else if (hourStart && hourEnd) {
    return `${range} / ${hourStart} - ${hourEnd}`;
  }

  return range;
};
