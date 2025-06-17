import { APP_ROUTES } from '@/config/routes.config.ts';
import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { AxiosError } from '@/types/axios.ts';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/providers/toast-provider.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { AddPriceDto, useAddPrice } from '@/features/prices/api/add-price.tsx';
import { TPriceModel } from '@/features/prices/types/location.type.ts';
import PriceFormComponent from '@/features/prices/components/price-form-component.tsx';

export default function PriceNewRoute() {
  const addPriceMutation = useAddPrice();
  const navigation = useNavigate();
  const { showToast } = useToast();
  const { priceStore } = useStores();

  const handleSaveEvent = async (priceData: AddPriceDto) => {
    const payload: AddPriceDto = {
      label: priceData.label,
      number: priceData.number,
      extra: priceData.extra,
      price: priceData.price,
      info: priceData.info
    };

    addPriceMutation.mutate(payload, {
      onSuccess: () => {
        priceStore.addPrice(payload as TPriceModel);
        showToast({
          type: 'success',
          message: 'Prix ajouté avec succès !'
        });
        navigation(APP_ROUTES.admin.prices.getHref());
      },
      onError: (error: AxiosError) => {
        showToast({
          type: 'error',
          message:
            error.response?.data.message ?? "Erreur lors de l'ajout du prix."
        });
      }
    });
  };

  return (
    <LayoutAdmin
      title={'Nouveau prix'}
      breadcrumbs={[
        {
          name: 'Prix',
          href: APP_ROUTES.admin.prices.getHref(),
          current: false
        },
        { name: 'Nouveau prix', href: '', current: true }
      ]}
    >
      <PriceFormComponent onSave={handleSaveEvent} />
    </LayoutAdmin>
  );
}
