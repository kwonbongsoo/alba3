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
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>사이트</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      class="high_sky"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>사이트등록</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn v-show="add_product_btn" color="info" @click="productAddGo">새 상품 등록</v-btn>
      <v-btn v-show="add_notice_btn" color="info" @click="noticeDetailGo">새 공지 등록</v-btn> -->
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
    progress() {
      return this.$store.getters.progress;
    },
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
  z-index: 11;
}
.high_sky_plus {
  z-index: 12;
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