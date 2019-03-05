var e = getApp(), t = e.requirejs("core"), r = e.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icons: e.requirejs("icons"),
    list:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getArticlelist();
    
  },

  getArticlelist:function(){
    var that=this;
    var s={
      page:that.data.page,
    }
    t.get('article',s,function(res){
      if(res.error==0){
        that.setData({
          total:res.total
        })
        if(res.list.length>0){
          that.setData({
            page:that.data.page+1,
            list:that.data.list.concat(res.list)
          })
          if (res.list.length < res.total){
            that.setData({
              loaded:!1
            })
          }
        }
      }
    })

  },

  onReachBottom: function () {
    console.log(this.data.loaded)
    console.log(this.data.list.length)
    this.data.loaded || this.data.list.length == this.data.total || this.getArticlelist()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})