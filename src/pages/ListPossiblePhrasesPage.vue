<template>
  <q-page class="column q-pa-sm">
      <template v-for="(phrase, index) in possiblePhrases" :key="index">
        <phrase-card :text="phrase.text" :id="phrase.id" :possible="true" />
      </template>
  </q-page>
</template>

<script>
import { usePhrasesStore } from 'stores/phraseStore'
import { mapActions, mapState } from 'pinia'
import PhraseCard from 'components/PhraseCard'

export default {
  name: 'ListPossiblePhrasesPage',
  components: { PhraseCard },
  computed: {
    ...mapState(usePhrasesStore, ['possiblePhrases'])
  },
  methods: {
    ...mapActions(usePhrasesStore, ['fetchPossiblePhrases'])
  },
  mounted () {
    this.fetchPossiblePhrases()
  }
}
</script>

<style scoped>

</style>
