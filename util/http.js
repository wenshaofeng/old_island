import config from '../config.js'

const tips = {
    1: '抱歉，出现一个错误',
    1005: 'appkey无效'
}

class HTTP {
    request(params) {
        if (!params.method) { // 默认设置 et请求
            params.method = 'GET'
        }
        wx.request({
            url: config.baseUrl + params.url,
            data: params.data,
            header: { // 设置请求的 header
                'content-type': 'application/json',
                'appkey': config.AppKey
            },
            method: params.method,
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                let code = result.statusCode.toString()
                if (code.startsWith('2')) {
                    params.success && params.success(result.data)
                } else {  // 服务器异常
                    let error_code = result.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: () => { // API调用失败
                this._show_error(1)
            }
        });
    }

    _show_error(error_code) {
        if (!error_code) {
            error_code = 1;
        }
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}

export { HTTP } 