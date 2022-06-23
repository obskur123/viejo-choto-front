<template>
<q-page class="column q-pa-sm">
  <q-pull-to-refresh
    @refresh="refresh">
    <template v-for="(phrase, index) in phrases" :key="index">
      <phrase-card :number="phrase.number" :text="phrase.text" :date="phrase.date" :possible="false"/>
    </template>
  </q-pull-to-refresh>
</q-page>
</template>

<script>
import PhraseCard from 'components/PhraseCard'
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { usePhrasesStore } from 'stores/phraseStore'

export default defineComponent({
  name: 'HomePage',
  components: { PhraseCard },
  computed: {
    ...mapState(usePhrasesStore, ['phrases'])
  },
  methods: {
    ...mapActions(usePhrasesStore, ['fetchPhrasesById', 'getRandomPhrase', 'hasOneDayPassed', 'runOncePerDay']),
    refresh (done) {
      this.runOncePerDay(this.getRandomPhrase)
      this.fetchPhrasesById()
      done()
    }
  }
})
</script>

<style scoped>

</style>
