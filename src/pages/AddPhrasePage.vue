<template>
  <q-page class="column q-pa-sm">
    <q-card class="col" flat bordered>
      <q-item target="_blank" clickable href="https://github.com/obskur123">
        <q-item-section>
          <q-item-label>Agregar nueva frase</q-item-label>
          <q-item-label caption>Las frases se revisan antes de ser aceptadas.</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section style="flex: 1">
          <form @submit.prevent="sendNewPhrase">
            <q-input
              filled
              label="Texto"
              v-model="text"
              type="text"
              class="q-mb-sm"
            ></q-input>
            <q-btn label="Submit" type="submit" color="primary" :disable="!(text !== '')" />
          </form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { usePhrasesStore } from 'stores/phraseStore'
import { mapActions } from 'pinia'
import { Notify } from 'quasar'

export default {
  name: 'AddPhrasePage',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    ...mapActions(usePhrasesStore, ['addNewPhrase']),
    sendNewPhrase () {
      this.addNewPhrase({ text: this.text })
        .then(() => {
          Notify.create({
            message: 'Frase agregada correctamente',
            color: 'positive',
            position: 'top',
            timeout: 2000
          })
          this.text = ''
        })
        .catch(() => {
          Notify.create({
            message: 'Error al agregar frase',
            color: 'negative',
            position: 'top',
            timeout: 2000
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
