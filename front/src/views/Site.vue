
<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="sites"
      content-tag="v-layout"
      hide-actions
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs6
        sm4
        md3
        lg2
      >
        <v-card class="img_div">
          <v-card-title>
            <v-img 
              @click="goSiteInfo(props.item)"
              :aspect-ratio="1"
              :src="props.item.icon_url
            "/>
            <v-icon @click="deleteSite(props.item)" class="clear_icon">clear</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile @click="goSiteInfo(props.item)">
              <v-list-tile-content>{{ props.item.site_name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="goSiteInfo(props.item)">
              <v-list-tile-content>{{ props.item.site_url }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data: () => ({

  }),
  mounted () {
    this.$store.dispatch('l_site', []);
    this.$store.commit('site_detail', {
      icon_name: '',
      icon_url: '',
      new_browser_yn: '',
      no: 0,
      site_name: '',
      site_url: ''
    });
  },
  computed: {
    sites () {
      return this.$store.getters.sites;
    }
  },
  methods: {
    goSiteInfo (site) {
      this.$store.commit('site_detail', site);
      this.$router.push('/siteInfo');
    },
    deleteSite (site) {

      let params = {
        imgOriName: site.icon_name,
        no: site.no,
      }
      this.$store.commit('d_site', params);


      params = {
        title: '사이트 삭제',
        desc: '정말 이 사이트를 삭제 하시겠습니까?',
        dialog: true
      }

      this.$store.commit('dialog', params);

      
      
    },
  }
}
</script>

<style scoped>
.img_div {
  position: relative;
}
.clear_icon {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 3rem;
  font-weight: bold;
  color: red;
  z-index: 20;
}
</style>