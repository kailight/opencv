import { storeToRefs } from 'pinia'

export default function useUser () {

  // const languageCookie = useCookie('language')
  const router = useRouter()
  const userStore = UserStore()
  // const { IMAGES_BASE_URI } = useEnv()
  const { user } = storeToRefs(userStore)
  const { get, post, graphql } = useApi()
  const { languages } = useLanguages()

  const { warning, error, success } = useToaster()

  // singleton
  const viewerSettings = useState('viewer-settings', () => ({
    showSummary: true,
    showSkills: true,
    showExperience: true
  }))

  const signIn = async ({ email, password } : { email: string, password: string }) => {
    console.info('user.signIn()', email, password )

    if (!email) {
      error('Please enter email')
      return false
    }
    if (!password) {
      error('Please enter password')
      return false
    }

    if (isAuthorized.value) {
      if (user.value.email === email) {
        // warning('You are already authorized as '+user.value.role)
        return true
      }
    }

    const login = email
    // .replace(/[^.+@.+\..+]/g,'')

    // const headers = useRequestHeaders(['cookie'])
    console.info('todo')
    // return await loginUser( { login, password } )
  }

  const updateAccount = async () => {
    console.info('user.updateAccount()');
    return true
  }

  const signOut = async () => {
    console.info('user.signOut()')

    userStore.reset()
    // const { setItems } = useCart()
    // setItems( { _id: undefined } )
    success('Bye!')
    router.push('/')

  }

  const isAuthorized = computed(() => {
    return !!user.value?.role
  })

  const isDeveloper = computed(() => {
    return user.value?.role === 'developer'
  })

  const isAdminOrDeveloper = computed(() => {
    return user.value?.role === 'admin' || user.value?.role === 'developer'
  })

  const isAdmin = computed(() => {
    return user.value?.role === 'admin' || user.value?.role === 'developer'
  })

  globalThis.ql = async () => {
    const email = "kailight2020@gmail.com"
    const password = "..."
    const loggedIn = await signIn({ email, password } )
    if (loggedIn) {
      success('Quickly logged in as Alexander')
    }

  }

  const signUp = () => {
    console.info('user.signUp()');
  }

  const avatarUrl = computed(() => {
    // console.info('user.value', user.value.avatar);
    // console.info('IMAGES_BASE_URI', IMAGES_BASE_URI);
    return user.value.avatarUrl || '/avatar-anonymous.png'
  })

  const dropAdminPrivileges = () => {
    console.info('user.dropAdminPrivileges()');

    userStore.setUser({
      ...user.value,
      role: undefined
    })

    success('Bye admin privileges!')
    router.push('/')

  }

  // const setCurrency = (currency:string) => {
  //   userStore.update( { currency } )
  // }

  const name = computed( () => {
    return user.value.firstName+' '+ (user.value.lastName || '')
  })

  const language = computed( {
    get() {
      // const language_id = languageCookie.value || user?.value?.language || 'en'
      const language_id = user?.value?.language || 'en'
      const language = languages?.value?.find( (l:Language) => l.id === language_id )
      return language
    },
    set(language) {
      // languageCookie.value = language
      userStore.update( { language } )
    }
  })

  const phone = computed( {
    get() {
      return user.value?.phone || ''
    },
    set(phone) {
      userStore.update( { phone } )
    }
  })

  const address = computed( {
    get() {
      return user.value?.address || {}
    },
    set(address) {
      userStore.update( { address } )
    }
  })

  const role = computed(() => {
    return user.value?.role
  })

  return {
    user,
    name,
    signIn,
    isAuthorized,
    isAdmin,
    isAdminOrDeveloper,
    isDeveloper,
    signOut,
    avatarUrl,
    updateAccount,
    signUp,
    dropAdminPrivileges,
    language,
    phone,
    address,
    role,
    viewerSettings,
  }

}

