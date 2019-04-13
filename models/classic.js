import { HTTP } from '../util/http'
class ClassicModel extends HTTP {
  getLatest(sCallback) { // 获取最新期刊
    this.request({
      url: 'classic/latest',
      success: (data) => {
        // 如果不用箭头函数，this将指代不正确
        sCallback(data)
        this._setLatestIndex(data.index) // 缓存最新一期期刊的编号
        let key = this._getKey(data.index) 
        wx.setStorageSync(key, data) // 缓存当前期刊
      }
    })
  }

  getClassic(index, type, sCallback) {//获取上/下 一期期刊
    let key = type === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key) 
    if (!classic) { // 如果缓存中没有，才发请求
      this.request({
        url: `classic/${index}/${type}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }

  isFirst(index) {
    return index === 1
  }

  ifLatest(index) {
    let latest = this._getLatestIndex()
    return index === latest
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }

}

export { ClassicModel }