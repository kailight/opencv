const updateJobQuery = (`
mutation UpdateJob($id: Int!, $input: UpdateJobInput!) {
  updateJob(id: $id, input: $input) {
    id
    description
  }
}
`)



export default function useJob(id:number) {
  // console.info('useJob()', id)

  const { warning, success } = useToaster()
  const { graphql } = useApi()
  const { jobs } = useCv()
  const job = computed( () => {
    const job = jobs.value.find( j => j.id === id )
    return job
  })


  const update = async (id:number, description:string='') => {
    console.info('useJob.update()', id, description)
    const data = await graphql(updateJobQuery, { description }, id)
    if (data.updateJob) {
      success('Changes saved')
    }
    console.info('data', data)
    return data
    // warning('ToDo')
  }

  return {
    job,
    update
  }
}