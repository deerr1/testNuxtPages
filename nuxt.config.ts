// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [ '@nuxt/icon', 'vuetify-nuxt-module'],
  nitro: {
    storage: {
      files: {
        driver: 'fs',
        base: './server/static'
      }
    }
  },
  vuetify: {
    vuetifyOptions: './vuetify.config.ts'
  },
  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons'
      },
    ],
  },

  // vuetify: {
  //   moduleOptions: {
  //     /* module specific options */
  //   },
  //   vuetifyOptions: {
  //     /* vuetify options */
  //   }
  // }
})