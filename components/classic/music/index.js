// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'


Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
    // img: String,
    // content: String
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
