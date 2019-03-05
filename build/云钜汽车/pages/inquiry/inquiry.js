var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchid:0,
    can_submit:true,
    cart: {
      id: 1,
      imgUrl: "https://qiche.kemanduo.cc/attachment//car_show_image/A/奥迪/一汽-大众奥迪/奥迪A6L.jpg",
      title: "2019 款 E 200L"
    },
    merchantList: [
      {
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      },
      {
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      }, {
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      }, {
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      }, {
        name: "4S 锦星行",
        adress: "广州市天河区科林路18号（广电运通对面）",
        price: "37.38",//价格
        preferential: "6.20",//直降
        distance: "4.6",//距离
        salesArea: "售本省"//销售区域
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ts=this,merchid=options.merchid,carid=options.carid;
    ts.setData({
      merchid:merchid,
      carid:carid
    });
    a.post('car/get_inquiry',{merchid:merchid,carid:carid},function(res){
      if(res.status>0){
        ts.setData({ can_submit:false});
      }
    });
  },
  formSubmit(e){
    var ts=this,detail=e.detail.value,name=detail.name,phone=detail.phone,address=detail.address;
    var str=/^1\d{10}$/;
    if (ts.data.can_submit){
      if (!name) {
        ts.showToast('姓名不能为空');
        return false;
      }
      if (!phone) {
        ts.showToast('手机号不能为空');
        return false;
      }
      if (!str.test(phone)) {
        ts.showToast('手机号非法');
        return false;
      }
      if (!address) {
        ts.showToast('城市不能为空');
        return false;
      }
      var data = {
        name: name,
        phone: phone,
        address: address,
        merchid: ts.data.merchid,
        carid: ts.data.cart.id
      };
      a.post('car/inquiry', data, function (res) {
        if (res.id > 0) {
          wx.showToast({
            title: '恭喜您,提交成功,工作人员会在48小时内联系您,请保持通话顺畅!',
            icon: 'none',
            duration: 1500
          });
          setTimeout(function () {
            wx.navigateBack({ delta: 1 });
          }, 1000);
        }
      });
    }else{
      ts.showToast('您已提交过表单,请耐心等待!');
    }
  },
  // 多选事件
  onChange(e){
    var merchantList = this.data.merchantList;
    var index = e.currentTarget.dataset.index
    if (!merchantList[index].checked){
      merchantList[index].checked = true;
    }else{
      merchantList[index].checked = false;
    }
    this.setData({
      merchantList: merchantList
    })
  },
  showToast(title){
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 800
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

  }
})