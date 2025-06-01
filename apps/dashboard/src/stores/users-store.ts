import { makeAutoObservable } from 'mobx';
import { getAllUsers } from '@/features/users/api/get-all-users.ts';
import { TUserModel } from '@/features/auth/types/account.ts';

export class UserStore {
  users: TUserModel[] = [];
  loaded = false;

  constructor() {
    makeAutoObservable(this);
    void this.onInit();
  }

  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  addUser(user: TUserModel) {
    this.users.push(user);
  }

  removeUserById(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async onInit() {
    const res = await getAllUsers();
    this.users = res.users;
    this.loaded = true;
  }

  updateUserByEmail(payload: TUserModel) {
    const index = this.users.findIndex(
      (event) => event.email === payload.email
    );
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...payload };
    }
  }
}
