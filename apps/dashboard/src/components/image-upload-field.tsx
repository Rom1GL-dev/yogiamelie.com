import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type Props = {
  id: string;
  value: string;
  label: string;
  category: string;
  onChange: (value: string) => void;
};

export function ImageUploadField({ id, value, label, category, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', id);
      const res = await api.post(`/v1/images/upload/${category}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.fileName);
      toast.success('Image uploadée.');
    } catch {
      toast.error("Erreur lors de l'upload.");
    } finally {
      setUploading(false);
    }
  };

  const imgSrc = value ? `${API_URL}/v1/images/${category}/${value}` : '';

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="mr-2 size-4" />
          {uploading ? 'Upload...' : 'Choisir une image'}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      </div>
      {value && (
        <div className="relative mt-2 inline-block">
          <img
            src={imgSrc}
            alt={label}
            className="h-40 max-w-xs rounded-lg border object-cover shadow-sm"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
          >
            <X className="size-3" />
          </button>
          <p className="text-muted-foreground mt-1 truncate text-xs">{value}</p>
        </div>
      )}
    </div>
  );
}
