import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allinfo: [],
    amount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let data = JSON.parse(options.info)
    console.log(data
    )
    
    let amount = data.products[0].price * 1000 * data.products[0].quantity / 1000

    // 更新数据
    that.setData({
      allinfo: data,
      amount: amount
    })
    console.log(that.data.allinfo)

  },

  //已收货
  getgooods: function() {
    let that = this
    // 获取订单ID
    let id = that.data.allinfo.id
    console.log(id)
    // 获取路径
    let url = app.globalData.api + 'api/store/finishTrade'
    // 返回参数
    let data = {
      tradeId: id,
      token: wx.getStorageSync('token')
    }

    request.sendRequest(url, 'get', data, {})
      .then(function(res) {
        console.log(res)
        let code = res.data.code
        if (code == 0) {
          let url1 = '/pages/order/complete/complete'
          modals.toswitch(url1)
        } else if (code == 2000) {
          modals.showToast("订单已完成")
          let url1 = '/pages/scan/scan'
          modals.toswitch(url1)
        }

      })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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