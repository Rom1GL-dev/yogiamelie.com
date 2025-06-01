import React, { PropsWithChildren } from 'react';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import { RootStore } from '@/stores/root-store';

const _rootStore = new RootStore();

const StoresCtx = React.createContext(_rootStore);

export const StoresProvider = observer(({ children }: PropsWithChildren) => {
  return <StoresCtx.Provider value={_rootStore}>{children}</StoresCtx.Provider>;
});

export const useStores = () => {
  const ctx = React.useContext(StoresCtx);

  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return ctx;
};

export const useInitialStores = (callback?: () => void | Promise<void>) => {
  const rootStore = useStores();
  const [rehydrated, setRehydrated] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await flowResult(rootStore.authStore.onInit());
      await flowResult(rootStore.eventStore.onInit());
      await flowResult(rootStore.userStore.onInit());
      await flowResult(rootStore.blogStore.onInit());
      await flowResult(rootStore.linkStore.onInit());

      setRehydrated(true);

      if (callback) {
        callback();
      }
    })();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rootStore, rehydrated };
};
