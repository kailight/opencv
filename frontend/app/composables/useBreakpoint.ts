import { useNuxtApp } from '#app'
let $viewport:any = undefined

const useBreakpoint = () => {
  const nuxtApp = useNuxtApp()
  $viewport = nuxtApp.$viewport

  const breakpoint = computed( () => {
    if (!$viewport) {
      return 'mobile'
    }
    if ($viewport?.isLessThan('mobile')) {
      return 'smobile'
    }
    if ($viewport?.isLessThan('tablet')) {
      return 'mobile'
    }
    if ($viewport?.isLessThan('desktopMedium')) {
      return 'tablet'
    }
    return 'desktop'
  })

  return breakpoint
}

export default useBreakpoint