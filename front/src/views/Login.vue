<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                <v-toolbar-title>로그인</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                <v-form>
                    <v-text-field 
                        prepend-icon="person" 
                        name="login" 
                        label="아이디" 
                        v-model="id" 
                        type="text"
                        @keyup.enter="$refs.pwd.focus()"
                    ></v-text-field>
                    <v-text-field ref="pwd" id="password" prepend-icon="lock" name="password" v-model="password" label="비밀번호" type="password" @keyup.13="login"></v-text-field>
                </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">로그인</v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      id: '',
      password: ''
    }),
    computed: {
        login_info () {
            return this.$store.getters.login_info;
        }
    },
    mounted () {
        this.$store.commit('header_title', '로그인');
        this.$store.commit('site_add_btn', false);
        if (this.login_info.is_login) {
            this.$router.push('/');
            // this.id = this.login.id;
            // this.password = this.login.password;
            // this.auto_login();
        }
    },
    methods: {
        login () {
            if (this.id == '') {
                alert('아이디를 입력하세요');
            }
            else if (this.password == '') {
                alert('비밀번호를 입력하세요');
            }
            else if (this.id.length > 30 || this.id.length < 8) {
                alert('아이디가 너무 길거나 짧습니다');
            }
            else if (this.password > 30 || this.password.length < 6) {
                alert('비밀번호가 너무 깁니다');
            }
            else {
                let params = {
                    id: this.id,
                    password: this.password
                }
                this.$store.dispatch('login', params).then((res) => {
                    if (res.result == 'SUCCESS') {
                        this.$store.commit('login_info', {
                            id: params.id,
                            password: params.password,
                            is_login: true
                        });
                        alert('로그인 성공');
                        this.$router.push('/');
                    }
                    else {
                        alert('로그인 실패. 다시 시도해주세요');
                        this.password = '';
                    }
                })
            }
            
        },
        // auto_login () {
        //     let params = {
        //         id: this.id,
        //         password: this.password
        //     }
        //     this.$store.dispatch('login', params).then((res) => {
        //         if (res.result == 'SUCCESS') {
        //             this.$store.commit('login_info', {
        //                 id: params.id,
        //                 password: params.password,
        //                 is_login: true
        //             });
        //             this.$router.push('/');
        //         }
        //         else {
        //             this.password = '';
        //             let params = {
        //                 id: '',
        //                 password: '',
        //                 is_login: false
        //             }
        //             this.$store.commit('login_info', params);
        //         }
        //     })
        // }
    }
  }
</script>