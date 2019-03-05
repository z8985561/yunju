var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery");
Page({
  data: {
    icons: t.requirejs("icons"),
    isFilterShow: !1,
    listmode: "block",
    listsort: "",
    page: 1,
    loaded: !1,
    loading: !0,
    list: [],
    params: {},
    total: 0,
    defaults: {
      keywords: ""
    },
    lastcat: "",
    fromsearch: !1,
    searchRecords: []
  },
  onLoad: function (t) {
    if (!e.isEmptyObject(t)) {
      this.setData({
        fromsearch: t.fromsearch || !1
      })
    }
    t.fromsearch || this.getList()
  },
  onShow: function () {
    this.data.fromsearch && this.setFocus()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  getList: function () {
    var t = this;
    t.setData({
      loading: !0
    }),
      t.data.params.page = t.data.page,
      a.get("/groups/category/get_list", t.data.params,
        function (a) {
          console.log(a);
          var e = {
            loading: !1,
            list:a.result.list,
            total: a.result.total
          };
          a.result.list || (a.result.list = []),
            a.result.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.result.list), a.result.list.length < a.pagesize && (e.loaded = !0)),
            t.setData(e)
        })
  },
  bindSearch: function (t) {
    t.target;
    this.setData({
      list: [],
      loading: !0,
      loaded: !1
    });
    var a = e.trim(t.detail.value),
      s = this.data.defaults;
    "" != a ? (s.keywords = a, this.setData({
      page: 1,
      params: s,
      fromsearch: !1
    }), this.getList()) : (s.keywords = "", this.setData({
      page: 1,
      params: s,
      fromsearch: !1
    }), this.getList())
  },
  bindInput: function (t) {
    var a = e.trim(t.detail.value),
      s = this.data.defaults;
    s.keywords = "",
      s.order = this.data.params.order,
      s.by = this.data.params.by,
      "" == a && (this.setData({
        page: 1,
        list: [],
        loading: !0,
        loaded: !1,
        params: s,
        fromsearch: !0
      }))
  },
  bindFocus: function (t) {
    "" == e.trim(t.detail.value) && this.setData({
      fromsearch: !0
    })
  },
  bindback: function () {
    wx.navigateBack()
  },
  bindnav: function (t) {
    var a = e.trim(t.currentTarget.dataset.text),
      s = this.data.defaults;
    s.keywords = a,
      this.setData({
        params: s,
        page: 1,
        fromsearch: !1
      }),
      this.getList(),
      this.setRecord(a)
  },
  setFocus: function () {
    var t = this;
    setTimeout(function () {
      t.setData({
        focusin: !0
      })
    },
      1e3)
  }
})