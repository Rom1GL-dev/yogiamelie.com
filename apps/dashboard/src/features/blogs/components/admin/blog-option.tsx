import { observer } from 'mobx-react-lite';
import { blogStore } from '@/stores/blogs-store.tsx';

interface BlogOptionProps {
  open: boolean;
}

export const BlogOption = observer(({ open }: BlogOptionProps) => {
  if (!open) return null;
  return (
    <div className="mb-10 rounded-md border border-gray-200 bg-gray-50 p-3">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Recherche
        </label>
        <input
          type="text"
          placeholder="Rechercher un blog..."
          value={blogStore.searchTerm}
          onChange={(e) => blogStore.setSearchTerm(e.target.value)}
          className="mt-1 block w-3/5 rounded-md border border-gray-200 bg-white p-2 placeholder:text-sm lg:w-1/5"
        />
      </div>
    </div>
  );
});
