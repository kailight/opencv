import { defineStore } from 'pinia'
import type { StoreDefinition } from "pinia"

const UserStore = defineStore('user-store', {
  state: () => ({
    _data: {
      language: 'en'
    }
  }),
  actions: {
    setUser(userData: any) {
      console.info('userStore.setUser()', userData);
      this._data = userData
    },
    update(userDataPartial:any) {
      console.info('userStore.update()', userDataPartial)
      this._data = { ...this._data, ...userDataPartial }
    },
    reset() {
      const language = this._data.language
      this._data = { language }
    },
  },
  getters: {
    user: state => state._data,
  },
  persist: true
})

export default UserStore as StoreDefinition
