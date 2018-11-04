
<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <div class="img_div">
                <img :src="imageUrl" height="150" v-if="imageUrl"/>
                <v-icon @click="clearImg" v-if="imageUrl" class="clear_icon">clear</v-icon>
              </div>
              <v-text-field label="아이콘 업로드" color="info" @click='pickFile' v-model='imageName' prepend-icon='attach_file' readonly></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
            </v-flex>
            <v-flex xs12 md6 lg4>
              <v-text-field v-model="siteName" label="사이트이름" maxLength="30" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6 lg4>
              <v-text-field v-model="siteUrl" label="사이트URL" maxLength="100" required></v-text-field>
            </v-flex>
            <v-switch v-model="newBrowserYn" :label="newBrowserYn == 'Y' ? '새 창' : '현재 창'" value='Y'></v-switch>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="site_detail.no === 0" color="blue darken-1" @click="clear">Clear</v-btn>
        <v-btn color="blue darken-1" @click="submit"> {{ site_detail.no === 0 ? '등록' : '수정'}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    imageName: '',
    imageFile: '',
    imageUrl: '',
    siteName: '',
    siteUrl: '',
    newBrowserYn: 'N',
    imgOriName: '',
  }),
  computed: {
    site_detail() {
      let detail = this.$store.getters.site_detail
      this.imageUrl = detail.icon_url;
      this.imageName = detail.icon_name;
      this.siteName = detail.site_name;
      this.siteUrl = detail.site_url;
      this.imgOriName = detail.icon_name;
      this.newBrowserYn = detail.new_browser_yn;
      return detail;
    },
  },
  mounted () {
    this.$store.commit('header_title', '사이트 상세정보');
    this.$store.commit('progress', false);
    this.$store.commit('site_add_btn', false);
  },
  methods: {
    clearImg() {
      this.$refs.image.value = null
      this.imageName = ''
      this.imageFile = ''
      this.imageUrl = ''
    },
    pickFile () {
      this.$refs.image.click ()
    },
    onFilePicked (e) {
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        if(this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    clear () {
      this.$refs.image.value = null
      this.imageName = ''
      this.imageFile = ''
      this.imageUrl = ''
      this.siteName = ''
      this.siteUrl = ''
      this.newBrowserYn = 'N'
    },
    submit () {
      if (this.siteName == '') {
        alert('사이트이름을 입력하세요');
      }
      else if (this.siteName.length > 30) {
        alert('사이트이름이 너무 깁니다');
      }
      else if (this.siteUrl == '') {
        alert('사이트 URL을 입력하세요');
      }
      else if (this.siteUrl.length > 100) {
        alert('사이트 URL이 너무 깁니다');
      }
      else if (this.imageFile.size > 1000000) {
        alert('이미지 사이즈가 큽니다. 1M 이하로 업로드하세요');
      }
      else if (this.site_detail.no > 0 && this.imageName == '') {
        alert('이미지를 선택해주세요.')
      }
      else if (this.imageName == '') {
        alert('이미지를 선택해주세요.');
      }
      else {
        let params = {
          imageName: this.imageName,
          imageUrl: this.imageUrl,
          siteName: this.siteName,
          siteUrl: this.siteUrl,
          newBrowserYn: this.newBrowserYn
        }

        console.log(params);

        let formData = new FormData();

        formData.append('file', this.imageFile);
        formData.append('imageName', this.imageName);
        formData.append('imageUrl', this.imageUrl);
        formData.append('siteName', this.siteName);
        formData.append('siteUrl', this.siteUrl);
        formData.append('newBrowserYn', this.newBrowserYn);
        formData.append('imgOriName', this.imgOriName);
        formData.append('no', this.site_detail.no);
        this.$store.commit('progress', true);
        if (this.site_detail.no != 0) {
          this.$store.dispatch('update', formData).then((res) => {
            this.$store.commit('progress', false);
            console.log(res);
            if (res.result == 'SUCCESS') {
              alert('사이트 정보가 변경되었습니다');
            }
            else {
              alert('잠시 후 다시 시도해주세요');
            }
            this.$router.push('/');
          })
        }
        else {
          this.$store.dispatch('add', formData).then((res) => {
            this.$store.commit('progress', false);
            if (res.result == 'SUCCESS') {
              alert('사이트가 등록되었습니다');
            }
            else {
              alert('잠시 후 다시 시도해주세요');
            }
            this.$router.push('/');
          })
        }
      }
    },
  },
}
</script>

<style scoped>
.img_div {
  position: relative;
  display: inline-block;
}
.clear_icon {
  position:absolute;
  right: 0;
  font-size: 30px;
  color: red;
  font-weight: bold;
  z-index: 2;
}

</style>