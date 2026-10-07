import { defineStore } from 'pinia'
import type { StoreDefinition } from 'pinia'
import type { Config } from '#this/shared/types'

const ConfigStore = defineStore('config-store',{
  state: () => {
    return {
      _data: {
      } as Config
    }
  },
  actions: {
    setConfig(configData: any) {
      console.info('configStore.setConfig()', configData);
      this._data = configData
    },
  },
  getters: {
    config: state => state._data as Config,
  },
  persist: true
})

export default ConfigStore as StoreDefinition