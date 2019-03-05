var t = getApp(), a = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serchList:{},
    list:{},
    page:1,
    can_page:true,
    liulan:0,
    like:0,
    route:false,
    icons: t.requirejs("icons"),
    scrollviewH:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ts = this,in_storage = wx.getStorageSync('like');
    ts.setData({route:options.route})
    ts.getList({page:ts.data.page});
    // ts.setData({ list: list, serchList: serchList});
    // if (!wx.getStorageSync('userInfo')){
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //       wx.setStorage({
    //         key: 'userInfo',
    //         data: res.userInfo
    //       })
    //     }
    //   })
    // }
    wx.getSystemInfo({
      success: function(res) {
        ts.setData({
          scrollviewH: res.windowHeight - 94
        })
      },
    })
  },
  getList:function(data){
    var ts = this, i, in_storage = wx.getStorageSync('like');
    if(!data){
      data={};
    }
    a.post('movie/get_list', data, function (res) {
      if (res.error == 0) {
        var list = res.list, serchList = res.list;
        for (i in list) {
          if (in_storage.indexOf(list[i].id) != -1) {
            list[i].icon_like = true
            serchList[i].icon_like = true
          }
        } 
        ts.setData({list:list,serchList:list});
      }
    });
  },
  scrolltolower:function(){
    var ts = this, i, in_storage = wx.getStorageSync('like');
    if(ts.data.can_page){
      ts.setData({page:parseInt(ts.data.page)+1});
     var data = {page:ts.data.page};
      wx.showLoading({
        title: '加载数据中...',
        mask: true
      })
      a.post('movie/get_list', data, function (res) {
        if (res.error == 0) {
          if(res.status==0){
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 800
            });
            ts.setData({ can_page: false });
            return false;
          }
          var list = ts.data.list,serchList=ts.data.serchList;
          list = list.concat(res.list), serchList = serchList.concat(res.list);
          setTimeout(function () {
            wx.hideLoading();
            for (i in list) {
              if (in_storage.indexOf(list[i].id) != -1) {
                list[i].icon_like = true
                serchList[i].icon_like = true
              }
            } 
            ts.setData({ list: list, serchList: serchList });
          },800)
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  like:function(e){
    var set = e.currentTarget.dataset;
    var i;
    var in_storage = wx.getStorageSync('like');
    if (!in_storage){
      in_storage = [];
    }
    var list = this.data.list
    if (in_storage.indexOf(set.id)==-1){
      in_storage.push(set.id);
      wx.setStorageSync('like', in_storage);
      for(i in list){
        if(list[i].id==set.id){
          list[i].likenum = parseInt(list[i].likenum) +1;
          list[i].icon_like = true;
        }
      }
      this.setData({ list: list, serchList: list});
    }else{
      in_storage.splice(in_storage.indexOf(set.id), 1);
      for (i in list) {
        if (list[i].id == set.id) {
          list[i].likenum = parseInt(list[i].likenum) -1;
          list[i].icon_like = false;
        }
      }
      wx.setStorageSync('like', in_storage);
      this.setData({ list: list, serchList: list});
    }
  },
  search:function(e){
    var ts = this, value = e.detail.value.toUpperCase(), serchList=ts.data.serchList,i,sList={};
    if (value != ''){
      var re = new RegExp(value);
      for (i in serchList) {
        if(re.test(serchList[i].title.toUpperCase())){
          sList[i] = serchList[i];
        }
      }
      ts.setData({list:sList});
    }else{
      ts.setData({ list: serchList });
    } 
  },
  play:function(e){
    var ts = this, tap = e.currentTarget.dataset, id = tap.id, time = Date.parse(new Date()), getTime = [], gettime = wx.getStorageSync('gettime'),i,index=tap.index;
    if (!gettime){
      getTime.push({ 'id':id,'time':time});
      wx.setStorageSync('gettime', getTime);
      ts.pay_liulan({ id: id },index);
    }else{
      var cantime = true;
      for (i in gettime){
        if (gettime[i].id==tap.id){
          if (time>(gettime[i].time+(300*1000))){
            gettime[i].time = time;
            wx.setStorageSync('gettime', gettime);
            ts.pay_liulan({ id: id }, index);
          }
          cantime = false;
          break;
        }
      }
      if (cantime){
        gettime.push({ 'id': id, 'time': time });
        console.log(gettime);
        wx.setStorageSync('gettime', gettime);
        ts.pay_liulan({ id: id }, index);
      }
    }
    wx.navigateTo({
      url: "/pages/video/detail?id="+id
    });
  },
  pay_liulan:function(data,index){
    var ts=this;
    if(!data){
      var data = {};
    }
    a.post('movie/pay_liulan',data, function (res) {
      if(res.status==1){
        var list = ts.data.list;
        list[index].readnum = parseInt(list[index].readnum) + 1;
        ts.setData({list:list});
      }
    });
  },
  serchChange(e){
    console.log(e);
  },
})