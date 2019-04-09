import config from '../config.js'

const tips = {
    1: '抱歉，出现一个错误',
    1005: 'appkey无效'
}

class HTTP {
    request({
        url,
        data = {},
        method = 'GET'
    }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }

    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: config.baseUrl + url,
            data: data,
            header: { // 设置请求的 header
                'content-type': 'application/json',
                'appkey': config.AppKey
            },
            method: method,
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                let code = result.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject()
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: () => {
                reject()
                this._show_error(1)
            },
            complete: () => { }
        });
    }

    _show_error(error_code) {
        if (!error_code) {
            error_code = 1;
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    HTTP
}