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
      jokes: null,
      jokeurl: '/jokes'
    }
  },
  created () {
  },

  methods: {
    send () {
      /* eslint-disable */      
      var content1 = $('#content').val();
      /* eslint-enable */
      var that = this
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
