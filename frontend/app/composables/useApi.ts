import { storeToRefs } from "pinia";

// const env = import.meta.env
// console.info('env', env);

const defaultHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json; charset=utf-8',
} as any

interface ApiError {
  code: number
  message: string
}

const { error, success, warning } = useToaster()
const requestInProgress = ref(false)

export default function useApi() {

  const { API_BASE_URI: BASE } = useEnv()

  if (!BASE) {
    console.error('API_BASE_URI is not set in .env');
  }

  const router = useRouter()

  const headers = computed( () => {

    const headers = Object.assign( {}, defaultHeaders )
    // if (accessToken) {
    //   headers['Authorization'] = 'Bearer '+ accessToken.value
    // }
    return headers
  })

  const makeUrl = (endpoint:string) => {
    return BASE+endpoint
  }


  const handleError = async (code: number, message:string) => {
    console.info('handleError',code, message);

    console.info('statusCode', code, 'typeof code', typeof code);
    console.info('errorMessage', message);

    if (code === 500) {
      requestInProgress.value = false
      if (message) {
        error(message)
        throw { code, message } as ApiError
      }
      if (!message) {
        warning('Unknown error')
        throw { code, message: 'Unknown error' } as ApiError
      }
    }

  }

  const graphql = async (query:string, data:Record<any,any>={}) => {

    console.info('query', query)
    console.info('data', data)

    const response = await fetch( BASE+'graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        data,
      }),
    });

    console.info('response', response)

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error('Failed to fetch GraphQL data');
    }

    console.info('result.data', result.data);

    return result.data;
  }


  const post = async <T>(endpoint:string, params:any=undefined ) => {
    console.info('post', makeUrl(endpoint), params, headers.value)

    let response = await useFetch( makeUrl(endpoint), { method: 'post', body: params, headers: headers.value } )
    console.info('response', response)

    const statusCode = response.error?.value?.statusCode || (response.status.value === 'success' ? 200 : 400)
    const error = response.error?.value?.data?.message
    const data = response.data.value || response.error?.value?.data

    await handleError(statusCode, error)
    requestInProgress.value = false

    // console.info('data', response.data.value);
    return data as T
  }

  const get = async <T>(endpoint:string, params:any=undefined) => {
    console.info( 'get()', makeUrl(endpoint), params, headers.value );

    let response = await useFetch( makeUrl(endpoint), { method: 'get', query: params, headers: headers.value } )
    console.info('response',response);

    const statusCode = response.error?.value?.statusCode || response.status.value as unknown as number || 200
    const error = response.error?.value?.data?.message
    const data = response.data.value || response.error?.value?.data

    await handleError(statusCode, error)
    requestInProgress.value = false

    // console.info('data',response.data.value);
    return data as T
  }

  return {
    get,
    post,
    requestInProgress,
    graphql
  }

}
