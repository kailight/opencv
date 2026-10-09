import { defineStore } from 'pinia'
import type { StoreDefinition } from "pinia"

const CvStore = defineStore('cv-store', {
  state: () => ({
    _data: {
    }
  }),
  actions: {
    setCv(cvData: any) {
      console.info('cvStore.setUser()', cvData);
      this._data = cvData
    },
    update(userDataPartial:any) {
      console.info('userStore.update()', userDataPartial)
      this._data = { ...this._data, ...userDataPartial }
    },
    reset() {
      // const cv = this._data.cv
      this._data = { cv: {} }
    },
  },
  getters: {
    cv: state => state._data,
  },
  persist: true
})

export default CvStore as StoreDefinition
