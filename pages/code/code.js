import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Length: 8, //输入框个数
    isFocus: true,
    Value: "", //输入的内容
    ispassword: false //是否密文显示 true为密文， false为明文
  },

  Focus: function(e) {  
    var that = this;  
    console.log(e.detail.value);  
    var inputValue = e.detail.value;  
    that.setData({   
      Value: inputValue,
    }) 
  },

   Tap: function() {  
    var that = this;  
    that.setData({   
      isFocus: true,
    }) 
  },

  tocode: function(e) {  
    let that = this
    let code = that.data.Value
    let url = app.globalData.api + 'api/trade/receive/goods'
    let data = {
      goodsCode: code,
      token: wx.getStorageSync('token')
    }
    request.sendRequest(url, 'get', data, {})
      .then(function(res) {
        console.log(res.data.data)
        let flag = res.data.data.flag
        if (flag) {
          let info = JSON.stringify(res.data.data.trade)
          let url1 = '/pages/order/order?info='
          modals.navigate(url1, info)

        } else {
          let storeAddress = res.data.data.storeAddress
          let storeName = res.data.data.storeName
          wx.navigateTo({
            url: '/pages/order/unfinished/unfinished?storeAddress=' + storeAddress + '&storeName=' + storeName,
          })
        }


      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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