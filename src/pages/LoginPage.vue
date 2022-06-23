<template>
  <q-page class="column q-pa-sm">
    <q-card class="col" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label>Iniciar sesión</q-item-label>
          <q-item-label caption>
            Solo para administradores.
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section style="flex: 1">
          <form
          @submit.prevent="sendForm">
            <q-input
              filled
              label="Nombre de usuario"
              v-model="form.username"
              type="text"
              class="q-mb-sm"
            />
            <q-input
              filled
              label="Contraseña"
              v-model="form.password"
              type="password"
              class="q-mb-sm"
            />
            <q-select filled class="q-mb-sm" v-model="form.role" :options="options" label="Filled" />
            <q-btn label="Submit" type="submit" color="primary"  />
          </form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapStores } from 'pinia'
import { useAdminStore } from 'stores/adminStore'
import { Notify } from 'quasar'

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        username: '',
        password: '',
        role: ''
      },
      options: ['admin', 'super_admin']
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  methods: {
    ...mapActions(useAdminStore, ['submitUser']),
    async sendForm () {
      try {
        const response = await this.submitUser(this.form)
        const newState = {
          isLoggedIn: true,
          role: this.form.role,
          username: this.form.username
        }
        this.adminStore.$patch(newState)
        this.$q.localStorage.set('token', response.data.token)
        this.$q.localStorage.set('session', newState)
        await this.$router.push('/')

        Notify.create({
          message: 'Usuario logeado correctamente',
          color: 'positive',
          position: 'top',
          timeout: 2000
        })
      } catch (e) {
        Notify.create({
          message: 'Error al iniciar sesión',
          color: 'negative',
          position: 'top',
          timeout: 2000
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
