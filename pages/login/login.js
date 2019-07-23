import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({

  data: {
    username: '',
    password: ''

  },

  landingsubmit: function(e) {
    let that = this
    let detail = e.detail.value
    console.log(detail)

    that.setData({
      username: detail.username,
      password: detail.password
    })

    let user = that.data.username
    let pwd = that.data.password

    if (user == '') {
      modals.showToast('用户名不能为空')
    } else if (pwd == '') {
      modals.showToast('密码不能为空')
    } else {
      let url = app.globalData.api + 'api/store/storeLogin'
      let data = {
        account: user,
        password: pwd
      }

      request.sendRequest(url, 'post', data, {
          "Content-Type": "application/x-www-form-urlencoded"
        })
        .then(function(res) {
          console.log(res)
          let code = res.data.code
          if (code == 0) {
            let token = res.data.data.token
            wx.setStorageSync('token', token)
            let url = '/pages/scan/scan'
            modals.toswitch(url)
          } else if (code == 1) {
            modals.modalTwo('当前账号不存在', '登录失败', '确认', '取消')
          } else if (code == 2) {
            modals.modalTwo('账号或者密码输入错误', '登录失败', '确认', '取消')
          }
        }, function(err) {
          console.log(err)
        })
    }

  },


  onLoad: function(options) {

  },


  onReady: function() {

  },


  onShow: function() {

  },


  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },


  onReachBottom: function() {

  },


  onShareAppMessage: function() {

  }
})