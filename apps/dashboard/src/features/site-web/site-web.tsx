import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';
import { RichTextEditor } from '@/components/rich-text-editor';
import { ImageUploadField } from '@/components/image-upload-field';

type SectionData = Record<string, string>;
type Field = { key: string; label: string; type: 'input' | 'html' | 'image' };

type SectionConfig = {
  section: string;
  title: string;
  fields: Field[];
};

const HOME_SECTIONS: SectionConfig[] = [
  {
    section: 'presentation',
    title: 'Présentation',
    fields: [
      { key: 'title', label: 'Titre', type: 'input' },
      { key: 'button', label: 'Texte du bouton', type: 'input' },
      { key: 'buttonLink', label: 'Lien du bouton', type: 'input' },
    ],
  },
  {
    section: 'welcome',
    title: 'Bienvenue',
    fields: [
      { key: 'title', label: 'Titre', type: 'input' },
      { key: 'description', label: 'Description', type: 'html' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    section: 'newsletter',
    title: 'Newsletter',
    fields: [
      { key: 'title', label: 'Titre', type: 'input' },
      { key: 'description', label: 'Description', type: 'html' },
      { key: 'button', label: 'Texte du bouton', type: 'input' },
    ],
  },
];

const COURS_SECTIONS: SectionConfig[] = [
  {
    section: 'presentationCours',
    title: 'Présentation',
    fields: [
      { key: 'title', label: 'Titre', type: 'input' },
      { key: 'description', label: 'Sous-titre', type: 'input' },
      { key: 'button', label: 'Texte du bouton', type: 'input' },
      { key: 'buttonLink', label: 'Lien du bouton', type: 'input' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    section: 'aboutCours',
    title: 'À propos',
    fields: [
      { key: 'title', label: 'Titre', type: 'input' },
      { key: 'description', label: 'Description', type: 'html' },
    ],
  },
  {
    section: 'tarifsCours',
    title: 'Tarifications',
    fields: [
      { key: 'phrase', label: 'Phrase sous les tarifs', type: 'html' },
      { key: 'buttonText', label: 'Texte du bouton', type: 'input' },
      { key: 'buttonLink', label: 'Lien du bouton', type: 'input' },
    ],
  },
  {
    section: 'materielsCours',
    title: 'Matériels',
    fields: [
      { key: 'title', label: 'Titre', type: 'input' },
      { key: 'description', label: 'Description', type: 'html' },
      { key: 'image1', label: 'Image 1', type: 'image' },
      { key: 'image2', label: 'Image 2', type: 'image' },
      { key: 'image3', label: 'Image 3', type: 'image' },
    ],
  },
  {
    section: 'faqCours',
    title: 'FAQ',
    fields: [
      { key: 'description', label: 'Contenu FAQ', type: 'html' },
    ],
  },
];

const COMMON_SECTIONS: SectionConfig[] = [
  {
    section: 'mentionsLegales',
    title: 'Mentions Légales',
    fields: [
      { key: 'content', label: 'Contenu', type: 'html' },
    ],
  },
];

const ALL_SECTIONS = [...HOME_SECTIONS, ...COURS_SECTIONS, ...COMMON_SECTIONS];

export function SiteWeb() {
  const [data, setData] = useState<Record<string, SectionData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingTab, setSavingTab] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const results: Record<string, SectionData> = {};
      const sectionKeys = ALL_SECTIONS.map((s) => s.section);
      const responses = await Promise.allSettled(
        sectionKeys.map((key) => api.get(`/v1/site-web/${key}`))
      );
      responses.forEach((res, i) => {
        if (res.status === 'fulfilled') {
          results[sectionKeys[i]] = res.value.data.details ?? {};
        } else {
          results[sectionKeys[i]] = {};
        }
      });
      setData(results);
      setIsLoading(false);
    };
    fetchAll();
  }, []);

  const updateField = (section: string, key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] ?? {}), [key]: value },
    }));
  };

  const handleSaveTab = async (sections: SectionConfig[]) => {
    const tabName = sections === HOME_SECTIONS ? 'home' : sections === COURS_SECTIONS ? 'cours' : 'commun';
    setSavingTab(tabName);
    try {
      for (const config of sections) {
        const sectionData = data[config.section] ?? {};
        const entries = Object.entries(sectionData).map(([contentType, value]) => ({
          contentType,
          value,
        }));
        if (entries.length > 0) {
          await api.put('/v1/site-web', { section: config.section, entries });
        }
      }
      toast.success('Enregistré avec succès.');
    } catch {
      toast.error('Erreur lors de la sauvegarde.');
    } finally {
      setSavingTab(null);
    }
  };

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
        <h1 className="text-2xl font-bold text-[#667467]">Gestion du site web</h1>
        <p className="text-muted-foreground">Gérez le contenu dynamique de votre site vitrine.</p>
      </div>

      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Page d&apos;accueil</TabsTrigger>
          <TabsTrigger value="cours">Page Cours</TabsTrigger>
          <TabsTrigger value="commun">Pages Communes</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-4">
          {HOME_SECTIONS.map((config) => (
            <SectionCard key={config.section} config={config} data={data[config.section] ?? {}} onChange={updateField} />
          ))}
          <SaveButton saving={savingTab === 'home'} onClick={() => handleSaveTab(HOME_SECTIONS)} />
        </TabsContent>

        <TabsContent value="cours" className="space-y-4">
          {COURS_SECTIONS.map((config) => (
            <SectionCard key={config.section} config={config} data={data[config.section] ?? {}} onChange={updateField} />
          ))}
          <SaveButton saving={savingTab === 'cours'} onClick={() => handleSaveTab(COURS_SECTIONS)} />
        </TabsContent>

        <TabsContent value="commun" className="space-y-4">
          {COMMON_SECTIONS.map((config) => (
            <SectionCard key={config.section} config={config} data={data[config.section] ?? {}} onChange={updateField} />
          ))}
          <SaveButton saving={savingTab === 'commun'} onClick={() => handleSaveTab(COMMON_SECTIONS)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SaveButton({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <div className="flex justify-end">
      <Button onClick={onClick} disabled={saving} className="cursor-pointer bg-[#667467] hover:bg-[#667467]/90">
        <Save className="mr-2 size-4" />
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
    </div>
  );
}

function SectionCard({
  config,
  data,
  onChange,
}: {
  config: SectionConfig;
  data: SectionData;
  onChange: (section: string, key: string, value: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-[#667467]">{config.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {config.fields.map((field) => (
          <div key={field.key}>
            {field.type === 'image' ? (
              <ImageUploadField
                id={field.key}
                value={data[field.key] ?? ''}
                label={field.label}
                category="site-web"
                onChange={(val) => onChange(config.section, field.key, val)}
              />
            ) : field.type === 'html' ? (
              <div className="space-y-2">
                <Label>{field.label}</Label>
                <RichTextEditor
                  value={data[field.key] ?? ''}
                  onChange={(html) => onChange(config.section, field.key, html)}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor={`${config.section}-${field.key}`}>{field.label}</Label>
                <Input
                  id={`${config.section}-${field.key}`}
                  value={data[field.key] ?? ''}
                  onChange={(e) => onChange(config.section, field.key, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
