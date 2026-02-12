import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import type { Faq } from '../faqs';

type FaqDialogType = 'create' | 'edit' | 'delete';

interface FaqContextType {
  open: FaqDialogType | null;
  setOpen: (str: FaqDialogType | null) => void;
  currentRow: Faq | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Faq | null>>;
}

const FaqContext = React.createContext<FaqContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function FaqProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<FaqDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Faq | null>(null);

  return (
    <FaqContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </FaqContext.Provider>
  );
}

export const useFaq = () => {
  const faqContext = React.useContext(FaqContext);

  if (!faqContext) {
    throw new Error('useFaq has to be used within <FaqProvider>');
  }

  return faqContext;
};
