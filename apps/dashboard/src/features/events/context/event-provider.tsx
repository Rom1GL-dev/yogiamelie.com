import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import type { Event } from '../events';

type EventDialogType = 'create' | 'edit' | 'delete';

interface EventContextType {
  open: EventDialogType | null;
  setOpen: (str: EventDialogType | null) => void;
  currentRow: Event | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Event | null>>;
}

const EventContext = React.createContext<EventContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function EventProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<EventDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Event | null>(null);

  return (
    <EventContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEvent = () => {
  const eventContext = React.useContext(EventContext);
  if (!eventContext) {
    throw new Error('useEvent has to be used within <EventProvider>');
  }
  return eventContext;
};
