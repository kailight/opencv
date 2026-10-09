const loadCvQueryText = `
{
  user(id:1) {
    id,
    nickName
    firstName
    lastName
    summary
    skillGroups {
      id
      title
      skills {
        id
        title
      }
    }
    jobs {
      title
      position
      start
      finish
      description
      city
      country
    }    
  }
}
`


export default function useCv() {

  const { graphql } = useApi()

  const cvStore = CvStore()
  const { cv } = storeToRefs(cvStore)

  const loadCv = async (userId:number = 1) => {
    console.info('useCv.loadCv()', userId)
    const data = await graphql(loadCvQueryText)
    console.info('data', data)
    cvStore.setCv(data)
    return cv
    // res.value = JSON.stringify(data, null, 2)
  }

  const user = computed( () => cv?.value?.user )
  const displayName = computed(() => user?.value?.nickName || user?.value?.firstName + ' ' + user?.value?.lastName)
  const roles = computed(() => user?.value?.roles || 'Software Engineer / Team Lead / Solutions Architect')
  const skillGroups = computed(() => user?.value?.skillGroups || [])
  const summary = computed(() => user?.value?.summary || 'No summary')
  const jobs = computed(() => user?.value?.jobs || [])

  return {
    loadCv,
    user,
    cv,
    displayName,
    roles,
    skillGroups,
    summary,
    jobs,
  }
}