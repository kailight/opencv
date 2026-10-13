// app/utils/store/factories.ts

import { defineStore, type StoreDefinition, storeToRefs } from 'pinia'
import actions from './actions'

export function defineCollectionStore<TItem, Id extends string = string, S extends Record<string, any> = {}, G = {}, A = {}>(
  id: Id,
  options: {
    state?: () => S
    getters?: G & ThisType<S & { _data: TItem[] } & G>
    actions?: A & ThisType<A & S & { _data: TItem[] }>
    persist?: boolean
  } = {}
) {
  return defineStore(id, {
    state: () => ({
      _data: [] as TItem[],
      ...options.state?.()
    }),
    getters: {
      data: (state: any) => state._data as TItem[],
      ...options.getters
    },
    actions: {
      ...actions,
      ...options.actions
    },
    persist: options.persist ?? false
  }) as unknown as StoreDefinition<
    Id,
    S & { _data: TItem[] },
    G & { data: (state: any) => TItem[] },
    A & typeof actions
  >
}

// --- 2. THE ENTITY STORE WRAPPER ---
export function defineEntityStore<TEntity, Id extends string = string, S extends Record<string, any> = {}, G = {}, A = {}>(
  id: Id,
  options: {
    state: () => S & { _data: Partial<TEntity> } // Allows a baseline partial fallback object
    getters?: G & ThisType<S & { _data: TEntity } & G>
    actions?: A & ThisType<A & S & { _data: TEntity } & { set(v: TEntity): void; update(p: Partial<TEntity>): void }>
    persist?: boolean
  }
) {
  return defineStore(id, {
    state: options.state,
    getters: {
      data: (state: any) => state._data as TEntity,
      ...options.getters
    },
    actions: {
      set(value: TEntity) { this._data = value },
      update(partialValue: Partial<TEntity>) { this._data = { ...this._data, ...partialValue } },
      reset() { this._data = {} as TEntity },
      ...options.actions
    },
    persist: options.persist ?? false
  }) as unknown as StoreDefinition<
    Id,
    S & { _data: TEntity },
    G & { data: (state: any) => TEntity },
    A & { set(value: TEntity): void; update(partialValue: Partial<TEntity>): void; reset(): void }
  >
}



export function useStoreRefs<TStore extends () => any>(storeDefinition: TStore) {
  // 1. Initialize the store instance
  const storeInstance = storeDefinition()

  // 2. Return the entire object converted into reactive Refs
  return storeToRefs(storeInstance) as ReturnType<typeof storeToRefs<ReturnType<TStore>>>
}