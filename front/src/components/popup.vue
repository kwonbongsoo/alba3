
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog.dialog" persistent max-width="290">
      <v-card class="popup_index">
        <v-card-title class="headline"> {{ dialog.title }} </v-card-title>
        <v-card-text> {{ dialog.desc }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="dialogClose" flat>취소</v-btn>
          <v-btn v-if="dialog.title === '사이트 삭제'" @click="deleteSite" color="green darken-1" flat>삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    
  }),
  computed: {
    dialog () {
      return this.$store.getters.dialog;
    },
    d_site () {
      return this.$store.getters.d_site;
    }
  },
  mounted () {
    
  },
  methods: {
    dialogClose () {
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
    deleteSite () {
      let params = {
        imgOriName: this.d_site.imgOriName,
        no: this.d_site.no
      }
      // console.log(params)
      this.$store.dispatch('d_site', params).then((res) => {
        console.log(res.affectedRows);
        if (res.affectedRows > 0) {
          this.$store.dispatch('l_site', '');
          alert('사이트를 삭제하였습니다.');
        }
        this.$store.commit('dialog', {
        title: '',
        desc: '',
        dialog: false
      });
      })
    }
  }
}
</script>

<style scoped>
.popup_index {
  z-index: 30;
}
</style>