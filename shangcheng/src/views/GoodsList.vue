<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>  
        <div class="container">

          <div class="filter-nav"> 
            <span class="sortby">Sort by:</span>
            <span class="def">Default</span>
            <a href="javascript:void(0)" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()" class="price">
              Price 
              <svg class="icon icon-arrow-short">
                <use xlink:href="#icon-arrow-short"></use>
              </svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>

         <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>
         
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item, index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="price">{{item.salePrice}}</div> 
                      <div class="name">{{ item.productName }}</div>

                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                    <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                </div>
              </div>
            </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
import './../assets/css/base.css'
import './../assets/css/product.css'

import NavHeader from '../components/NavHeader.vue'
import NavFooter from '../components/NavFooter.vue'
import NavBread from '../components/NavBread.vue'
import axios from 'axios'
    export default{
        data(){
            return {
              goodsList:[],
              sortFlag:false,
              page:1,
              busy:false,
              pageSize:8,
              loading:false,
              priceFilter:[
                  {
                      startPrice:'0.00',
                      endPrice:'100.00'
                  },
                  {
                    startPrice:'100.00',
                    endPrice:'500.00'
                  },
                  {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                  },
                  {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                  }
              ],
              priceChecked:"all",
              filterBy:false,
              overLayFlag:false
            }
        },
        components:{
          NavHeader,
          NavFooter,
          NavBread
        },
        mounted: function(){
          this.getGoodsList();
        },
        methods:{
          getGoodsList(flag){
            var param = {
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag?1:-1, //这里sort要和后端sort统一
              priceLevel:this.priceChecked
            }
            this.loading = true;
            axios.get("/goods/list",{params:param}).then((res)=>{

              var res=res.data;
              this.loading = false;
              if(res.status=='0'){
                if(flag){
                this.goodsList = this.goodsList.concat(res.result.list);
                if(res.result.count == 0){
                  this.busy = true;
                }
                else{
                  this.busy = false;
                }
                }
                else{
                  this.goodsList = res.result.list;
                  this.busy = false;
                }
              }else{
                this.goodsList = [];
              }
            })
          },
          sortGoods () {
            this.sortFlag = !this.sortFlag,
            this.page = 1,
            this.getGoodsList()
          },
          loadMore () {
            this.busy = true;
            setTimeout(() => {
                this.page++;
                this.getGoodsList(true);
              }, 500);
          },
          showFilterPop () {
            this.filterBy=true,
            this.overLayFlag=true
          },
          closePop(){
            this.filterBy=false,
            this.overLayFlag=false;
          },
          setPriceFilter (index) {
            this.priceChecked = index;
            this.page = 1;
            this.getGoodsList();
          },
          addCart (productId) {
            axios.post("/goods/addCart",{
              productId:productId
            }).then((res)=>{
              if(res.status == 0){
                alert('加入成功');
              }else{
                alert('msg:'+res.msg); 
              }
            })
          }
        }
    }
</script>


<style scoped="">
/*  .main .price{width: 100px;height: 100px;
    border:1px solid red;z-index: 3;
    font-size: 50px;color:#000;
  } */
</style>