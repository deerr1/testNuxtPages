<template>
  <div>
    <!-- <v-select
      v-model="theme"
      :items="listGovna"
      item-text="name"
      item-value="themeFile"
      label="Compact"
    >
    <template #item="{ item, props }">
      <h1 v-if="item.value?.header"> {{ item.value.header }}</h1>
      <v-list-item v-else v-bind="props" :title="item.value" :value="item.value" />
    </template>
    </v-select> -->
    <Icon name="icon:arrow-top" />
    <v-select :items="listGovna" menu-icon="$dropdown" >
      
    </v-select>
    <v-list :items="listGovna">

    </v-list>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
  {{ data.data }}
  {{ val }}
  <v-tabs v-model = "val">
    <v-tab v-for="item in routes" :key="item.value" :text="item.title" :to="item.to"></v-tab>

  </v-tabs>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script setup>
const data = await useFetch('/company/1')
// const theme = ref(null)
// const listGovna = [
//   { header: "Dark Themes" },
//   { name: "Night Bright", themeFile: "night-bright.css" },
//   { name: "Dracula", themeFile: "dracula.css" },
//   { header: "Light Themes" },
//   { name: "Day Bright", themeFile: "day-bright.css" },
//   { name: "Blue", themeFile: "blue.css" },
// ];
  const val = ref('1')
  const routes = [
    {title: 'index', value: '1', to: '/'},
    {title: 'govno', value: '2', to: '/govno'}
  ]

  const listGovna = [

    {title: 'govno3', props: {disabled:true}},
    {title: 'govno', value: 'ne', props: {type: 'subheader'} },
    {title: 'govno1', value: 'ne1', }
  ]
</script>

<style scoped></style>
