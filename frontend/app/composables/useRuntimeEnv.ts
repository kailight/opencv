export default function useRuntimeEnv() {
  const cfg = useRuntimeConfig()
  const env = cfg.public.env
  return env
}