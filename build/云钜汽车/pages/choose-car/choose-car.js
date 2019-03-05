var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alpha: '',
    windowHeight: '',
    apHeight: 0,
    addBg: false,
    route: false,
    icons: t.requirejs("icons"),
    is_show_banner:false,
    bannerList:[],
  },
  //点击
  handlerAlphaTap(e) {
    let {
      ap
    } = e.target.dataset;
    this.setData({
      alpha: ap
    });
  },
  //滑动
  handlerMove(e) {
    let {
      list
    } = this.data;
    this.setData({
      addBg: true
    });
    let rY = e.touches[0].clientY - 60; //竖向滑动的距离
    if (rY >= 0) {
      let index = Math.ceil((rY - this.apHeight) / this.apHeight);
      if (0 <= index < list.length) {
        let nonwAp = list[index];
        nonwAp && this.setData({
          alpha: nonwAp.alphabet
        });
      }
    }
  },
  //滑动结束
  handlerEnd(e) {
    this.setData({
      addBg: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({title:"选车"});
    var ts=this,res = wx.getSystemInfoSync();
    this.apHeight = (res.windowHeight - 60) * 0.8 / 26;
    this.setData({
      windowHeight: res.windowHeight,
      route: options.route
    })
    var list = wx.getStorageSync('list');
    ts.is_hot();
    ts.get_addGroup();
    if(!list){
      a.post('car/get_list', {}, function (res) {
        wx.setStorageSync('list', res.list);
        ts.setData({ list: res.list });
      });
    }else{
      ts.setData({ list: list });
    }
    
  },
  get_addGroup(){
    var ts=this;
    a.post('car/get_addGroup', {}, function (res) {
      if(res.is_show==1){
        ts.setData({
          is_show:true,
          bannerList:res.list
        });
      }
    });
  },
  is_hot:function(){
    var ts=this;
    var list = wx.getStorageSync('brandList');
    if(!list){
      a.post('car/get_hot', {}, function (res) {
        wx.setStorageSync('brandList', res.list);
        ts.setData({ brandList: res.list });
      });
    }else{
      ts.setData({ brandList: list });
    }
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
    var ts = this,recordList = wx.getStorageSync('recordList');
    if (recordList){
      ts.setData({ recordList: recordList });
    }
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