
<template>
    <div>
        <v-container fluid fill-height>
            <v-layout justify-center>
                <v-flex xs12 sm8 md8>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                    <v-toolbar-title>정보변경</v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                    <v-form>
                        <v-text-field 
                            prepend-icon="phone" 
                            name="login" 
                            label="연락처" 
                            type="text"
                            v-model="tel"
                        ></v-text-field>
                    </v-form>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="updateInfo">변경</v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid fill-height>
            <v-layout justify-center>
                <v-flex xs12 sm8 md8>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                    <v-toolbar-title>푸시 보내기</v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                    <v-form>
                        <v-textarea
                            outline
                            name="input-7-1"
                            box
                            label="푸시 메세지 입력"
                            auto-grow
                        ></v-textarea>
                    </v-form>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">보내기</v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  data: () => ({
    tel: '',
    alliance: '',
  }),
  computed: {
    id() {
        return this.$store.getters.login_info.id;
    }
  },
  mounted () {
    this.$store.commit('header_title', '설정');
    this.$store.commit('site_add_btn', false);
    this.getTel();
  },
  methods: {
    getTel () {
        this.$store.dispatch('master_info', {
            id: this.id
        }).then((res) => {
            this.tel = res.tel;
        })
    },
    updateInfo () {
        this.$store.dispatch('master_info_update', {
            id: this.id,
            tel: this.tel
        }).then((res) => {
            if (res.result == 'SUCCESS') {
                alert('정보를 변경 하였습니다');
            }
            else {
                alert('나중에 다시 시도하세요');
            }
            this.getTel();
        })
    }
  },
}
</script>

<style scoped>

</style>