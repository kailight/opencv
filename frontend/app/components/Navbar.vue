<script lang="ts" setup>
const route = useRoute()
// const { warning } = useToaster()
// const { _, phone, whatsAppLink } = useApp()

const router = useRouter()

const {
  user, signOut, isAdmin, isAuthorized, avatarUrl, language
} = useUser()

const solidBar = ref(false)

const { get } = useApi()

// const avatarStyle = computed( () => {
//   return { backgroundImage: `url(${avatarUrl.value})` }
// })

// const profileLink = computed( () => {
//   if (!isAdmin.value) return '/account'
// })

const closeLanguageSelect = () => {
  console.info('closeLanguageSelect()');
  languageSelect.value = false
}
const languageSelect = ref(false)
const breakpoint = useBreakpoint()

const name = computed( () => {
  user.value.firstName
})
</script>

<template lang="pug">
  #navbar(:class="breakpoint")
    nav
      NuxtLink(to="/").logo-wrapper
        // img.logo(src="/logo.png")
        .site-title
          span.line1 Open
          span.line2 CV
      // .menu-wrapper
        // NuxtLink(to="/#menu") Menu
        // a(href="#" @click.prevent="test") Test google
      .stuff-area
        // NuxtLink(:to="profileLink" v-if="isAuthorized").user-profile-area
          .name-wrapper {{name}}
          .avatar-wrapper
            .avatar(:style="avatarStyle")
        .language-area(@click.prevent="languageSelect = true")
          Icon.flag-icon(:name="language.icon")
          .language {{language.title}}
          // Icon.chevron-icon(name="mdi:earth")
          LanguageSelect(v-if="languageSelect" @click.stop @close="closeLanguageSelect")
        //.currency-area(@click.prevent="currencySelect = true")
          .currency {{currency?.title[language.id]}}
            Icon.chevron-icon(name="mdi:chevron-down")
          CurrencySelect(v-if="currencySelect" @click.stop @close="closeCurrencySelect")
        // .phone-area
          a.pseudo-button(:href="whatsAppLink" target="_blank")
            Icon.phone-icon(name="mdi:phone")
            img(src="/whatsapp-icon.webp" width="16" height="16" style="display: inline-block; margin-right: 0.2rem")
            div.phone(@click="whatsAppLink") {{phone}}
  // .subnav(v-if="breakpoint === 'mobile'")
    .language-area(@click.prevent="languageSelect = true")
      // Icon.chevron-icon(name="mdi:earth")
      .language {{language.title}}
      Icon.flag-icon(:name="language.icon")
      LanguageSelect(v-if="languageSelect" @click.stop @close="closeLanguageSelect")
    // .currency-area(@click.prevent="currencySelect = true")
      .currency {{currency?.title[language.id]}}
        Icon.chevron-icon(name="mdi:chevron-down")
      CurrencySelect(v-if="currencySelect" @click.stop @close="closeCurrencySelect")
    .currency-area
</template>

<style lang="stylus" scoped>
#navbar
  position fixed
  background-color #333
  top 0
  left 0
  z-index 999
  display flex
  justify-content center
  align-items center
  height 5rem
  transition background-color 0.5s
  width 100%
  nav
    width calc( 100vw - 4rem )
    display grid
    justify-content center
    align-items center
    margin 1rem 1rem
    grid-template-columns repeat(12, 1fr)
    grid-template-rows 1fr
    .logo-wrapper
      grid-column 1/3
      display flex
      justify-content flex-start
      align-items center
      gap 1rem
      font-size 1.6rem
      color #fff
      font-weight 300
      span
        color #ccc
    .site-title
      color #fff0e0 !important
      white-space pre-line
      display flex
      gap 0.5rem
      font-family var(--font-family-heading)
      .line2
        font-weight 500
        letter-spacing 0.05rem
    .menu-wrapper
      grid-column 3/7
      display grid
      grid-template-columns auto
      grid-template-rows 1fr
      justify-content flex-start
      align-items center
      grid-auto-flow column
      a
        font-size 1rem
        padding 1rem
        color #ddd
        text-decoration none
        &:hover
          color #fff
    .stuff-area
      grid-column 5/-1
      display flex
      gap 2rem
      justify-content flex-end
      align-items center

  .logout-wrapper
    display flex
    justify-content flex-end
    color #ddd
    &:hover
      color #fff
    a
      font-size 0.8rem
      color inherit

  .user-profile-area
    display flex
    justify-content flex-end
    align-items center
    gap 1rem

  .language-area
    display flex
    align-items center
    color #eee
    .language
      display flex
      gap 0.5rem
      cursor pointer
      position relative
      align-items center
    .flag-icon
      width 2rem
      margin-right 0.5rem
      aspect-ratio 4/3
    .chevron-icon
      font-size 1.2rem

  .currency-area
    color #eee
    .currency
      display flex
      gap 0.5rem
      cursor pointer
      position relative
    .chevron-icon
      font-size 1.2rem

  .phone-area
    grid-column 2/3
  .pseudo-button
    color #eee
    background rgba(0,0,0,0.1)
    border-radius 1.5rem
    display flex
    justify-content center
    align-items center
    gap 0.5rem
    font-size 0.9rem
    padding 0.35rem 1rem
    cursor pointer
    border 1px solid var(--color-success)
    white-space nowrap
    &:hover
      color #fff
        border 1px solid var(--color-success-hl)
    .phone-icon
      font-size 1.25rem
      color var(--color-success)

  .name-wrapper
    color #eee
    &:hover
      color #fff
    a
      color inherit

  .logo
    height 2.6rem
    aspect-ratio 24/26

  .vivid
    color #6c6
    &:hover
      color #7d7

  .avatar-wrapper
    .avatar
      width 3rem
      height 3rem
      border-radius 50%
      background-size cover
      background-position center
      background-repeat no-repeat


#navbar.mobile
  nav
    width 100%
    font-size 1rem
    height 3rem
    padding 0
    margin 0.5rem 1rem
    .site-title
      font-size 1.4rem
      gap 0.2rem
    .logo-wrapper
      grid-column 1/5
      gap 0.5rem
    .logo
      width 1.6rem
      height 1.6rem

    .pseudo-button
      font-size 0.8rem
      border-radius 1.4rem
      gap 0.6rem
      padding 0.4rem 0.6rem

    .phone-icon
      font-size 1rem

    .language-area
      font-size 0.8rem
      visibility hidden
      .flag-icon
        margin-left 0.4rem
    .currency-area
      font-size 0.8rem
      visibility hidden

    .menu-wrapper
      grid-column 5/5


.subnav
  display flex
  padding 0 1rem
  justify-content space-between
  align-items center
  z-index 555
  position fixed
  top 5rem
  height 3rem
  min-width 100%
  color #fff
  .language-area
    display flex
    gap 0.5rem
    align-items center
    cursor pointer
    font-size 0.9rem
  .chevron-icon
    color #aaa
  .currency-area
    font-size 0.9rem
    display flex
    justify-content flex-end
    align-items center


@media print
  #navbar
    display none !important
  .subnav
    display none !important

</style>

<style language="css">
.subnav {
  --background-color-sub: color-mix(in srgb, var(--background-color-alt) 75%, #fff);
  background-color: var(--background-color-sub);
}
</style>