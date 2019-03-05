var t = getApp(),
  e = t.requirejs("core"),
  a = t.requirejs("foxui"),
  i = t.requirejs("biz/diyform"),
  n = t.requirejs("jquery");
Page({
  data: {
    icons: t.requirejs("icons"),
    member: {},
    diyform: {},
    postData: {},
    openbind: !1,
    index: 0,
    submit: !1,
    showPicker: !1,
    pvalOld: [0, 0, 0],
    pval: [0, 0, 0],
    areas: [],
    noArea: !0
  },
  onLoad: function (e) {
    this.setData({
      areas: t.getCache("cacheset").areas
    }), t.url(e)
  },
  onShow: function () {
    this.getInfo()
  },
  getInfo: function () {
    var t = this;
    e.get("member/info", {}, function (e) {
      var a = e.member,
        i = {
          member: a,
          level:e.level,
          diyform: e.diyform,
          openbind: e.openbind,
          show: !0
        };
        i.postData={
          level:e.level[0]
        }
      0 == e.diyform.template_flag && (i.postData = {
        realname: a.realname,
        mobile: a.mobile,
        weixin: a.weixin,
        birthday: a.birthday,
        city: a.city
      }), t.setData(i)
    })
  },
  onChange: function (t) {
    console.log(t);
    var a = t.detail.value,
      i = e.pdata(t).type,
      r = this.data.postData;
      console.log(a);
      if(i=='level'){
        r[i] = this.data.level[a];
      }else{
        r[i] = n.trim(a)
      }
      this.setData({
      postData: r
    })
  },
  DiyFormHandler: function (t) {
    return i.DiyFormHandler(this, t)
  },
  submit: function () {
    if (!this.data.submit||1==1) {
      var t = this,
        r = t.data,
        o = r.diyform;
      t.setData({
        submit: !0
      });
      var s = {
        memberdata: r.postData
      };
      e.post("member/info/apply", s, function (e) {
        if (0 != e.error) return void a.toast(t, e.message);
        t.setData({
          submit: !1
        }), a.toast(t, "成功"), 
        e.notapply==1?setTimeout(function(){
          wx.redirectTo({
            url: '/pages/member/index/index',
          })
        },50):setTimeout(function () {
          wx.navigateBack()
        }, 500)
      })
    }
  },
  selectArea: function (t) {
    console.log(t);
    return i.selectArea(this, t)
  },
  bindChange: function (t) {
    return i.bindChange(this, t)
  },
  onCancel: function (t) {
    return i.onCancel(this, t)
  },
  onConfirm: function (t) {
    var e = this.data.pval,
      a = this.data.areas,
      n = this.data.postData;
    n.city = a[e[0]].name + " " + a[e[0]].city[e[1]].name, this.setData({
      postData: n,
      showPicker: !1
    })
  },
  getIndex: function (t, e) {
    return i.getIndex(t, e)
  },
  endTime: function () {
    var t = this,
      e = t.data.endtime;
    if (e > 0) {
      t.setData({
        endtime: e - 1
      });
      setTimeout(function () {
        t.endTime()
      }, 1e3)
    }
  },
  inputChange: function (t) {
    var i = this.data.postData,
      s = e.pdata(t).type,
      o = t.detail.value;
    i[s] = n.trim(o),
      this.setData({
        postData: i
      })
  },
  getCode: function (t) {
    var s = this;
    if (!(s.data.endtime > 0)) {
      var o = s.data.postData.mobile;
      if (!n.isMobile(o))
        return void a.toast(s, "请填写正确的手机号");
      e.get("sms/changemobie", {
        mobile: o
      }, function (t) {
        if (0 != t.error)
          return void a.toast(s, t.message);
        a.toast(s, "短信发送成功"),
          s.setData({
            endtime: 60
          }),
          s.endTime()
      }, !0, !0, !0)
    }
  },
})