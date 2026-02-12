import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import type { Location } from '../locations';

type LocationDialogType = 'create' | 'edit' | 'delete';

interface LocationContextType {
  open: LocationDialogType | null;
  setOpen: (str: LocationDialogType | null) => void;
  currentRow: Location | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Location | null>>;
}

const LocationContext = React.createContext<LocationContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function LocationProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<LocationDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Location | null>(null);

  return (
    <LocationContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  const ctx = React.useContext(LocationContext);
  if (!ctx) throw new Error('useLocation has to be used within <LocationProvider>');
  return ctx;
};
