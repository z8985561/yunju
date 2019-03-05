var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    // list:[
    //   {
    //     title:"一汽-大众奥迪",
    //     data:[
    //       {
    //         imgUrl:"/img/car-1.jpg",
    //         url:"/pages/details/details",
    //         name:"奥迪A3",
    //         price:"19.1万-25.62万",
    //         type:"紧凑型车"
    //       }
    //     ]
    //   }
    // ],
    page:1,
    brandid:0,
    reqOption:{},
    can_next_page:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ts = this, minPrice = options.minPrice, maxPrice = options.maxPrice,keyword=options.keyword;
    if (!minPrice && keyword){
      console.log(keyword);
    }
    var reqOption = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      keyword: keyword,
      page:ts.data.page
    }
    ts.setData({reqOption: reqOption});
    ts.get_list(reqOption)
    
  },
  get_list:function(data){
    var ts = this,can_next_page = ts.data.can_next_page;
    a.post('car/get_screening_list', data,function(res){
      console.log(res)
      if(res.nextPage<1){
        can_next_page = false
      }else{
        can_next_page = true;
      }
      ts.setData({ list: res.list, page: ts.data.page += 1, can_next_page: can_next_page});
    });
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
  scrolltolower(e){
    var ts = this;
    if (ts.data.can_next_page){
      ts.data.reqOption.page = ts.data.page;
      var reqOption = ts.data.reqOption;
      wx.showLoading({
        title: '加载数据中...',
        mask: true
      })
      ts.append_list(reqOption);
    }
  },
  append_list: function (data) {
    var ts = this, can_next_page = ts.data.can_next_page,list=ts.data.list;
    a.post('car/get_screening_list', data, function (res) {
      if(!res.list){
        wx.showToast({
          title: "已没有更多数据",
          icon: 'none',
          duration: 800
        });
        ts.setData({ can_next_page:false})
        return false;
      }
      list = list.concat(res.list);
      if (!res.nextPage > 0) {
        can_next_page = false
      } else {
        can_next_page = true;
      }
      ts.setData({ list: list, page: ts.data.page += 1, can_next_page: can_next_page });
      wx.hideLoading();
    });
  },
})