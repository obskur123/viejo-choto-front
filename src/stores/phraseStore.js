import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'

export const usePhrasesStore = defineStore('phrase', {
  state: () => ({
    phrases: [],
    possiblePhrases: []
  }),
  actions: {
    fetchPhrasesById () {
      this.$reset()
      const localStoragePhrases = LocalStorage.getItem('phrases')
      if (localStoragePhrases.length !== 0) {
        localStoragePhrases.reverse().forEach(phrase => {
          api.get('/phrases/' + phrase.id).then(response => {
            const randomViejoChotoNumber = Math.floor(Math.random() * 10000)
            this.phrases.push({
              number: randomViejoChotoNumber,
              text: response.data.text,
              date: phrase.date
            })
          })
        })
      }
    },
    getRandomPhrase () {
      api.get('/random-phrase').then(response => {
        const localStoragePhrases = LocalStorage.getItem('phrases')
        localStoragePhrases.push({ id: response.data.id, date: new Date().toLocaleDateString() })
        LocalStorage.set('phrases', localStoragePhrases)
      })
    },
    hasOneDayPassed () {
      const date = new Date().toLocaleDateString()
      if (LocalStorage.getItem('actual_date') === date) {
        return false
      }
      LocalStorage.set('actual_date', date)
      return true
    },
    runOncePerDay (callback) {
      if (!this.hasOneDayPassed()) return false
      callback()
    },
    addNewPhrase (form) {
      return api.post('/possible-phrase', form)
    },
    fetchPossiblePhrases () {
      api.get('/get-possible-phrases', {
        headers: {
          Authorization: 'Bearer ' + LocalStorage.getItem('token')
        }
      })
        .then(response => {
          this.possiblePhrases = response.data.phrases
        })
    },
    acceptPhrase (event, id) {
      api.get('/accept-phrase/' + id, {
        headers: {
          Authorization: 'Bearer ' + LocalStorage.getItem('token')
        }
      }).then(() => {
        this.fetchPossiblePhrases()
      })
    }
  }
})
