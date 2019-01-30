// pages/shops/shops.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    mainActiveIndex: "",
    activeId: "",
    activeText: "",
    cityList: [{
      // 导航名称
      text: '广州',
      // 禁用选项
      disabled: false,
      // 该导航下所有的可选项
      children: [{
          // 名称
          text: '越秀区',
          // id，作为匹配选中状态的标识
          id: 1
        },
        {
          text: '荔湾区',
          id: 2
        },
        {
          text: '海珠区',
          id: 3
        },
        {
          text: '天河区',
          id: 4
        },
        {
          text: '白云区',
          id: 5
        },
        {
          text: '黄埔区',
          id: 6
        },
        {
          text: '番禺区',
          id: 7
        },
        {
          text: '花都区',
          id: 8
        },
        {
          text: '南沙区',
          id: 9
        },
        {
          text: '增城区',
          id: 10
        },
        {
          text: '从化区',
          id: 11
        }
      ]
    }, {
      // 导航名称
      text: '佛山',
      // 该导航下所有的可选项
      children: [{
          // 名称
        text: '禅城区',
          // id，作为匹配选中状态的标识
          id: 1
        },
        {
          text: '南海区',
          id: 2
        },
        {
          text: '顺德区',
          id: 3
        },
        {
          text: '三水区',
          id: 4
        },
        {
          text: '高明区',
          id: 5
        }
      ]
    }],
    showCity:false,
    showRec:false,
    recText:"",
    scrollHeight:0
  },
  callMe(e){
    console.log(e.target.dataset.phone)
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone 
    })
  },
  changeRec(e){
    //console.log(e.target.dataset.text)
    this.setData({
      recText: e.target.dataset.text,
      showRec: false,
    })
  },
  showRecChange(){
    this.setData({
      showRec: !this.data.showRec,
      showCity: false,
    })
  },
  showCityChange(){
    this.setData({
      showCity: !this.data.showCity,
      showRec: false,
    })
  },
  onClickNav({ detail = {} }) {
    //console.log(detail)
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  onClickItem({ detail = {} }) {
    //console.log(detail)
    this.setData({
      activeId: detail.id,
      activeText:detail.text,
      showCity: false
    });
  },
  onSearch(e) {
    console.log(e)
  },
  onCancel(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight:res.windowHeight - 120
        })
      },
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