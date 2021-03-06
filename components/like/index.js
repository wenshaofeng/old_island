// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      like: {
        type: Boolean,
        // value: false, 
        // observer: function() {
        // }
      },
      count: {
        type: Number
      }
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      yesSrc: 'images/like.png',
      noSrc: 'images/like@dis.png'
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      onLike: function (event) {
        let like = this.properties.like
        let count = this.properties.count
        count = like ? count - 1 : count + 1
        this.setData({
          count: count,
          like: !like
        })
        //自定义事件  激活自定义事件，给引用其的父组件调用
        let behavior = this.properties.like ? "like" : "cancel"
        this.triggerEvent('likes', {
          behavior: behavior
        }, {})
      }
    }
  })
  