import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import type { Blog } from '../blogs';

type BlogDialogType = 'create' | 'edit' | 'delete';

interface BlogContextType {
  open: BlogDialogType | null;
  setOpen: (str: BlogDialogType | null) => void;
  currentRow: Blog | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Blog | null>>;
}

const BlogContext = React.createContext<BlogContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function BlogProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<BlogDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Blog | null>(null);

  return (
    <BlogContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => {
  const blogContext = React.useContext(BlogContext);

  if (!blogContext) {
    throw new Error('useBlog has to be used within <BlogProvider>');
  }

  return blogContext;
};
