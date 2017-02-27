<template>
<div class="page preview js_show" style="background-color:#eee">

 <div class="page__bd" v-for="j in jokes">
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" style="align-items:flex-start;">
            <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" v-bind:src="j.author[0].avatar||'/static/default-img.png'" alt=""> 
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{j.author[0].nickname||j.author[0].username}}</h4>
                
                <p class="weui-media-box__desc">{{j.createdate | getYMD }}</p>
                <p class="weui-media-box__desc">
                   <article class="weui-article" style="padding-left:0px;">
                     <section>
                       <div v-html="j.content"> </div>
                     </section>
                   </article>
                </p>
            </div>
        </a>
    </div>



  <div class="weui-form-preview__ft">
    <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" @click='joke(j,1)'><font><font>乐 {{j.joke}}</font></font></button>
    <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" @click='joke(j,0)'><font><font>冷 {{j.unjoke}}</font></font></button>
  </div>
 
  </div>
  </br>
 </div> <!--page__bd-->
 
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
    this.getJokes()
  },

  methods: {
    joke (j, jo) {
      if (jo) {
        j.joke += 1
        axios.get(this.jokeurl + '/' + j._id + '?joke=1')
      } else {
        j.unjoke += 1
        axios.get(this.jokeurl + '/' + j._id + '?unjoke=1')
      }
    },
    getJokes () {
      var that = this
      axios.get(this.jokeurl + '?sort=-_id')
        .then(function (response) {
          that.jokes = response.data
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
