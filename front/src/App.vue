<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      hide-overlay
      fixed
      app
      class="high_sky_plus"
    >
      <v-list dense>
        <v-list-tile @click="siteListGo">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>사이트 리스트</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      class="high_sky"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title> {{ header_title }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-show="site_add_btn" color="info" @click="siteInfoGo">새 사이트 등록</v-btn>
    </v-toolbar>
    <v-content>
      <router-view class="router_view"/>
    </v-content>
    <v-progress-circular
      v-if="progress"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <div v-if="progress" class="click_disabled"></div>
    <popup/>
  </v-app>
</template>

<script>
import popup from './components/popup';
export default {
  name: 'App', 
  components: {
    popup
  },   
  data () {
    return {
      drawer: false,
      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    progress () {
      return this.$store.getters.progress;
    },
    site_add_btn () {
      return this.$store.getters.site_add_btn;
    },
    header_title () {
      return this.$store.getters.header_title;
    }
  },
  mounted () {
    this.$store.commit('d_site', {
      imgOriName: '',
      no: '',
    });

    this.$store.commit('dialog', {
      title: '',
      desc: '',
      dialog: false
    });
  },
  methods: {
    siteInfoGo () {
      this.$router.push('/siteInfo');
    },
    siteListGo () {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.router_view {
  margin: 20px 0;
}
.v-toolbar {
  z-index: 3;
}
.v-navigation-drawer {
  z-index: 4;
}
.v-progress-circular {
  position: fixed  !important;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.high_sky {
  z-index: 21;
}
.high_sky_plus {
  z-index: 22;
}
.v-badge__badge {
  top: 0!important;
  right: 30px!important;
}
.click_disabled {
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 998;
}
</style>