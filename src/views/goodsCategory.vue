<template>
  <div class="categoryList">
    <van-row>
      <van-col span="6">
        <div id="leftNav">
          <ul>
            <li @click="clickCategory(index, item)" :class="{categoryActive:categoryIndex==index}"  v-for="(item,index) in category" :key="index">
              {{item.MALL_CATEGORY_NAME}}
            </li>
          </ul>
        </div>
      </van-col>
      <van-col span="18">
        <div class="tabCategorySub">
          <van-tabs v-model="active" @click="onClickCategorySub">
            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

            </van-tab>
          </van-tabs>
        </div>
        <div id="list-div">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsDetail(item.ID)">
                <div class="list-item-img"><img :src="item.IMAGE1" width="100%"/></div>
                <div class="list-item-text">
                  <div>{{item.NAME}}</div>
                  <div class="">￥{{item.ORI_PRICE}}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'goodsCategory',
  data () {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: '',
      list: [],
      loading: false, // 上拉加载使用
      finished: false, // 下拉加载是否没有数据了
      isRefresh: false,
      page: 1,
      goodList: [],
      categorySubId: ''
    }
  },
  created () {
    this.getCategory()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 + 'px'
  },
  methods: {
    goGoodsDetail (id) {
      this.$router.push({name: 'Goods', params: {goodsId: id}})
    },
    getCategory () {
      api.mock.getCategoryList().then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.category = res.data
          this.getCategorySubListById(this.category[0].ID)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击大类的方法
    clickCategory (index, item) {
      this.categoryIndex = index
      this.finished = false
      this.goodList = []
      this.getCategorySubListById(item.ID)
    },
    getCategorySubListById (id) {
      api.mock.getCategorySubList({categoryId: id}).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.categorySub = res.data
          this.active = 0
          this.categorySubId = this.categorySub[0].ID
          this.onRefresh()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getGoodsList () {
      if (this.refreshing) {
        this.goodList = []
        this.refreshing = false
      }
      let params = {
        categorySubId: this.categorySubId,
        page: this.page,
        limit: 10
      }
      api.mock.getGoodsListBySubId(params).then(res => {
        if (res.code === 200 && res.data.length) {
          this.page++
          this.goodList = this.goodList.concat(res.data)
        } else {
          this.finished = true
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击子类获取商品信息
    onClickCategorySub (index, title) {
      this.categorySubId = this.categorySub[index].ID
      this.finished = false
      this.goodList = []
      this.page = 1
      this.onLoad()
    },
    onLoad () {
      setTimeout(() => {
        console.log(this.page, 'page')
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodsList()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      }, 500)
    }
  }
}
</script>

<style scoped>
  #leftNav ul li {
    line-height: .6rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.14rem;
    text-align: center;
  }
  .categoryActive{
    background-color: #fff;
  }
  .list-item{
    display: flex;
    flex-direction: row;
    font-size:0.14rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
  }
  #list-div{
    overflow: scroll;
  }
  .list-item-img{
    flex:8;
  }
  .list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
  }
</style>
