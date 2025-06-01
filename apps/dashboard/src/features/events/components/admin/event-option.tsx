import { observer } from "mobx-react-lite";
import {useStores} from "@/providers/stores-provider.tsx";

interface EventOptionProps {
    open: boolean;
}

export const EventOption = observer(({ open }: EventOptionProps) => {
    if (!open) return null;

    const { eventStore } = useStores()

    return (
        <div className="bg-gray-50 rounded-md border border-gray-200 p-3 mb-10">
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Recherche</label>
                <input
                    type="text"
                    placeholder="Rechercher un évènement..."
                    value={eventStore.searchTerm}
                    onChange={(e) => eventStore.setSearchTerm(e.target.value)}
                    className="mt-1 p-2 placeholder:text-sm border border-gray-200 block  w-3/5 lg:w-1/5 rounded-md bg-white"
                />
            </div>
        </div>
    );
});
