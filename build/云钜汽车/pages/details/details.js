var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
import Toast from '../../vant-ui/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    productItem:{},
    show: false,
    carItem:{},
    carTypeList: [],
    vendor_name:'',
    collect:'star-o',
    seriesId:0,
    carName:'',
  },
  toggleActionSheet() {
    this.setData({
      show: !this.data.show
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    var ts=this,item = event.detail, collect = wx.getStorageSync('collect'),i;
    if (typeof item.imgUrl == 'string') {
      var arr = [];
      arr.push(item.imgUrl)
      item.imgUrl = arr;
    }
    if (collect){
      for (i in collect){
        if (item.id==collect[i].id){
          ts.setData({ collect:'star'});
          break;
        }else{
          ts.setData({ collect: 'star-o' });
        }
      }
    }
    this.setData({
      show: false,
      carItem: item
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var ts = this, id = options.id,name=options.name,imgUrl=options.imgUrl;
    ts.appendAfter(options);
    ts.getdata(id);
    wx.setNavigationBarTitle({title:"车辆详情"})
    this.setData({
      productItem: this.data.carTypeList[0],
      vendor_name: name,
      seriesId:id,
      carName:options.carName
    })
  },
  getdata:function(id){
    var ts = this,collect = wx.getStorageSync('collect'), i;
    if(id){
      a.post('car/get_carModel_list',{id:id},function(res){
        if (typeof res.list[0].imgUrl == 'string') {
          var arr = [];
          arr.push(res.list[0].imgUrl)
          res.list[0].imgUrl = arr;
        }
        if (collect) {
          for (i in collect) {
            if (res.list[0].id == collect[i].id) {
              ts.setData({ collect: 'star' });
            }
          }
        }
        ts.setData({
          carTypeList:res.list,
          carItem: res.list[0]
          });

      });
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

  },
  appendAfter(options){
    var ts = this, recordList = wx.getStorageSync('recordList'),list=[],i;
    if (!recordList){
      list[0] = options;
      wx.setStorageSync('recordList',list);
    }else{
      if (recordList.length>=10){
        for (i in recordList){
          if(options.id==recordList[i].id){
            recordList.splice(i,1);
            recordList.unshift(options);
            recordList.pop();
            wx.setStorageSync('recordList', recordList);
            return false;
          }
        };
        recordList.unshift(options);
        recordList.pop();
        wx.setStorageSync('recordList', recordList);
      }else{
        for (i in recordList) {
          if (options.id == recordList[i].id) {
            recordList.splice(i, 1);
            recordList.unshift(options);
            wx.setStorageSync('recordList', recordList);
            return false;
          }
        };
        recordList.unshift(options);
        wx.setStorageSync('recordList', recordList);
      }
    }
  },
  collect(e){
    var ts = this, item = e.currentTarget.dataset.item, collect = wx.getStorageSync('collect'), i;
    if (collect) {
      for (i in collect) {
        if (item.id == collect[i].id) {   
          ts.setData({ collect: 'star-o' });
          collect.splice(i,1);
          wx.setStorageSync('collect', collect);
          Toast({ 'message': '取消收藏','duration':1000});
          return false;
        }
      }
      collect.push(item);
      wx.setStorageSync('collect', collect);
      ts.setData({ collect: 'star' });
      Toast({ 'message': '收藏成功', 'duration': 1000 });
    }else{
      var collect = [];
      collect.push(item);
      wx.setStorageSync('collect', collect);
      ts.setData({ collect: 'star' });
      Toast({ 'message': '收藏成功', 'duration': 1000 });
    }
  },
  depreciate(){
    Toast({ 'message': '提交成功,该车有降价会通知', 'duration': 1000 });
  },
  check_allImg(e){
    var ts = this;
    wx.navigateTo({
      url:'/pages/details/img?id='+ts.data.seriesId+'&carName='+ts.data.carName+'&name='+ts.data.carItem.name
    })
  },
})