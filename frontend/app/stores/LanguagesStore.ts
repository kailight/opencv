// app/shared/features/languages/languages.store.ts
import type { StoreDefinition } from 'pinia'

export default defineCollectionStore('languages-store', {
  state: () => ({
    _data: [
      {
        id: 'en',
        icon: 'flag:gb-4x3',
        title: 'English',
      },
      {
        id: 'es',
        icon: 'flag:es-4x3',
        title: 'Español',
      },
      {
        id: 'ru',
        icon: 'flag:ru-4x3',
        title: 'Русский',
      },
    ],
  }),
  persist: true
}) as StoreDefinition