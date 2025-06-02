import { TUserModel } from '@/features/auth/types/account';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { login } from '@/features/auth/api/login.ts';
import { logout } from '@/features/auth/api/logout.ts';
import { getAccount } from '@/features/auth/api/get-account.ts';

export class AuthStore {
  loaded = false;
  account: TUserModel | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    void this.onInit();
  }

  get isConnected() {
    return !!this.account;
  }

  async login(email: string, password: string) {
    const { account } = await login({
      email,
      password
    });

    runInAction(() => {
      this.account = observable.object(account);
    });
  }

  async logout() {
    await logout();
    this.account = null;
  }

  async onInit() {
    const res = await getAccount();
    this.account = res.account;
    this.loaded = true;
  }
}
