export default function useApp() {

  const { language } = useUser()
  // const { initApp } = useRequests()

  const configStore = ConfigStore()
  const { config } = storeToRefs(configStore)

  const whatsAppLink = computed( () => {
    return 'https://wa.me/'+config.value.business?.phone.replace(/[^0-9]/g,'')
  })

  const mode:ComputedRef<'dev'|'prod'> = computed( () => {
    const cfg = useRuntimeConfig()
    const mode = cfg.public.NODE_ENV === 'development' ? 'dev' : 'prod'
    return mode
  })

  const phone = computed( () => {
    return config.value?.business?.phone
  })

  const email = computed( () => {
    return config.value?.business?.email
  })

  const address = computed( () => {
    const street = config.value?.business?.address
    const city = config.value?.business?.city
    const country = config.value?.business?.country
    let address = street
    if (city) {
      address += ', '+city
    }
    if (country) {
      address += ', '+country
    }
    return address
  })

  const id = computed( () => language?.value?.id )

  const _ = (translationOptions: Translatable, ...args: any) => {
    return computed( () => {

      let lang:'en'|'es'|'ru' = language?.value?.id || 'en'
      if (translationOptions === undefined) {
        return 'error'
      }
      if (typeof translationOptions !== 'object') {
        return translationOptions
      }

      if (typeof translationOptions === 'object') {
        if (translationOptions[lang]) {
          return translationOptions[lang]
        }
      }
      if (translationOptions['en']) {
        return translationOptions['en']
      }
      if (typeof translationOptions === 'string') {
        return translationOptions
      }
    }).value
  }

  const init = async () => {
    console.info('App.init() -- todo');
    // return initApp()
  }

  const phoneLink = computed( () => {
    const phoneLink = ref('tel:' + phone.value)
  })

  return {
    _,
    mode,
    init,
    phone,
    email,
    whatsAppLink,
    address,
    config,
  }

}