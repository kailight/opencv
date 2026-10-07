let weight = 0
const messages:Ref<Array<any>> = ref([])
const defaultDuration = 3

const useToaster = () => {

  const increaseWeight = () => { weight++ }

  const removeToast = (weight:number) => {
    const messageIndex = messages.value.findIndex( (message) => {
      return message.weight === weight
    })
    messages.value.splice(messageIndex,1)
  }

  const setHideTimeout = (weight:number, duration:number|null=null) => {
    if (duration === null)
      duration = defaultDuration

    if (duration === 0)
      return

    setTimeout( () => {
      removeToast(weight)
    }, duration * 1000 )
  }


  const success = (_message:string="Message", duration:number|null|undefined=null) => {
    messages.value.push({
      weight,
      type: 'success',
      content: _message,
      class: 'success',
    })
    setHideTimeout(weight, duration)
    increaseWeight()
  }

  const warning = (_message:string="Warning", duration=null) => {
    messages.value.push({
      weight,
      type: 'warning',
      content: _message,
      class: 'warning',
    })
    setHideTimeout(weight, duration)
    increaseWeight()
  }

  const error = (_message:string="Error", duration=null) => {
    console.info('toaster.error',_message);

    messages.value.push({
      weight,
      type: 'error',
      content: _message,
      class: 'error',
    })
    setHideTimeout(weight, duration)
    increaseWeight()
    // console.info('messages.value',messages.value)
  }


  return { error, warning, success, messages, removeToast }
}

export default useToaster
