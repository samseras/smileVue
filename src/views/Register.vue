<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="register-button">
        <van-button type="primary" size="large"  native-type="submit" @click="registerUserHandler" :loading="showLoading">马上注册</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      username: '',
      password: '',
      showLoading: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    registerUserHandler () {
      if (this.username === '' || this.password === '') return
      let params = {
        userName: this.username,
        password: this.password
      }
      this.showLoading = true
      api.mock.registerUser(params).then(res => {
        this.showLoading = false
        console.log(res, '成功')
        if (res.code === 1) {
          this.$notify('注册成功')
          this.$router.push('/')
        } else {
          this.$notify('注册失败，用户名重复')
        }
      }).catch(err => {
        this.showLoading = false
        console.log(err, '注册失败')
      })
    }
  }
}
</script>

<style scoped>
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .register-button{
    padding-top:10px;
  }
</style>
