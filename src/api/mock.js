import axios from '@/http'
import { getUrl } from './path'

const mock = {

  getShopInfo () {
    return axios({
      url: getUrl(`/shopping`),
      method: 'get'
    })
  },
  registerUser (data) {
    return axios({
      url: '/user/register',
      // url: 'http://localhost:9000/user/register',
      method: 'POST',
      data
    })
  },
  loginUser (data) {
    return axios({
      url: '/user/login',
      // url: 'http://localhost:9000/user/register',
      method: 'POST',
      data
    })
  },
  getGoodsDetail (data) {
    return axios({
      url: '/goods/getGoodsDetailInfo',
      // url: 'http://localhost:9000/user/register',
      method: 'GET',
      params: data
    })
  },
  getCategoryList () {
    return axios({
      url: '/goods/getCategoryList',
      method: 'GET'
    })
  },
  getCategorySubList (data) {
    return axios({
      url: '/goods/getCategorySubListById',
      method: 'GET',
      params: data
    })
  },
  getGoodsListBySubId (data) {
    return axios({
      url: '/goods/getGoodsListByCategorySubId',
      method: 'POST',
      data: data
    })
  }
}

export default mock
