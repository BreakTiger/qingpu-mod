import modals from '../../class/methods/modal.js'
const request = require('../../class/api/htts.js')
var app = getApp()

Page({


  data: {
    name: '',
    phone: '',
    cardno: '',
    powerlist: [],
    index: '',
    allid: '',
    aa: [],
    cardid: ''
  },


  onLoad: function(options) {
    // 方法指针聚焦
    let that = this
    // 获取所有的数据
    let info = JSON.parse(options.cardinfo)
    console.log(info)
    // 筛选
    let name = info.nickname
    let phone = info.phone
    let cardno = info.cardNo
    let powerlist = info.rights
    let id = info.id
    console.log(id)
    // 循环添加数据
    for (var i = 0; i < powerlist.length; i++) {
      var lists = powerlist[i]
      lists.checked = '0'
      console.log(lists)
    }
    // 更新数据
    that.setData({
      name: name,
      phone: phone,
      cardno: cardno,
      powerlist: powerlist,
      cardid: id
    })
  },

  // 选中权限
  onCheckTap: function(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    console.log('index', index)
    that.setData({
      index: index
    })
    if (that.data.powerlist[index].checked == 0) {
      that.data.powerlist[index].checked = 1;
      that.setData({
        powerlist: that.data.powerlist
      })
    }else{
      that.data.powerlist[index].checked = 0;
      that.setData({
        powerlist: that.data.powerlist
      })
    }
   
  },




  // 提交
  onUpTap: function() {
    let that = this
    console.log(that.data.powerlist)
    let lists = that.data.powerlist
    let aa = []
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].checked == 1) {
        aa.push(lists[i].id)
        console.log(aa)
      }
    }
    let str = aa.join(',')
    that.setData({
      allid: str
    })
    console.log(that.data.allid)
    that.updata()
  },

  // 提交接口
  updata: function() {
    let that = this
    let cid = that.data.cardid
    let pid = that.data.allid
    console.log('卡片id', cid, '特权ID', pid)
    let url = app.globalData.api + 'api/card/right/record'
    let data = {
      rightId: pid,
      userCardId: cid,
      token: wx.getStorageSync('token')
    }
    request.sendRequest(url, 'get', data, {})
      .then(function(res) {
        console.log(res)
      })
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