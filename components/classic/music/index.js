// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    // img: String,
    content: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function (event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      console.log(this.properties);
      
      if (!this.data.playing) { // 点击播放/暂停
        this.setData({
          playing: true
        })
        if (mMgr.src === this.properties.src) {
          mMgr.play()
        }
        else {
          mMgr.src = this.properties.src
        }
        mMgr.title = this.properties.title
      }
      else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus(){  // 页面播放按钮恢复状态
      if(mMgr.paused){  
        this.setData({
          playing: false
        })
        return 
      }
      if(mMgr.src === this.properties.src) {
        if(!mMgr.paused){
          this.setData({
            playing:true 
          })
        }  
      }
    },

    _monitorSwitch () { // 后台播放控制与页面交互效果契合
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      }),
        mMgr.onEnded(() => {
          this._recoverStatus()
        })
    }


  }
})
