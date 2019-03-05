var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seriesId: 0,
    carName: '',
    carModelName:'',
    scroll_height: '',
    pindex: 30,
    list: {},
    facadeList: [],
    facadePage: 1,
    controlList: [],
    controlPage: 1,
    seatList: [],
    seatPage: 1,
    detailsList: [],
    detailsPage: 1,
    illustrationList: [],
    illustrationPage: 1,
    show_modal:false,
    show_list:[],
    show_length:0,
    show_index:0,
    show_current:0,
    type:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var ts = this,
      id = options.id,
      carName = options.carName,
      carModelName = options.name,
      scroll_height = 0;
    wx.setNavigationBarTitle({
      title: carName + '  图片'
    });
    wx.getSystemInfo({
      success: function(res) {
        scroll_height = res.screenHeight - 44
      }
    });
    ts.setData({
      seriesId: id,
      carName: carName,
      carModelName: carModelName,
      scroll_height: scroll_height
    });
    ts.getData(id);
  },
  getData(id) {
    var ts = this,
      facadePage = ts.data.facadePage,
      controlPage = ts.data.controlPage,
      seatPage = ts.data.seatPage,
      detailsPage = ts.data.detailsPage,
      illustrationPage = ts.data.illustrationPage;
    a.post('car/get_series_images', {
      id: id
    }, function(res) {
      var list = {
        'facade': res.list.facade,
        'control': res.list.control,
        'seat': res.list.seat,
        'details': res.list.details,
        'illustration': res.list.illustration
      };
      var canList = list;
      ts.setData({
        list: list
      });
      var pindex = parseInt((facadePage - 1)) * parseInt(ts.data.pindex);
      var can_facadeList = canList.facade.slice(pindex, (pindex + parseInt(ts.data.pindex)));
      var can_controlList = canList.control.slice(pindex, (pindex + parseInt(ts.data.pindex)));
      var can_seatList = canList.seat.slice(pindex, (pindex + parseInt(ts.data.pindex)));
      var can_detailsList = canList.details.slice(pindex, (pindex + parseInt(ts.data.pindex)));
      var can_illustrationList = canList.illustration.slice(pindex, (pindex + parseInt(ts.data.pindex)));
      ts.setData({
        facadeList: can_facadeList,
        facadePage: facadePage += 1,
        controlList: can_controlList,
        controlPage: controlPage += 1,
        seatList: can_seatList,
        seatPage: seatPage += 1,
        detailsList: can_detailsList,
        detailsPage: detailsPage += 1,
        illustrationList: can_illustrationList,
        illustrationPage: illustrationPage += 1,
      });

    });
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
  scrolltolower(e) {
    var ts = this,
      type = e.currentTarget.dataset.type,
      list = ts.data.list;
    switch (type) {
      case 'facade':
        var pindex = parseInt(ts.data.facadePage - 1) * parseInt(ts.data.pindex),
          facadeList = ts.data.facadeList,
          can_facadeList = list.facade.slice(pindex, (pindex + parseInt(ts.data.pindex))),
          facadePage = parseInt(ts.data.facadePage);
        if (can_facadeList < ts.data.pindex) {
          return false;
        }
        facadeList = facadeList.concat(can_facadeList);
        ts.setData({
          facadeList: facadeList,
          facadePage: facadePage += 1
        });
        break;
      case 'control':
        var pindex = parseInt(ts.data.controlPage - 1) * parseInt(ts.data.pindex),
          controlList = ts.data.controlList,
          can_controlList = list.control.slice(pindex, (pindex + parseInt(ts.data.pindex))),
          controlPage = parseInt(ts.data.controlPage);
        if (can_controlList < ts.data.pindex) {
          return false;
        }
        controlList = controlList.concat(can_controlList);
        ts.setData({
          controlList: controlList,
          controlPage: controlPage += 1
        });
        break;
      case 'seat':
        var pindex = parseInt(ts.data.seatPage - 1) * parseInt(ts.data.pindex),
          seatList = ts.data.seatList,
          can_seatList = list.seat.slice(pindex, (pindex + parseInt(ts.data.pindex))),
          seatPage = parseInt(ts.data.seatPage);
        if (can_seatList < ts.data.pindex) {
          return false;
        }
        seatList = seatList.concat(can_seatList);
        ts.setData({
          seatList: seatList,
          seatPage: seatPage += 1
        });
        break;
      case 'details':
        var pindex = parseInt(ts.data.detailsPage - 1) * parseInt(ts.data.pindex),
          detailsList = ts.data.detailsList,
          can_detailsList = list.details.slice(pindex, (pindex + parseInt(ts.data.pindex))),
          detailsPage = parseInt(ts.data.detailsPage);
        if (can_detailsList < ts.data.pindex) {
          return false;
        }
        detailsList = detailsList.concat(can_detailsList);
        ts.setData({
          detailsList: detailsList,
          detailsPage: detailsPage += 1
        });
        break;
      case 'illustration':
        var pindex = parseInt(ts.data.illustrationPage - 1) * parseInt(ts.data.pindex),
          illustrationList = ts.data.illustrationList,
          can_illustrationList = list.illustration.slice(pindex, (pindex + parseInt(ts.data.pindex))),
          illustrationPage = parseInt(ts.data.illustrationPage);
        if (can_illustrationList < ts.data.pindex) {
          return false;
        }
        illustrationList = illustrationList.concat(can_illustrationList);
        ts.setData({
          illustrationList: illustrationList,
          illustrationPage: illustrationPage += 1
        });
        break;
    }
  },
  show_modal(e){
    var ts = this, type = e.currentTarget.dataset.type, index = e.currentTarget.dataset.index;
    switch (type) {
      case 'facade':
        ts.setData({ show_list: ts.data.list.facade, show_length: ts.data.list.facade.length, show_index: index, show_current: index});
        break;
      case 'control':
        ts.setData({ show_list: ts.data.list.control, show_length: ts.data.list.control.length, show_index: index, show_current: index });
        break;
      case 'seat':
        ts.setData({ show_list: ts.data.list.seat, show_length: ts.data.list.seat.length, show_index: index, show_current: index });
        break;
      case 'details':
        ts.setData({ show_list: ts.data.list.details, show_length: ts.data.list.details.length, show_index: index, show_current: index });
        break;
      case 'illustration':
        ts.setData({ show_list: ts.data.list.illustration, show_length: ts.data.list.illustration.length, show_index: index, show_current: index });
        break;
    }
    ts.setData({ show_modal: true, type: type});
  },
  close_modal(e){
    var ts = this;
    ts.setData({ show_modal: false });
  },
  swiper_change(e){
    var ts = this, current = e.detail.current;
    ts.setData({ show_current: current});
  },
  select_type(e){
    var ts = this, type = e.currentTarget.dataset.type;
    switch (type) {
      case 'facade':
        ts.setData({ show_list: ts.data.list.facade, show_length: ts.data.list.facade.length, show_index: 0, show_current: 0 });
        break;
      case 'control':
        ts.setData({ show_list: ts.data.list.control, show_length: ts.data.list.control.length, show_index: 0, show_current: 0});
        break;
      case 'seat':
        ts.setData({ show_list: ts.data.list.seat, show_length: ts.data.list.seat.length, show_index: 0, show_current: 0 });
        break;
      case 'details':
        ts.setData({ show_list: ts.data.list.details, show_length: ts.data.list.details.length, show_index: 0, show_current: 0 });
        break;
      case 'illustration':
        ts.setData({ show_list: ts.data.list.illustration, show_length: ts.data.list.illustration.length, show_index:0, show_current: 0});
        break;
    }
    ts.setData({type: type });
  },
})