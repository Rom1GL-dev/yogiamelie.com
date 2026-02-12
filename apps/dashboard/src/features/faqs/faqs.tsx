import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table/data-table';
import FaqProvider from './context/faq-provider';
import { faqColumns } from './components/faq-columns';
import { FaqListingToolbar } from './components/faq-listing-toolbar';
import { FaqDialogs } from './components/faq-dialogs';

export type Faq = {
  id: string;
  answer: string;
  response: string;
  createdAt: string;
};

export function Faqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFaqs = async () => {
    try {
      const res = await api.get('/v1/faqs');
      setFaqs(res.data.faqs ?? []);
    } catch {
      toast.error('Erreur lors du chargement des FAQs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="size-8 animate-spin rounded-full border-4 border-[#e8ede9] border-t-[#667467]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#667467]">FAQs</h1>
        <p className="text-muted-foreground">
          Gérez vos questions fréquentes.
        </p>
      </div>

      <FaqProvider>
        <DataTable
          columns={faqColumns}
          data={faqs}
          Toolbar={FaqListingToolbar}
        />
        <FaqDialogs onSuccess={fetchFaqs} />
      </FaqProvider>
    </div>
  );
}
