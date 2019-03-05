var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t
}
  : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, e = getApp(), a = e.requirejs("core"), i = e.requirejs("foxui"), d = e.requirejs("biz/diyform"), r = e.requirejs("jquery");
Page({
  data: {
    icons: e.requirejs("icons"),
    list: {},
    goods: {},
    data: {
      dispatchtype: 0
    },
    showPicker: !1,
    pvalOld: [0, 0, 0],
    pval: [0, 0, 0],
    areas: [],
    noArea: !0
  },
  orderConfirm: function (options) {
    var t = this;
    console.log(options);
    e.get("groups/orders/confirm", { id: options.id }, function (a) {
      console.log(a);
      s.wxParse("wxParseData", "html", a.goods.content, t, "5"),
        t.setData({
          show: !0,
          lists: a.goods,
        })
    })
  },

  onLoad: function (t) {
    var i = this,
      d = {};
    console.log(t);
    this.setData({
      options: t,
      areas: e.getCache("cacheset").areas
    }),
      e.url(t),
      a.get("groups/orders/confirm", i.data.options, function (t) {
        console.log(t);
        0 == t.error ? (i.setData({
          list: t,
          show: !0,
          goods: t.goods,
        }), e.setCache("goodsInfo", {
          goods: t.goods,
        }, 1800)) : (a.alert(t.result.message), setTimeout(function () {
          wx.navigateBack()
        }, 3000))
      }),
      e.setCache("coupon", "")
  },
  onShow: function () {
    var i = this,
      d = e.getCache("orderAddress"),
      s = e.getCache("orderShop");
    d && (this.setData({
      "list.address": d
    })),
      s && this.setData({
        "list.carrierInfo": s
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
      })) : a.alert(t.message)
    }, !0)) : (this.setData({
      "data.couponid": 0,
      "data.couponname": null,
      coupon: null
    }), r.isEmptyObject(i.data.list))
  },
  toggle: function (t) {
    var e = a.pdata(t),
      i = e.id,
      d = e.type,
      r = {};
    r[d] = 0 == i || void 0 === i ? 1 : 0,
      this.setData(r)
  },
  phone: function (t) {
    a.phone(t)
  },
  dispatchtype: function (t) {
    var e = a.data(t).type;
    this.setData({
      "data.dispatchtype": e
    })
  },
  number: function (t) {
    var e = this,
      d = a.pdata(t),
      s = i.number(this, t),
      o = d.id,
      c = e.data.list,
      n = e.data.goodslist,
      u = 0,
      l = 0;
    r.each(c.goods, function (t, e) {
      r.each(e.goods, function (e, a) {
        a.id == o && (c.goods[t].goods[e].total = s, n[o].total = s),
          u += parseInt(c.goods[t].goods[e].total),
          l += parseFloat(u * c.goods[t].goods[e].price)
      })
    }),
      c.total = u,
      c.goodsprice = l,
      e.setData({
        list: c,
        goodslist: n
      })
  },

  submit: function () {
    var t = this.data,
      e = this;

    if (!t.submit) {
      if (d.verify(this, i)) {
        t.list.carrierInfo = t.list.carrierInfo || {};
        var s = {
          id: t.options.id ? t.options.id : 0,
          type: t.options.type,
          teamid: t.options.teamid,
          heads: t.options.heads,
          goods: t.goods,
          ispost: 1,
          submit: 1,
          aid: t.list.address ? t.list.address.id : 0,
          carriers: 1 == t.data.dispatchtype || t.list.isvirtual || t.list.isverify ? {
            realname: t.list.member.realname,
            mobile: t.list.member.mobile,

            address: t.list.carrierInfo.address
          }
            : "",
          remark: t.data.remark,
          submit: !0,

        };
        if (1 == t.data.dispatchtype || t.list.isvirtual || t.list.isverify) {
          if ("" == r.trim(t.list.member.realname))
            return void a.alert("请填写联系人!");
          if ("" == r.trim(t.list.member.mobile))
            return void a.alert("请填写联系方式!");
          s.addressid = 0
        } else if (!s.aid)
          return void a.alert("地址没有选择!");
        e.setData({
          submit: !0
        }),
          a.post("groups/orders/confirm", s, function (t) {
            if (e.setData({
              submit: !1
            }), 0 != t.error)
              return void a.alert(t.result.message);
            wx.navigateTo({
              url: "/application/pages/groups/pay/index?orderid=" + t.orderid + "&teamid=" + t.teamid + "isteam=" + t.is_team
            })
          }, !0)
      }
    }
  },
  dataChange: function (t) {
    var e = this.data.data,
      a = this.data.list;
    switch (t.target.id) {
      case "remark":
        e.remark = t.detail.value;
        break;
      case "deduct":
        e.deduct = t.detail.value,
          a.realprice += e.deduct ? -a.deductmoney : a.deductmoney;
        break;
      case "deduct2":
        e.deduct2 = t.detail.value,
          a.realprice += e.deduct2 ? -a.deductcredit2 : a.deductcredit2
    }
    this.setData({
      data: e,
      list: a
    })
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
        e.member.mobile = t.detail.value
    }
    this.setData({
      list: e
    })
  },
  url: function (t) {
    var e = a.pdata(t).url;
    wx.redirectTo({
      url: e
    })
  },
  onChange: function (t) {
    return d.onChange(this, t)
  },
  DiyFormHandler: function (t) {
    return d.DiyFormHandler(this, t)
  },
  selectArea: function (t) {
    return d.selectArea(this, t)
  },
  bindChange: function (t) {
    return d.bindChange(this, t)
  },
  onCancel: function (t) {
    return d.onCancel(this, t)
  },
  onConfirm: function (t) {
    return d.onConfirm(this, t)
  },
  getIndex: function (t, e) {
    return d.getIndex(t, e)
  }
})
