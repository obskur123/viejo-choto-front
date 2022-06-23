<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>viejo-choto</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <drawer-item v-for="item in items" :key="item.label" :to="item.to" :icon="item.icon" :label="item.label"/>
        <drawer-item v-if="!adminStore.isLoggedIn" to="/login" icon="login" label="Ingresar"></drawer-item>
        <drawer-item v-if="adminStore.role === 'super_admin' || adminStore.role == 'admin'" to="/new-phrases" label="Nuevas frases" icon="new_releases"></drawer-item>
        <drawer-item v-if="adminStore.role === 'super_admin' || adminStore.role == 'admin'" icon="logout" label="Salir" @click="destroySession"></drawer-item>
        <drawer-item v-if="adminStore.role == 'super_admin'" icon="admin_panel_settings" label="Administración"/>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="dark_mode" :color="this.$q.dark.isActive ? 'primary' : 'dark'" @click="toggleDarkMode"/>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAdminStore } from 'stores/adminStore'
import DrawerItem from 'components/DrawerItem'
import { Notify } from 'quasar'

const items = [
  { icon: 'home', label: 'Frase del día', to: '/' },
  { icon: 'info', label: 'Información', to: '/info' },
  { icon: 'add', label: 'Agregar', to: '/add' }
]

export default defineComponent({
  name: 'MainLayout',
  components: { DrawerItem },
  data () {
    return {
      leftDrawerOpen: false,
      items
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    toggleDarkMode () {
      this.$q.dark.toggle()
      this.$q.localStorage.set('dark_mode', this.$q.dark.isActive)
    },
    destroySession () {
      this.adminStore.$reset()
      this.$q.localStorage.remove('token')
      this.$q.localStorage.remove('session')
      Notify.create({
        message: 'Sesión cerrada',
        color: 'positive',
        position: 'top'
      })
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  }
})
</script>
