export default {
  setAll(value: Array<any> = []) {
    if (!Array.isArray(value)) {
      console.error(`Failed to setAll for store ${this.id}, passed value is not an Array`)
      return
    }
    // Deep copy/spread to prevent mutating original parent/API reference arrays
    this._data = [...value].sort((a: any, b: any) => (a.weight || 0) - (b.weight || 0))
  },

  addOne(value: any) {
    this._data.push(value)
  },

  addMany(newValues: Array<any>) {
    this._data.push(...newValues) // Cleaner syntax than a for...of loop
  },

  updateOne(newValue: any) {
    if (!newValue?._id) throw 'No _id provided for updateOne'
    const i = this._data.findIndex(item => item._id === newValue._id)
    if (i > -1) {
      this._data.splice(i, 1, newValue)
    } else {
      console.warn(`Item with _id ${newValue._id} not found to update.`)
    }
  },

  updateMany(newValues: Array<any>) {
    if (!Array.isArray(newValues)) throw `updateMany: Input data should be Array`
    for (let newValue of newValues) {
      const i = this._data.findIndex(v => v._id === newValue._id)
      if (i > -1) this._data[i] = newValue
    }
  },

  replaceMany(newValues: Array<any>) {
    if (!Array.isArray(newValues)) throw `replaceMany: Input data should be Array`
    for (let newValue of newValues) {
      const i = this._data.findIndex(v => v._id === newValue._id)
      if (i > -1) {
        this._data.splice(i, 1, newValue) // Fixed: Added delete count
      } else {
        this._data.push(newValue)
      }
    }
  },

  reset() {
    this._data = []
  },

  replace(newValues: Array<any>) {
    this._data = [...newValues]
  },

  deleteOne(item: any) {
    const id = item?._id || item
    const i = this._data.findIndex(v => v._id === id)
    if (i > -1) this._data.splice(i, 1)
  }
}