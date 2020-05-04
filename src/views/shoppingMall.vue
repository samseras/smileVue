<template>
  <div class="shoppingMall">
    <div class="search-bar">
      <van-row>
        <van-col span="3">
        <span class="location-icon">
          <svg-icon icon-class="position"></svg-icon>
        </span>
        </van-col>
        <van-col span="16">
          <van-field v-model="search" placeholder="请输入用户名" class="search-input"/>
        </van-col>
        <van-col span="5">
          <van-button round type="info" size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img :src="banner.imageUrl" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!---->
    <div class="type-bar">
      <div  v-for="(cate,index) in category" :key="index" >
        <img :src="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArrays" :key="index">
          <img :src="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--swiper-->
    <!--<swiper :options="swiperOption">-->
      <!--<swiper-slide v-for="(item, index) in recommendGoods" :key="index">-->
        <!--<div class="recommend-item">-->
          <!--<img :src="item.image" width="80%" />-->
          <!--<div>{{item.goodsName}}</div>-->
          <!--<div>￥{{item.price}} (￥{{item.mallPrice}})</div>-->
        <!--</div>-->
      <!--</swiper-slide>-->
    <!--</swiper>-->
    <floorComponent :floorData="floor1"  :floorTitle="floorName.floor1"></floorComponent>
  </div>
</template>

<script>
import api from '@/api'
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from './floorComponent'
import goodsInfo from './goodsInfoComponents'
export default {
  name: 'shoppingMall',
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination'
        }
      },
      search: '',
      bannerPicArray: [
        {imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587491649662&di=d379d7452338ae6fb394081c2e6d3536&imgtype=0&src=http%3A%2F%2Ffile.mumayi.com%2Fforum%2F201401%2F16%2F231735cfp4046206r4i705.jpg'},
        {imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587491649662&di=46202cac4b5ba9cb2fae5e4c91a98331&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fca1349540923dd54ea2076a4d309b3de9d8248af.jpg'},
        {imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587491649661&di=811b13fab197a9f9852e8b66549af97e&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F1018%2Fc221ab7183ad65312b24fad3a0d76186.jpg'}
      ],
      category: [],
      adBanner: {},
      bannerPicArrays: [],
      recommendGoods: [],
      floor1: [],
      floorName: {}
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      api.mock.getShopInfo().then(res => {
        console.log(res)
        if (res.data) {
          this.category = res.data.category
          // this.adBanner = res.data.adBanner
          this.bannerPicArrays = res.data.slides
          this.recommendGoods = res.data.recommend
          this.floor1 = res.data.floor1
          this.floorName = res.data.floorName
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .search-bar{
    height: .8rem;
    line-height: .8rem;
    background: pink;
  }
  .location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
  }
  .search-input{
    border-bottom: 1px solid #eee;
    background: transparent;
  }
  .swiper-area{
    width:100%;
    clear:both;
    max-height: 4rem;
    overflow: hidden;
  }
  .type-bar{
    background-color: #fff;
    margin:0 .05rem .05rem .05rem;
    border-radius: .3rem;
    font-size:14px;
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
  }
  .type-bar div{
    padding: .05rem;
    font-size: 12px;
    text-align: center;
  }
</style>
