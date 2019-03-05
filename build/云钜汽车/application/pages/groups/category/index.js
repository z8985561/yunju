var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui");
Page({
  data: {
    icons: t.requirejs("icons"),
    show:1,
    list: [],
    page: 1,
    code: !1,
    cancel: e.cancelArray,
    cancelindex: 0
  },

  onLoad: function (options) {
    var t=this;
    t.setData({
      options:options
    }),
      t.get_list();
  },
  get_list:function(){
    var t = this;
    e.get("groups/category/get_list", t.data.options, function (e) {
      console.log(e);
      1 == e.status ? (t.setData({
        loading: !1,
        show: !0,
        total: e.result.total,
        empty: !0
      }), e.result.list.length > 0 && t.setData({
        page: t.data.page + 1,
        list: t.data.list.concat(e.result.list)
      }), e.result.list.length < e.pagesize && t.setData({
        loaded: !0
      })) : a.toast("出错了", "loading")
    }, this.data.show)
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },

  onHide: function () {
  
  },

 
  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
    this.data.loaded || this.data.list.length >= this.data.total || this.get_list()
  },

  onShareAppMessage: function () {
  
  }
})