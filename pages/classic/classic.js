// pages/classic/classic.js
/* import {HTTP} from '../../util/http.js'
// import {HTTP} from '/util/http.js' // 错误 */
import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'



let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res => {
      console.log(res);
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLike: function (event) { // 监听的自定义事件
    console.log('aaa');

    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  onNext(event) {
    const type = 'next'
    this._updateClassic(type)
  },

  onPrev(event) {
    const type = 'previous'
    this._updateClassic(type)
  },

  _updateClassic(type) { // 切换ClassicPage 的内容
    let index = this.data.classicData.index
    classicModel.getClassic(index, type, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.ifLatest(res.index)
      })
    })
  },

  _getLikeStatus(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, res => {
      console.log(res);
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
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

  }
})