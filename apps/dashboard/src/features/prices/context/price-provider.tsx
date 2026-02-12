import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import type { Price } from '../prices';

type PriceDialogType = 'create' | 'edit' | 'delete';

interface PriceContextType {
  open: PriceDialogType | null;
  setOpen: (str: PriceDialogType | null) => void;
  currentRow: Price | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Price | null>>;
}

const PriceContext = React.createContext<PriceContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function PriceProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<PriceDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Price | null>(null);

  return (
    <PriceContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </PriceContext.Provider>
  );
}

export const usePrice = () => {
  const ctx = React.useContext(PriceContext);
  if (!ctx) throw new Error('usePrice has to be used within <PriceProvider>');
  return ctx;
};
