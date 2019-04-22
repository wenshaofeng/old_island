import { HTTP } from '../util/http'

class LikeModel extends HTTP {
  // 点赞结果、点赞对象、点赞类型
  like(behavior, artId, category) {  // 点赞
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }

  getClassicLikeStatus(artId, category, sCallback) {  //  获取点赞的状态
    this.request({
      url: `classic/${category}/${artId}/favor`,
      success: sCallback
    })
  }
}

export { LikeModel } 