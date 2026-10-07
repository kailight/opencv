export default function useLanguages() {
  // console.info('useLanguages()');

  const languagesStore = LanguagesStore()
  const { data: languages } = storeToRefs(languagesStore)

  return {
    languages,
  }

}