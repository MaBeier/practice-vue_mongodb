// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'


import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'


Vue.config.productionTip = false
Vue.use(infiniteScroll)
/* eslint-disable no-new */
Vue.use(VueLazyLoad,{
	loading:"/static/loading-svg/loading-bars.svg"
})

new Vue({
  el: '#app',
  router,
  // mounted(){
  //   this.checkLogin();
  //   this.getCartCount();
  // },
  // methods:{
  //   checkLogin(){
  //     axios.get("users/checkLogin").then(res=> {
  //       var res = res.data;
  //       if (res.status == "0") {
  //         this.$store.commit("updateUserInfo", res.result);
  //       }else{
  //         if(this.$route.path!="/goods"){
  //           this.$router.push("/goods");
  //         }
  //       }
  //     });
  //   },
  //   getCartCount(){
  //     axios.get("users/getCartCount").then(res=>{
  //       var res = res.data;
  //       if(res.status=="0"){
  //         this.$store.commit("updateCartCount",res.result);
  //       }
  //     });
  //   }
  // },
  template: '<App/>',
  components: { App }
})
