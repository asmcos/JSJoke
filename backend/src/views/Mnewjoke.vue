<template>
<div class="page input js_show" style="background-color:#eee">
   <div class="page__bd">

     <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="这一刻的笑话..." rows="3" id="content"></textarea>
                </div>
            </div>

      </div>


     <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
                <div class="weui-cell__bd">
                    <div class="weui-uploader">
                        <div class="weui-uploader__hd">
                            <p class="weui-uploader__title">图片上传</p>
                            <div class="weui-uploader__info">{{done}}/{{total}}</div>
                        </div>
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles" v-for="m in images">
                                <li class="weui-uploader__file" v-bind:style="'background-image:url('+m+')'"></li>
                            </ul>
                            <form enctype="multipart/form-data" method="POST" lang="zh-cn" id="uploadfile">
                            <div class="weui-uploader__input-box">
                                <input id="uploaderInput" class="weui-uploader__input" type="file" name="upload" accept="image/*" @change="Onchange">
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

      </div>

     <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="send" id="showTooltips">确定</a>
     </div>
   </div> <!-- page__bd -->

</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      images: [],
      total: 0,
      done: 0,
      uploadurl: '/uploader/uploadimage?responseType=json',
      jokeurl: '/jokes'
    }
  },
  created () {
  },

  methods: {
    Onchange () {
      /* eslint-disable */
      var formElement = document.querySelector("#uploadfile");
      var formData = new FormData(formElement);
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      var that = this
      this.total += 1
      axios.post(this.uploadurl, formData, config)
        .then(function (response) {
          console.log(response.data)
          that.done += 1
          that.images.push(response.data.url)
        })
      /* eslint-enable */
    },
    send () {
      /* eslint-disable */
      var content1 = $('#content').val();
      /* eslint-enable */
      var that = this
      var i
      for (i = 0; i < this.images.length; i++) {
        content1 += '<img src="' + this.images[i] + '" >'
      }
      axios.post(this.jokeurl, {
        content: content1
      })
        .then(function (response) {
          that.$router.push('/m')
        })
    }
  },
  components: {
  }
}
</script>
<style>
div > img {width:50%;}
a {text-decoration:none;}
</style>
