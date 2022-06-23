<template>
  <q-item clickable v-ripple :to=to active-class="remove-active">
    <q-item-section avatar>
      <q-icon :name=icon />
    </q-item-section>
    <q-item-section>{{label}}</q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DrawerItem',
  props: ['icon', 'label', 'to']
})
</script>

<style scoped>

</style>
