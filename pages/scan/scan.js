import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {},


  onLoad: function(options) {

  },

  // 扫一扫
  scanTap: function() {
    let that = this
    wx.scanCode({
      complete: (res) => {
        console.log(res)
        let result = res.result
        console.log(result)
        wx.request({
          url: result,
          data: {
            token: wx.getStorageSync('token')
          },
          success: function(res) {
            console.log(res)

            let code = res.data.code
            console.log(code)
            // 扫描订单二维码
            let flag = res.data.data.flag
            let goods = res.data.data.trade
            console.log(flag)

            // 扫描会员卡二维码
            let card = res.data.data.userCard
            // console.log(card)
            // 判断
            if (code == 0) {  //成功
              // 订单
              if (goods) {
                if (flag) {
                  let info = JSON.stringify(goods)
                  let url1 = '/pages/order/order?info='
                  modals.navigate(url1, info)
                } else {
                  let storeAddress = res.data.data.storeAddress
                  let storeName = res.data.data.storeName
                  wx.navigateTo({
                    url: '/pages/order/unfinished/unfinished?storeAddress=' + storeAddress + '&storeName=' + storeName,
                  })
                }
              }
              // 会员卡
              if (card) {
                let cardinfo = JSON.stringify(card)
                let url2 = '/pages/card/card?cardinfo='
                modals.navigate(url2, cardinfo)
              }
            }
          }
        })
      }
    })
  },




  onReady: function() {

  },


  onShow: function() {
    //是否已经用密码登陆
    let token = wx.getStorageSync('token')
    if (!token) {
      let url = '/pages/login/login'
      modals.navigate(url)
    }
  },


  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})