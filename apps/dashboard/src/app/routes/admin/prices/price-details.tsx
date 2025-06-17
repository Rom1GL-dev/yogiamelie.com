import { APP_ROUTES } from '@/config/routes.config.ts';
import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { reformatForUrl } from '@/lib/utils.ts';
import { DeleteLocationDto } from '@/features/locations/api/remove-location.tsx';
import { TPriceModel } from '@/features/prices/types/location.type.ts';
import { useDeletePrice } from '@/features/prices/api/remove-price.tsx';
import { useUpdatePrice } from '@/features/prices/api/update-price.ts';
import { UpdatePriceDto } from 'api/dist/modules/price/dto/update-price.dto.ts';
import PriceFormComponent from '@/features/prices/components/price-form-component.tsx';

export default function PriceDetailsRoute() {
  const navigation = useNavigate();
  const { slug } = useParams();
  const { priceStore } = useStores();
  const { showToast } = useToast();
  const deletePriceMutation = useDeletePrice();
  const updatePriceMutation = useUpdatePrice();

  if (!slug) {
    navigation(APP_ROUTES.admin.prices.getHref());
    return null;
  }

  const price = priceStore.getPriceById(slug);

  const handleSaveLocation = async (priceData: TPriceModel) => {
    const payload: UpdatePriceDto = {
      id: priceData.id,
      label: priceData.label,
      number: priceData.number,
      extra: priceData.extra,
      price: priceData.price,
      info: priceData.info
    };

    updatePriceMutation.mutate(payload, {
      onSuccess: () => {
        priceStore.updatePriceById(payload);
        showToast({
          type: 'success',
          message: 'Prix modifié avec succès !'
        });

        navigation(
          APP_ROUTES.admin.prices.getHref() + '/' + reformatForUrl(payload.id)
        );
      },
      onError: () => {
        showToast({
          type: 'error',
          message: 'Une erreur est survenue lors de la modification du prix.'
        });
      }
    });
  };

  const handleRemoveLocation = (eventId: string) => {
    const payload: DeleteLocationDto = {
      id: eventId
    };

    deletePriceMutation.mutate(payload, {
      onSuccess: () => {
        priceStore.removePriceById(eventId);
        showToast({
          type: 'success',
          message: 'Prix supprimé avec succès !'
        });
        navigation(APP_ROUTES.admin.prices.getHref());
      },
      onError: () => {
        showToast({
          type: 'error',
          message: 'Une erreur est survenue lors de la suppression du prix.'
        });
      }
    });
  };

  return (
    <LayoutAdmin
      title={'Détail du prix'}
      breadcrumbs={[
        {
          name: 'Prix',
          href: APP_ROUTES.admin.prices.getHref(),
          current: false
        },
        { name: 'Détail du prix', href: '', current: true }
      ]}
    >
      <PriceFormComponent
        onSave={handleSaveLocation}
        priceProps={price}
        onDelete={handleRemoveLocation}
      />
    </LayoutAdmin>
  );
}
