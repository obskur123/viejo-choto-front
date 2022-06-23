<template>
  <q-card bordered class="q-mb-sm card-flip-animation">
    <q-card-section>
      <div class="text-h6">Viejo Choto #{{ number }}</div>
      <div class="text-subtitle2">{{ date }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>"{{ text }}"</q-card-section>
    <q-separator v-if="possible" inset />
    <q-card-section v-if="possible">
      <q-card-actions>
        <q-btn label="Aceptar" color="primary" @click="acceptPhrase($event, id)" />
        <!--q-btn label="Eliminar" color="negative" @click="deletePhrase($event, id)" /-->
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { usePhrasesStore } from 'stores/phraseStore'

export default defineComponent({
  name: 'PhraseCard',
  props: ['text', 'number', 'date', 'possible', 'id'],
  methods: {
    ...mapActions(usePhrasesStore, ['acceptPhrase'])
  }
})
</script>

<style scoped>

  .card-flip-animation {
    animation: slideInRight;
    animation-duration: 1s;
  }

</style>
