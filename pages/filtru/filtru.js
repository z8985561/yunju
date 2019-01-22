// pages/filtru/filtru.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filtruList: "",
    budgetList: [{ //预算
      id: 0,
      startPrice: 0,
      endPrice: 8,
      text: "8万以下"
    }, {
      id: 1,
      startPrice: 8,
      endPrice: 10,
      text: "8-10万"
    }, {
      id: 2,
      startPrice: 10,
      endPrice: 15,
      text: "10-15万"
    }, {
      id: 3,
      startPrice: 15,
      endPrice: 25,
      text: "15-25万"
    }, {
      id: 4,
      startPrice: 25,
      endPrice: 35,
      text: "25-35万"
    }, {
      id: 5,
      startPrice: 35,
      endPrice: 50,
      text: "35-50万"
    }, {
      id: 6,
      startPrice: 50,
      endPrice: 70,
      text: "50-70万"
    }, {
      id: 7,
      startPrice: 70,
      endPrice: 150,
      text: "70万以上"
    }],
    budgetActive: 99,
    budget: "", //预算
    carLevelList: [{
      id: 0,
      imgUrl: "",
      chooseImgUrl: "",
      text: "微型车"
    }, {
      id: 1,
      imgUrl: "",
      chooseImgUrl: "",
      text: "小型车"
    }, {
      id: 2,
      imgUrl: "",
      chooseImgUrl: "",
      text: "紧凑型车"
    }, {
      id: 3,
      imgUrl: "",
      chooseImgUrl: "",
      text: "中型车"
    }, {
      id: 4,
      imgUrl: "",
      chooseImgUrl: "",
      text: "中大型车"
    }, {
      id: 5,
      imgUrl: "",
      chooseImgUrl: "",
      text: "豪华型车"
    }, {
      id: 6,
      imgUrl: "",
      chooseImgUrl: "",
      text: "SUV"
    }, {
      id: 7,
      imgUrl: "",
      chooseImgUrl: "",
      text: "MPV"
    }, {
      id: 8,
      imgUrl: "",
      chooseImgUrl: "",
      text: "跑车"
    }, {
      id: 9,
      imgUrl: "",
      chooseImgUrl: "",
      text: "皮卡"
    }, {
      id: 10,
      imgUrl: "",
      chooseImgUrl: "",
      text: "微面"
    }, ],
    carLevelArr: "",
    nationalityList: [{
      id: 0,
      text: "中国"
    }, {
      id: 1,
      text: "德国"
    }, {
      id: 2,
      text: "日本"
    }, {
      id: 3,
      text: "美国"
    }, {
      id: 4,
      text: "韩国"
    }, {
      id: 5,
      text: "法国"
    }, {
      id: 6,
      text: "英国"
    }, {
      id: 7,
      text: "意大利"
    }, {
      id: 8,
      text: "瑞典"
    }, {
      id: 9,
      text: "其他"
    }],
    choNationality: "",
    gearboxList: [{
      id: 1,
      text: "手动"
    }, {
      id: 2,
      text: "自动"
    }],
    choGearbox: "",
    bunkersList: [{
      id: 1,
      text: "汽油"
    }, {
      id: 2,
      text: "柴油"
    }, {
      id: 3,
      text: "纯电动"
    }, {
      id: 4,
      text: "油电混合"
    }, {
      id: 5,
      text: "插电式混合"
    }, {
      id: 6,
      text: "增程式"
    }],
    choBunkers: "",
    structureList: [{
      id: 1,
      text: "两厢"
    }, {
      id: 2,
      text: "三厢"
    }, {
      id: 3,
      text: "掀背"
    }, {
      id: 4,
      text: "旅行版"
    }, {
      id: 5,
      text: "硬顶敞篷"
    }, {
      id: 6,
      text: "软顶敞篷"
    }, {
      id: 7,
      text: "硬顶跑车"
    }, {
      id: 8,
      text: "客车"
    }, {
      id: 9,
      text: "货车"
    }],
    choStructure: '',
    emissionsList: [{
      id: 1,
      text: "1.0及以下"
    }, {
      id: 2,
      text: "1.1-1.6L"
    }, {
      id: 3,
      text: "1.7-2.0L"
    }, {
      id: 4,
      text: "2.1-2.5L"
    }, {
      id: 5,
      text: "2.6-3.0L"
    }, {
      id: 6,
      text: "3.0-4.0L"
    }, {
      id: 7,
      text: "4.0L以上"
    }],
    choEmissions: '',
    seatsList: [{
      id: 1,
      text: "2座"
    }, {
        id: 2,
        text: "4座"
      }, {
        id: 3,
        text: "5座"
      }, {
        id: 4,
        text: "6座"
      }, {
        id: 5,
        text: "7座"
      }, {
        id: 6,
        text: "7座以上"
      }],
      choSeats:""
  },
  // 预算事件
  budgetChoose(e) {
    console.log(e)
    if (this.data.budgetActive != e.target.dataset.id) {
      this.setData({
        budgetActive: e.target.dataset.id,
        budget: e._relatedInfo.anchorTargetText
      })
      return;
    }
    this.setData({
      budgetActive: 99,
      budget: ""
    })
  },
  //级别选择事件
  chooseCarLevel(e) {
    var checked = e.detail.value;
    //console.log(checked)
    this.setData({
      carLevelArr: checked.join("/")
    })
    //console.log(this.data.carLevelArr)
    var changed = {}
    for (var i = 0; i < this.data.carLevelList.length; i++) {
      if (checked.indexOf(this.data.carLevelList[i].text) !== -1) {
        changed['carLevelList[' + i + '].checked'] = true
      } else {
        changed['carLevelList[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  //国别选择事件
  chooseNationality(e) {
    var checked = e.detail.value;
    //console.log(checked)
    this.setData({
      choNationality: checked.join("/")
    })
    //console.log(this.data.carLevelArr)
    var changed = {}
    for (var i = 0; i < this.data.nationalityList.length; i++) {
      if (checked.indexOf(this.data.nationalityList[i].text) !== -1) {
        changed['nationalityList[' + i + '].checked'] = true
      } else {
        changed['nationalityList[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  //变数箱选择
  chooseGearbox(e) {
    var checked = e.detail.value;
    console.log(checked)
    this.setData({
      choGearbox: checked.join("/")
    })
    var changed = {}
    for (var i = 0; i < this.data.gearboxList.length; i++) {
      if (checked.indexOf(this.data.gearboxList[i].text) !== -1) {
        changed['gearboxList[' + i + '].checked'] = true
      } else {
        changed['gearboxList[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  //燃料选择
  chooseBunkers(e) {
    var checked = e.detail.value;
    console.log(checked)
    this.setData({
      choBunkers: checked.join("/")
    })
    var changed = {}
    for (var i = 0; i < this.data.bunkersList.length; i++) {
      if (checked.indexOf(this.data.bunkersList[i].text) !== -1) {
        changed['bunkersList[' + i + '].checked'] = true
      } else {
        changed['bunkersList[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  //结构选择
  chooseStructure(e) {
    var checked = e.detail.value;
    console.log(checked)
    this.setData({
      choStructure: checked.join("/")
    })
    var changed = {}
    for (var i = 0; i < this.data.structureList.length; i++) {
      if (checked.indexOf(this.data.structureList[i].text) !== -1) {
        changed['structureList[' + i + '].checked'] = true
      } else {
        changed['structureList[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  // 排量选择
  chooseEmissions(e){
    var checked = e.detail.value;
    console.log(checked)
    this.setData({
      choEmissions: checked.join("/")
    })
    var changed = {}
    for (var i = 0; i < this.data.emissionsList.length; i++) {
      if (checked.indexOf(this.data.emissionsList[i].text) !== -1) {
        changed['emissionsList[' + i + '].checked'] = true
      } else {
        changed['emissionsList[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  // 座位数选择
  chooseSeats(e){
    var checked = e.detail.value;
    console.log(checked)
    this.setData({
      choSeats: checked.join("/")
    })
    var changed = {}
    for (var i = 0; i < this.data.seatsList.length; i++) {
      if (checked.indexOf(this.data.seatsList[i].text) !== -1) {
        changed['seatsList[' + i + '].checked'] = true
      } else {
        changed['seatsList[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }
})