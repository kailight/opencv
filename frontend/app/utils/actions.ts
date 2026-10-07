export default {
  setAll(value: Array<any> = []) {
    // console.info('setAll', this.id, value);
    if (!Array.isArray(value)) {
      console.error(`Failed to setAll for store ${this.id}, passed value is not an Array`)
    }
    const sorted = value.sort((a: any, b: any) => {
      return a.weight - b.weight
    })
    this._data = sorted
  },
  addOne(value: any) {
    this._data.push(value)
  },
  addMany(newValues: Array<any>) {
    for (let val of newValues) {
      this._data.push(val)
    }
  },
  updateOne(newValue: any) {
    if (!newValue._id) {
      throw 'No _id'
    }
    const i = this._data.findIndex(i => i._id === newValue._id)
    // this._data[i] = { ...this._data[i], ...newValue }
    this._data.splice(i,1,newValue)
    // this._data.push(newValue)
  },
  updateMany(newValues: Array<any>) {
    if (!Array.isArray(newValues)) {
      throw `updateSome: Input data should be Array`
    }
    for (let newValue of newValues) {
      const i = this._data.findIndex(v => v._id === newValue._id)
      this._data[i] = newValue
    }
  },
  replaceMany(newValues: Array<any>) {
    if (!Array.isArray(newValues)) {
      throw `replaceMany: Input data should be Array`
    }
    for (let newValue of newValues) {
      const i = this._data.findIndex(v => v._id === newValue._id)
      if (i > -1) {
        this._data.splice(i,newValue)
      } else {
        this._data.push(newValue)
      }
    }
  },
  reset() {
    this._data = []
  },
  replace(newValues: Array<any>) {
    this._data = []
    for (let val of newValues) {
      this._data.push(val)
    }
  },
  deleteOne(item: any) {
    // console.info('deleteOne', item, i);
    const i = this._data.findIndex(v => v._id === item._id)
    this._data.splice(i, 1)
  },
  deleteTwo(item: any) {
    const i = this._data.findIndex(v => v._id === item._id)
    this._data.splice(i, 1)
  },
}