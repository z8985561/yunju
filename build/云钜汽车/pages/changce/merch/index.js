//作者QQ:1026770372
var t = getApp(),
a = t.requirejs("core"),
e = t.requirejs("jquery");
Page({
  data: {
    cates: [],
    cateid: 0,
    page: 1,
    loading: false,
    loaded: false,
    list: [],
    keyword:'',
    disopt:[],
    range:0,
    approot: t.globalData.approot
  },
  onLoad: function (z) {
    var b = this;
    z.cateid && b.setData({
      cateid: z.cateid
    });
      //this.getCate(),
      //获取本人坐标
    //t.removeCache("mypos");
    var mypos = t.getCache("mypos");
    if (!mypos) {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          //console.log(res);
          t.setCache("mypos", { lat: res.latitude, lng: res.longitude, speed: res.speed, accuracy: res.accuracy}, 7200);
          b.setData({
            mypos: { lat: res.latitude, lng: res.longitude, speed: res.speed, accuracy: res.accuracy }
          });
          b.getList();
        },
        fail: function (res) {
          a.alert('取消位置信息将无法定位商家距离！');
          b.setData({
            mypos: { lat: '', lng: ''}
          });
          b.getList();
        }
      })
    } else {
      b.setData({
        mypos: mypos
      });
      b.getList();
    }
  },
  getCate: function () {
    var t = this;
    a.get("sale/coupon/getCouponCate", {}, function (a) {
      a.list.length > 0 && t.setData({
        cates: a.list
      })
    })
  },
  getList: function () {
    var t = this;//console.log(t.data.mypos);
    a.loading(),
      this.setData({
        loading: true
      }),
      a.get("changce/merch/get_list", {
        page: this.data.page,
        cateid: this.data.cateid,
        keyword: this.data.keyword,
        lat: this.data.mypos.lat,
        lng: this.data.mypos.lng,
        range: this.data.range,
      }, function (e) {
        console.log(e);
        var i = {
          loading: false,
          total: e.total,
          pagesize: e.pagesize,
          cates: e.cates,
          disopt:e.disopt
        };
        if(e.list){
          e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), e.list.length < e.pagesize && (i.loaded = true), t.setSpeed(e.list))
        }
        t.setData(i),
        a.hideLoading()
      })
  },
  changeMode: function () {
    "block" == this.data.listmode ? this.setData({
      listmode: ""
    }) : this.setData({
      listmode: "block"
    })
  },
  bindSearch: function (t) {
    t.target;
    this.setData({
      list: [],
      loading: true,
      loaded: false
    });
    var a = e.trim(t.detail.value),
      s = this.data.defaults;
    "" != a ? (s.keywords = a, this.setData({
      page: 1,
      params: s,
      fromsearch: false
    }), this.getList(), this.setRecord(a)) : (s.keywords = "", this.setData({
      page: 1,
      params: s,
      listorder: "",
      fromsearch: false
    }), this.getList())
  },
  bindInput: function (t) {
    var a = e.trim(t.detail.value);
      this.setData({
        page: 1,
        list: [],
        loading: true,
        loaded: false,
        keyword: a,
        fromsearch: true
      });
      this.getList()
  },
  bindFocus: function (t) {
    "" == e.trim(t.detail.value) && this.setData({
      fromsearch: true
    })
  },
  bindback: function () {
    //wx.navigateBack()
    this.setData({
      fromsearch: false,
      keyword:''
    });
    this.getList()
  },
  showFilter: function () {
    this.setData({
      isFilterShow: !this.data.isFilterShow,
      isNearShow:false
    })
  },
  bindCategoryEvents: function (t) {
    var a = t.target.dataset.id;
    //console.log(t.target);
    this.setData({
      list: [],
      page: 1,
      loading: true,
      loaded: false,
      category_parent_selected: a,
      cateid:a,
      selcatename: t.target.dataset.title,
      isFilterShow:false,
      isNearShow: false,
    });
    this.getList();
  },
  showNear: function () {
    this.setData({
      isFilterShow: false,
      isNearShow: !this.data.isNearShow
    })
  },
  bindDisEvents: function (t) {
    var a = t.target.dataset.id;
    //console.log(t.target);
    this.setData({
      list: [],
      page: 1,
      loading: true,
      loaded: false,
      range: a,
      selrangename: t.target.dataset.title,
      isFilterShow: false,
      isNearShow: false,
    });
    this.getList();
  },
  setSpeed: function (t) {
    if (t && !(t.length < 1))
      for (var a in t) {
        var e = t[a];
        if (!isNaN(e.lastratio)) {
          var i = e.lastratio / 100 * 2.5,
            s = wx.createContext();
          s.beginPath(),
            s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI),
            s.setFillStyle("rgba(0,0,0,0)"),
            s.setStrokeStyle("rgba(0,0,0,0.2)"),
            s.setLineWidth(4),
            s.stroke(),
            s.beginPath(),
            s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI),
            s.setFillStyle("rgba(0,0,0,0)"),
            s.setStrokeStyle("#ffffff"),
            s.setLineWidth(4),
            s.setLineCap("round"),
            s.stroke();
          var o = "coupon-" + e.id;
          wx.drawCanvas({
            canvasId: o,
            actions: s.getActions()
          })
        }
      }
  },
  bindTab: function (t) {
    var e = a.pdata(t).cateid;
    this.setData({
      cateid: e,
      page: 1,
      list: []
    }),
      this.getList()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  jump: function (t) {
    var e = a.pdata(t).id;
    e > 0 && wx.navigateTo({
      url: "/pages/sale/coupon/detail/index?id=" + e
    })
  }
})