import type { StoreDefinition } from "pinia"

export interface User {
  _id: string
  name: string
  email: string
  language: 'en' | 'es' | 'ru'
}

export default defineEntityStore<User>('user-store', {
  state: () => ({
    _data: {
      language: 'en'
    }
  }),
  getters: {
    user: state => state._data,
  },
  actions: {
    update(userDataPartial:any) {
      console.info('userStore.update()', userDataPartial)
      this._data = { ...this._data, ...userDataPartial }
    },
    reset() {
      const language = this._data.language
      this._data = { language }
    }
  },
  persist: true
}) as StoreDefinition