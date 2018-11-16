
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
                        <v-textarea
                            outline
                            v-model="tel"
                            maxLength="1000"
                            name="input-7-1"
                            box
                            label="연락처"
                            auto-grow
                        ></v-textarea>
                        <v-textarea
                            outline
                            v-model="alliance_msg"
                            maxLength="1000"
                            name="input-7-1"
                            box
                            label="제휴 정보"
                            auto-grow
                        ></v-textarea>
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
                            v-model="msg"
                            maxLength="50"
                            name="input-7-1"
                            box
                            label="푸시 메세지 입력"
                            auto-grow
                        ></v-textarea>
                    </v-form>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="push_all">보내기</v-btn>
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
    msg: '',
    alliance_msg: '',
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
            this.alliance_msg = res.alliance_msg;
        })
    },
    updateInfo () {
        this.$store.dispatch('master_info_update', {
            id: this.id,
            tel: this.tel,
            alliance_msg: this.alliance_msg
        }).then((res) => {
            if (res.result == 'SUCCESS') {
                alert('정보를 변경 하였습니다');
            }
            else {
                alert('나중에 다시 시도하세요');
            }
            this.getTel();
        })
    },

    push_all () {
        if (this.msg === '') {
            alert('푸시 보낼 메세지를 입력하세요');
        }
        else {
            this.$store.dispatch('push_all', {
                msg: this.msg
            }).then((res) => {
                console.log(res);
                this.msg = '';
                alert('푸시를 성공적으로 보냈습니다');
                // if (res.result === 'SUCCESS') {
                //     alert('푸시를 성공적으로 보냈습니다');
                //     this.msg = '';
                // }
                // else {
                //     alert('잠시 후 시도 해주세요');
                // }
            });
        }
        
    }
  },
}
</script>

<style scoped>

</style>