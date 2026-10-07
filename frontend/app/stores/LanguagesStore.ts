import { defineStore } from 'pinia'
import type { StoreDefinition } from 'pinia'

import actions from "~/utils/actions";

const LanguagesStore = defineStore('languages-store',{
  state: () => {
    return {
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
    }
  },
  actions,
  getters: {
    data: state => state._data,
  },
  persist: true
})

export default LanguagesStore as StoreDefinition