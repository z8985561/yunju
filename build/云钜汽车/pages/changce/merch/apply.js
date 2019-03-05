// pages/changce/merch/apply.js
var a = getApp(),
  t = a.requirejs("core"),
  e = a.requirejs("jquery"),
  d = a.requirejs("biz/diyform"),
  n = a.requirejs("foxui");
Page({
  data: {
    reg:{},
    diyform:{}
  },
  onShow: function () {
    var t=this;
    this.getData()
  },
  getData: function () {
    var a = this;
    t.get("changce/merch/apply", {}, function (z) {
      console.log(z);
      if (z.canapply==1){
        z.show = true;
        a.setData(z);
        a.setData({
          diyform: {
            fields: z.diyform.fields,
            f_data: z.diyform.f_data
          }
        })
        console.log(a)
      }else{
        t.alert(z.message);
        wx.redirectTo({
          url: '/pages/changce/merch/index',
        });
      }
    }, false, true)
  },
  typeChange: function (a) {
    var t = a.detail.value,
      e = this.data.type_array[t].type;
    this.setData({
      applytype: e,
      applyIndex: t
    })
  },
  bankChange: function (a) {
    var t = a.detail.value;
    this.setData({
      bankIndex: t
    })
  },
  inputChange: function (a) {
    var t = this.data.reg,
      n = a.currentTarget.dataset.type,
      i = e.trim(a.detail.value);
      t[n] = i, this.setData({t});
      console.log(this.data.reg);
  },
  submit: function (a) {
    var e,
      i = this,
      s = this.data,
      o = this.data.diyform; 
      console.log(o);

      if (s.canapply && !s.isSubmit && d.verify(this, o)) {
      if (!s.reg.merchname)
        return void n.toast(i, "请填写商户名称");
      if (!s.reg.salecate)
        return void n.toast(i, "请填写主营项目");
      if (!s.reg.realname)
        return void n.toast(i, "请填写联系人");
      if (!s.reg.mobile) return void n.toast(i, "请填写手机号");
      if (!s.reg.uname) return void n.toast(i, "请填写账号");
      if (!s.reg.upass) return void n.toast(i, "请填写密码");
        t.confirm('确认要提交申请吗？', function () {
          var pdata={
            merchname:s.reg.merchname,
            salecate: s.reg.salecate,
            desc: s.reg.desc,
            mobile: s.reg.mobile,
            realname: s.reg.realname,
            uname: s.reg.uname,
            upass:s.reg.upass,
            mdata:s.diyform.f_data
          }
          i.setData({
            isSubmit: true
          }),
          console.log(s.reg)
            t.post("changce/merch/apply", pdata, function (a) {
              console.log(a);
              if (a.status!=1)
                return n.toast(i, a.result.message), void i.setData({
                  isSubmit: false
                });
              n.toast(i, "申请成功，请等待审核！"),
                setTimeout(function () {
                  wx.navigateBack()
                }, 2000)
            }, true, true)
        })
    }
  },
  onChange: function (t) {
    return d.onChange(this, t)
  },
  DiyFormHandler: function (t) {
    console.log(t);
    var hd = d.DiyFormHandler(this, t)
    console.log(hd);
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
  },
  confirmjoin: function (a) {
    var e,
      i = this,
      s = this.data;
    if (!s.isSubmit) {
      i.setData({
        isSubmit: true
      });
        t.post("changce/merch/confirmjoin", s.reg, function (a) {
          if (a.status != 1)
            return n.toast(i, a.result.message), void i.setData({
              isSubmit: false
            });
          n.toast(i, "入驻成功！"),
            setTimeout(function () {
              wx.navigateBack()
            }, 2000)
        }, true, true);
    }
  }
})