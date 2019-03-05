var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = getApp(), a = e.requirejs("core"), i = e.requirejs("foxui"), s = e.requirejs("biz/diyform"), r = e.requirejs("jquery"), d = e.requirejs("biz/selectdate");

Page({
  data: {
    icons: e.requirejs("icons"),
    list: {},
    goodslist: {},
    data: {
      dispatchtype: 0,
      remark: ""
    },
    areaDetail: {
      detail: {
        realname: "",
        mobile: "",
        areas: "",
        street: "",
        address: ""
      }
    },
    merchid: 0,
    showPicker: !1,
    pvalOld: [0, 0, 0],
    pval: [0, 0, 0],
    areas: [],
    street: [],
    streetIndex: 0,
    noArea: !1,
    showaddressview: !1,
    city_express_state: !1,
    currentDate: "",
    dayList: "",
    currentDayList: "",
    currentObj: "",
    currentDay: "",
    cycelbuy_showdate: "",
    receipttime: "",
    checkAddress: !1,
    scope: "",
    bargainid: ""
  },
  onLoad: function (t) {
    var i = this, s = [];
    console.log(t);
    if (t.goods) {
      var r = JSON.parse(t.goods);
      t.goods = r, this.setData({
        ispackage: !0
      });
    }
    i.setData({
      options: t
    }), i.setData({
      bargainid: t.bargainid
    }), e.url(t), console.log(i.data.options), a.get("order/create", i.data.options, function (t) {
      if (console.log(t), 0 == t.error) {
        console.log(t), s = i.getGoodsList(t.goods);
        var r = (i.data.originalprice - t.goodsprice).toFixed(2);
        i.setData({
          list: t,
          goods: t,
          show: !0,
          address: !0,
          checkAddress: t.checkAddress,
          goodslist: s,
          merchid: t.merchid,
          comboprice: r,
          diyform: {
            f_data: t.f_data,
            fields: t.fields
          },
          city_express_state: t.city_express_state,
          cycelbuy_showdate: t.selectDate,
          receipttime: t.receipttime,
          iscycel: t.iscycel,
          scope: t.scope,
          fromquick: t.fromquick
        }), e.setCache("goodsInfo", {
          goodslist: s,
          merchs: t.merchs
        }, 1800);
      } else a.toast(t.message, "loading"), setTimeout(function () {
        wx.navigateBack();
      }, 1e3);
      if ("" != t.fullbackgoods) {
        if (void 0 == t.fullbackgoods) return;
        var d = t.fullbackgoods.fullbackratio, o = t.fullbackgoods.maxallfullbackallratio, d = Math.round(d), o = Math.round(o);
        i.setData({
          fullbackratio: d,
          maxallfullbackallratio: o
        });
      }
      1 == t.iscycel && i.show_cycelbuydate();
    }), this.getQuickAddressDetail(), e.setCache("coupon", ""), setTimeout(function () {
      i.setData({
        areas: e.getCache("cacheset").areas
      });
    }, 3e3);
  },
  show_cycelbuydate: function () {
    var t = this, e = d.getCurrentDayString(this, t.data.cycelbuy_showdate), a = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    t.setData({
      currentObj: e,
      currentDate: e.getFullYear() + "." + (e.getMonth() + 1) + "." + e.getDate() + " " + a[e.getDay()],
      currentYear: e.getFullYear(),
      currentMonth: e.getMonth() + 1,
      currentDay: e.getDate(),
      initDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
      checkedDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
      maxday: t.data.scope
    });
  },
  onShow: function () {
    // e.checkAccount();
    var i = this, s = e.getCache("orderAddress"), d = e.getCache("orderShop");
    e.getCache("isIpx") ? i.setData({
      isIpx: !0,
      iphonexnavbar: "fui-iphonex-navbar",
      paddingb: "padding-b"
    }) : i.setData({
      isIpx: !1,
      iphonexnavbar: "",
      paddingb: ""
    }), s && (this.setData({
      "list.address": s
    }), i.caculate(i.data.list)), d && this.setData({
      "list.carrierInfo": d,
      "list.storeInfo": d
    });
    var o = e.getCache("coupon");
    "object" == (void 0 === o ? "undefined" : t(o)) && 0 != o.id ? (this.setData({
      "data.couponid": o.id,
      "data.couponname": o.name
    }), a.post("order/create/getcouponprice", {
      couponid: o.id,
      goods: this.data.goodslist,
      goodsprice: this.data.list.goodsprice,
      discountprice: this.data.list.discountprice,
      isdiscountprice: this.data.list.isdiscountprice
    }, function (t) {
      0 == t.error ? (delete t.$goodsarr, i.setData({
        coupon: t
      }), i.caculate(i.data.list)) : a.alert(t.message);
    }, !0)) : (this.setData({
      "data.couponid": 0,
      "data.couponname": null,
      coupon: null
    }), r.isEmptyObject(i.data.list) || i.caculate(i.data.list));
  },
  getGoodsList: function (t) {
    var e = [];
    r.each(t, function (t, a) {
      r.each(a.goods, function (t, a) {
        e.push(a);
      });
    });
    for (var a = 0, i = 0; i < e.length; i++) a += e[i].price;
    return console.log(a), this.setData({
      originalprice: a
    }), e;
  },
  toggle: function (t) {
    var e = a.pdata(t), i = e.id, s = e.type, r = {};
    r[s] = 0 == i || void 0 === i ? 1 : 0, this.setData(r);
  },
  phone: function (t) {
    a.phone(t);
  },
  dispatchtype: function (t) {
    var e = a.data(t).type;
    this.setData({
      "data.dispatchtype": e
    }), this.caculate(this.data.list);
  },
  number: function (t) {
    var e = this, s = a.pdata(t), d = i.number(this, t), o = s.id, c = e.data.list, n = 0, l = 0, goodslist={};
    e.setData({
      coupon: '',
      "data.couponname": null,
    })
    r.each(c.goods, function (t, e) {
      r.each(e.goods, function (e, a) {
        a.id == o && (c.goods[t].goods[e].total = d), n += parseInt(c.goods[t].goods[e].total),
          l += parseFloat(n * c.goods[t].goods[e].price);
      });
    }), c.total = n, c.goodsprice = r.toFixed(l, 2), goodslist=e.getGoodsList(c.goods),e.setData({
      list: c,
      goodslist: goodslist
      });
    var cache = getApp().getCache("goodsInfo");
    var merchs = cache.merchs;

    getApp().setCache("goodsInfo", {
      goodslist: goodslist,
      merchs: merchs
    }, 1800)
     this.caculate(c);
  },
  caculate: function (t) {
    var e = this;
    console.log(e.data), a.post("order/create/caculate", {
      goods: this.data.goodslist,
      dflag: this.data.data.dispatchtype,
      total: this.data.list.total,
      addressid: this.data.list.address ? this.data.list.address.id : 0,
      packageid: this.data.list.packageid,
      bargain_id: this.data.bargainid
    }, function (a) {
      t.dispatch_price = a.price, t.enoughdeduct = a.deductenough_money, t.enoughmoney = a.deductenough_enough,
        t.taskdiscountprice = a.taskdiscountprice, t.discountprice = a.discountprice, t.isdiscountprice = a.isdiscountprice,
        t.seckill_price = a.seckill_price, e.data.data.deduct && (a.realprice -= a.deductcredit),
        e.data.data.deduct2 && (a.realprice -= a.deductcredit2), e.data.coupon && void 0 !== e.data.coupon.deductprice && (a.realprice -= e.data.coupon.deductprice),
        t.realprice = r.toFixed(a.realprice, 2), t.couponcount = a.couponcount, e.setData({
          list: t,
          city_express_state: a.city_express_state
        });
    }, !0);
  },
  submit: function () {
    var t = this.data, e = this, i = this.data.diyform, d = t.giftid;
    console.log(t);
    console.log(d);
    console.log(e);
    if (0 == this.data.goods.giftid && 1 == this.data.goods.gifts.length && (d = this.data.goods.gifts[0].id),
      console.log(t.fromquick), !t.submit && s.verify(this, i)) {
      t.list.carrierInfo = t.list.carrierInfo || {};
      var o = {
        id: t.options.id ? t.options.id : 0,
        goods: t.goodslist,
        gdid: t.options.gdid,
        dispatchtype: t.data.dispatchtype,
        fromcart: t.list.fromcart,
        carrierid: 1 == t.data.dispatchtype && t.list.carrierInfo ? t.list.carrierInfo.id : 0,
        addressid: t.list.address ? t.list.address.id : 0,
        carriers: 1 == t.data.dispatchtype || t.list.isvirtual || t.list.isverify ? {
          carrier_realname: t.list.member.realname,
          carrier_mobile: t.list.member.mobile,
          realname: t.list.carrierInfo.realname,
          mobile: t.list.carrierInfo.mobile,
          storename: t.list.carrierInfo.storename,
          address: t.list.carrierInfo.address
        } : "",
        remark: t.data.remark,
        deduct: t.data.deduct,
        deduct2: t.data.deduct2,
        couponid: t.data.couponid,
        invoicename: t.list.invoicename,
        submit: !0,
        packageid: t.list.packageid,
        giftid: d,
        diydata: t.diyform.f_data,
        receipttime: t.receipttime,
        bargain_id: e.data.options.bargainid,
        fromquick: t.fromquick
      };
      if (t.list.storeInfo && (o.carrierid = t.list.storeInfo.id), 1 == t.data.dispatchtype || t.list.isvirtual || t.list.isverify) {
        if ("" == r.trim(t.list.member.realname)) return void a.alert("请填写联系人!");
        if ("" == r.trim(t.list.member.mobile)) return void a.alert("请填写联系方式!");
        if (t.list.isforceverifystore && !t.list.storeInfo) return void a.alert("请选择门店!");
        o.addressid = 0;
      } else if (!o.addressid && !t.list.isonlyverifygoods) return void a.alert("地址没有选择!");
      e.setData({
        submit: !0
      }), a.post("order/create/submit", o, function (t) {
        e.setData({
          submit: !1
        }), 0 == t.error ? wx.redirectTo({
          url: "/pages/order/pay/index?id=" + t.orderid
        }) : a.alert(t.message);
      }, !0);
    }
  },
  dataChange: function (t) {
    var e = this.data.data, a = this.data.list;
    switch (t.target.id) {
      case "remark":
        e.remark = t.detail.value;
        break;

      case "deduct":
        e.deduct = t.detail.value;
        i = parseFloat(a.realprice);
        i += e.deduct ? -parseFloat(a.deductmoney) : parseFloat(a.deductmoney), a.realprice = i;
        break;

      case "deduct2":
        e.deduct2 = t.detail.value;
        var i = parseFloat(a.realprice);
        i += e.deduct2 ? -parseFloat(a.deductcredit2) : parseFloat(a.deductcredit2), a.realprice = i;
    }
    a.realprice = r.toFixed(a.realprice, 2), this.setData({
      data: e,
      list: a
    });
  },
  listChange: function (t) {
    var e = this.data.list;
    switch (t.target.id) {
      case "invoicename":
        e.invoicename = t.detail.value;
        break;

      case "realname":
        e.member.realname = t.detail.value;
        break;

      case "mobile":
        e.member.mobile = t.detail.value;
    }
    this.setData({
      list: e
    });
  },
  url: function (t) {
    var e = a.pdata(t).url;
    wx.redirectTo({
      url: e
    });
  },
  onChange: function (t) {
    return s.onChange(this, t);
  },
  DiyFormHandler: function (t) {
    return s.DiyFormHandler(this, t);
  },
  selectArea: function (t) {
    return s.selectArea(this, t);
  },
  bindChange: function (t) {
    return s.bindChange(this, t);
  },
  onCancel: function (t) {
    return s.onCancel(this, t);
  },
  onConfirm: function (t) {
    s.onConfirm(this, t);
    var e = this.data.pval, a = this.data.areas, i = this.data.areaDetail.detail;
    i.province = a[e[0]].name, i.city = a[e[0]].city[e[1]].name, i.datavalue = a[e[0]].code + " " + a[e[0]].city[e[1]].code,
      a[e[0]].city[e[1]].area && a[e[0]].city[e[1]].area.length > 0 ? (i.area = a[e[0]].city[e[1]].area[e[2]].name,
        i.datavalue += " " + a[e[0]].city[e[1]].area[e[2]].code, this.getStreet(a, e)) : i.area = "",
      i.street = "", this.setData({
        "areaDetail.detail": i,
        streetIndex: 0,
        showPicker: !1
      });
  },
  getIndex: function (t, e) {
    return s.getIndex(t, e);
  },
  showaddressview: function (t) {
    var e = "";
    e = "open" == t.target.dataset.type, this.setData({
      showaddressview: e
    });
  },
  onChange2: function (t) {
    var e = this, a = e.data.areaDetail.detail, i = t.currentTarget.dataset.type, s = r.trim(t.detail.value);
    "street" == i && (a.streetdatavalue = e.data.street[s].code, s = e.data.street[s].name),
      a[i] = s, e.setData({
        "areaDetail.detail": a
      });
  },
  getStreet: function (t, e) {
    if (t && e) {
      var i = this;
      if (i.data.areaDetail.detail.province && i.data.areaDetail.detail.city && this.data.openstreet) {
        var s = t[e[0]].city[e[1]].code, r = t[e[0]].city[e[1]].area[e[2]].code;
        a.get("getstreet", {
          city: s,
          area: r
        }, function (t) {
          var e = t.street, a = {
            street: e
          };
          if (e && i.data.areaDetail.detail.streetdatavalue) for (var s in e) if (e[s].code == i.data.areaDetail.detail.streetdatavalue) {
            a.streetIndex = s, i.setData({
              "areaDetail.detail.street": e[s].name
            });
            break;
          }
          i.setData(a);
        });
      }
    }
  },
  getQuickAddressDetail: function () {
    var t = this, e = t.data.id;
    a.get("member/address/get_detail", {
      id: e
    }, function (e) {
      var a = {
        openstreet: e.openstreet,
        show: !0
      };
      if (!r.isEmptyObject(e.detail)) {
        var i = e.detail.province + " " + e.detail.city + " " + e.detail.area, s = t.getIndex(i, t.data.areas);
        a.pval = s, a.pvalOld = s, a.areaDetail.detail = e.detail;
      }
      t.setData(a), e.openstreet && s && t.getStreet(t.data.areas, s);
    });
  },
  submitaddress: function () {
    var t = this, e = t.data.areaDetail.detail;
    t.data.posting || ("" != e.realname && e.realname ? "" != e.mobile && e.mobile ? "" != e.city && e.city ? !(t.data.street.length > 0) || "" != e.street && e.street ? "" != e.address && e.address ? e.datavalue ? (e.id = 0,
      t.setData({
        posting: !0
      }), a.post("member/address/submit", e, function (s) {
        if (0 != s.error) return t.setData({
          posting: !1
        }), void i.toast(t, s.message);
        e.id = s.addressid, t.setData({
          showaddressview: !1,
          "list.address": e
        }), a.toast("保存成功");
      })) : i.toast(t, "地址数据出错，请重新选择") : i.toast(t, "请填写详细地址") : i.toast(t, "请选择所在街道") : i.toast(t, "请选择所在地区") : i.toast(t, "请填写联系电话") : i.toast(t, "请填写收件人"));
  },
  giftPicker: function () {
    this.setData({
      active: "active",
      gift: !0
    });
  },
  emptyActive: function () {
    this.setData({
      active: "",
      slider: "out",
      tempname: "",
      showcoupon: !1,
      gift: !1
    });
  },
  radioChange: function (t) {
    this.setData({
      giftid: t.currentTarget.dataset.giftgoodsid,
      gift_title: t.currentTarget.dataset.title
    });
  },
  sendclick: function () {
    wx.navigateTo({
      url: "/pages/map/index"
    });
  },
  clearform: function () {
    var t = this.data.diyform;
    t.f_data = "", this.setData({
      diyform: t
    });
  },
  syclecancle: function () {
    this.setData({
      cycledate: !1
    });
  },
  sycleconfirm: function () {
    this.setData({
      cycledate: !1
    });
  },
  editdate: function (t) {
    d.setSchedule(this), this.setData({
      cycledate: !0,
      create: !0
    });
  },
  doDay: function (t) {
    d.doDay(t, this);
  },
  selectDay: function (t) {
    d.selectDay(t, this), d.setSchedule(this);
  },
  activityPicker: function () {
    this.setData({
      fadein: "in"
    });
  },
  actOutPicker: function () {
    this.setData({
      fadein: ""
    });
  },
});