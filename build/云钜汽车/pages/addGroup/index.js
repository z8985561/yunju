// pages/addGroup/index.js
var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    is_show_banner: false,
    bannerList: [],
    bannerUrl:[],
    groupList:[],
    nowGroupList:[],
    scroll_height:0,
    modai_width:0,
    themeList:[],
    nowThemeList:[],
    icons: t.requirejs("icons"),
    active: 0,
    icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png'
    },
    selectId:0,
    selectName:'',
    themeId:'empty',
    select_show:false,
    selectType:'empty',
    selectIcon:{
      down: '../../images/icon/sanjiaod.png',
      up: '../../images/icon/sanjiaou.png'
    },
    classifyTitle:false,
    select_classifyId:'',
    noListHight:0,
    brandList:[],
    brandListScrollHeight:0,
    alpha: '',
    addBg: false,
    windowHeight: '',
    seriesName:false,
    seriesId:0,
    seriesScrollHeight:0,
    scrolltolower:0,
    tabbar:'',
    scrollTop:0,
    show_serch:false,
    seriesList:[
      {
        'vendorTitle':'华晨宝马',
        'seriesList':[
          {
            'id':56,
            'seriesTitle':'宝马3系',
            'price':'31.68-36.68万'
          },
          {
            'id': 57,
            'seriesTitle': '宝马5系',
            'price': '43.69-65.99万'
          }
        ]
      }
    ],
    serch_botton_list:[
      { 'btnTitle': '热门搜索',
        'btnList': [{ 'value': 'H6' }, { 'value': '捷达' }, { 'value': '思域' }, { 'value': '朗逸' }, { 'value': '宝骏510' }],
      }
    ],
  },
  //点击
  handlerAlphaTap(e) {
    let {
      ap
    } = e.target.dataset;
    this.setData({
      alpha: ap
    });
  },
  //滑动
  handlerMove(e) {
    let {
      brandList
    } = this.data;
    this.setData({
      addBg: true
    });
    let rY = e.touches[0].clientY - 60; //竖向滑动的距离
    if (rY >= 0) {
      let index = Math.ceil((rY - this.apHeight) / this.apHeight);
      if (0 <= index < brandList.length) {
        let nonwAp = brandList[index];
        nonwAp && this.setData({
          alpha: nonwAp.alphabet
        });
      }
    }
  },
  //滑动结束
  handlerEnd(e) {
    this.setData({
      addBg: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ts = this,brandList=wx.getStorageSync('list');
    ts.get_addGroup();
    wx.getSystemInfo({
      success:function(res){
        var noListHight = (parseInt(res.screenHeight)-341)*2;
        var windowHeight = (res.windowHeight - 60) * 0.8 / 26;
        ts.setData({ 
          noListHight: noListHight,
          brandListScrollHeight:res.windowHeight - 135,
          windowHeight:windowHeight,
          seriesScrollHeight:res.windowHeight-50,
          scrolltolower:res.windowHeight-200,
        });
      }
    });
    ts.setData({brandList:brandList});
    wx.setNavigationBarTitle({title:'车友群小助手'});
  },
  get_addGroup() {
    var ts = this;
    a.post('car/get_addGroup_all', {}, function (res) {
      if (res.is_show == 1) {
        ts.setData({
          is_show: true,
          bannerList: res.list,
          bannerUrl:res.bannerUrl
        });
        ts.setData({ groupList:res.groupList,nowGroupList:res.groupList,themeList:res.themeList,nowThemeList:res.themeList.slice(0,5)});
      }
    });
  },
  onChange(event) {
    if (event.detail==1){
      this.setData({show_serch:true});
    }else{
      this.setData({ show_serch: false });
    }
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
  show_addgroup(e){
    var ts = this, id = e.currentTarget.dataset.id, name = e.currentTarget.dataset.name;
    ts.setData({show:true,selectId:id,selectName:name});
  },
  close_modai(e){
    this.setData({show:false});
  },
  no_close_modal(e){
    return false;
  },
  check_addgroup(e){
    var ts = this, openid ='oAXYv5UYhWfZ3BG9Rudyjg9DZ1Gc',code='';
    wx.login({
      success(res) {
        code=res.code;
        a.post('car/sendAddGroup', { code: code,id:ts.data.selectId}, function (res) {
          console.log(res);
        });
      }
    });
  },
  select_theme(e){
    var ts = this, id = e.currentTarget.dataset.id, i, groupList = ts.data.groupList;
    if (id == ts.data.themeId){
      ts.setData({ themeId:'empty',nowGroupList:groupList});
    }else{
      var nowGroupList=[];
      for(i in groupList){
        if (groupList[i].classifyid==id){
          nowGroupList.push(groupList[i]);
        }
      }
      ts.setData({themeId:id,nowGroupList:nowGroupList});
    }
  },
  select_show(e){
    var ts = this, type = e.currentTarget.dataset.type;
    ts.setData({selectType:type,select_show:true});
  },
  close_select(){
    this.setData({ select_show: false, selectType:'empty'});
  },
  select_classify(e){
    var ts = this, id = e.currentTarget.dataset.id, title = e.currentTarget.dataset.name,groupList = ts.data.groupList,i;
      var nowGroupList = [];
      for (i in groupList) {
        if (groupList[i].classifyid == id) {
          nowGroupList.push(groupList[i]);
        }
      }
    ts.setData({ select_classifyId: id, classifyTitle: title, nowGroupList: nowGroupList, select_show: false});
  },
  reset_select(e){
    var ts=this;
    ts.setData({ select_classifyId: false, classifyTitle: false, nowGroupList: ts.data.groupList, select_show: false, seriesName: false, seriesId: 0, selectType:''});
  },
  selectBrand(e){
    var ts = this, id = e.currentTarget.dataset.id,seriesList=[];
    a.post('car/getHotSeries',{id:id},function(res){
      seriesList = res.list;
      ts.setData({ brand_show: true, seriesList: seriesList });
    }); 
  },
  close_brand(){
    var ts=this;
    ts.setData({ brand_show: false });
  },
  select_series(e){
    var ts = this, id = e.currentTarget.dataset.id, name = e.currentTarget.dataset.name,groupList=ts.data.groupList,i;
    var nowGroupList = [];
    for(i in groupList){
      if (groupList[i].seriesid==id){
        nowGroupList.push(groupList[i]);
      }
    }
    ts.setData({ seriesId: id, seriesName: name, select_show:false,nowGroupList:nowGroupList});
  },
  scrolltolower (e){
    if (this.data.scrollTop>0){
      this.setData({ tabbar: 'tabbar-fixed' });
    }
  },
  toupper(e){
    this.setData({ tabbar: '' });
  },
  bindscroll(e){
    this.setData({ scrollTop: e.detail.scrollTop})
  },
  check_search(e){
    var ts = this, btnRecordList = ts.data.btnRecordList, value = e.detail.toUpperCase(), i;
    var groupList=ts.data.groupList;
    if (value){
      if (!btnRecordList){
        btnRecordList = [];
      }
      var re = new RegExp(/^\s+$/g);
      if (value && !re.test(value)) {
        if (btnRecordList.length>=10){
          btnRecordList.pop();
          btnRecordList.unshift(value);
        }else{
          btnRecordList.unshift(value);
        }
        var serchList = {
          'serchlen':0,
          'list':[]
        };
        var re = new RegExp(value);
        for(i in groupList){
          if (re.test(groupList[i].name.toUpperCase())) {
            serchList.list.push(groupList[i]);
          }
        }
        serchList.serchlen = serchList.list.length;
        ts.setData({serchList: serchList});
        if(!e.isbtn){
          ts.setData({ btnRecordList: btnRecordList });
        }
      }
    }
  },
  clear_btn_record(){
    var ts=this; 
    ts.setData({ btnRecordList: false });
  },
  clearSerch(){
    this.setData({ serchList: false});
  },
  serchBtn(e){
    var ts = this, value = e.currentTarget.dataset.value;
    ts.check_search({detail:value,isbtn:true});
    ts.setData({value:value});
  },
  serchchange(e){
    var re = new RegExp(/^\s+$/g);
    if (e.detail || !re.test(e.detail)){
      this.setData({ serchList: false});
    }
  },
})