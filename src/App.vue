<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions, mapStores } from 'pinia'
import { usePhrasesStore } from 'stores/phraseStore'
import { useAdminStore } from 'stores/adminStore'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapStores(useAdminStore),
    ...mapState(usePhrasesStore, ['phrases'])
  },
  methods: {
    ...mapActions(usePhrasesStore, ['fetchPhrasesById', 'getRandomPhrase', 'hasOneDayPassed', 'runOncePerDay'])
  },
  created () {
    if (this.$q.localStorage.getItem('session')) {
      const session = this.$q.localStorage.getItem('session')
      this.adminStore.$patch({
        isLoggedIn: true,
        role: session.role,
        username: session.username
      })
    }
    if (!this.$q.localStorage.getItem('actual_date') || !this.$q.localStorage.getItem('phrases')) {
      const date = new Date()
      this.$q.localStorage.set('actual_date', date.setDate(date.getDate() - 1).toLocaleString())
      this.$q.localStorage.set('phrases', [])
    }
    if (this.$q.localStorage.getItem('dark_mode')) {
      this.$q.dark.set(this.$q.localStorage.getItem('dark_mode'))
    }
    this.runOncePerDay(this.getRandomPhrase)
    this.fetchPhrasesById()
  }
})
</script>
