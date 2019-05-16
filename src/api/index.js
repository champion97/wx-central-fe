import Vue from "vue"

// 获取所有微信公众号
export function getWxAccountAll() {
    return Vue.axios.get('/wx-account/all')
}

// 获取微信公众号信息
export function getWxAccountByAppId(appId) {
    return Vue.axios.get(`/wx-account/${appId}`)
}

// 根据名称模糊搜索
export function searchByAppName(appName) {
    return Vue.axios.get(`/wx-account/search/${appName}`)
}

// 添加微信公众号
export function addWxAccount(wxAccount) {
    return Vue.axios.post('/wx-account', wxAccount)
}

// 创建公众号自定义菜单
export function addWxMenu(wxMenu) {
    return Vue.axios.post('/wx-menu', wxMenu)
}

// 获取公众号自定义菜单
export function getWxMenuByAppId(appId) {
    return Vue.axios.get(`/wx-menu/${appId}`)
}

// 获取素材列表
export function getMaterialList(appId, type, pageIndex, pageSize) {
    return Vue.axios.get(`/wx-material/list/${appId}/${type}/${pageIndex}/${pageSize}`)
}

// 获取图文素材信息
export function getMaterialNewsInfo(appId, mediaId) {
    return Vue.axios.get(`/wx-material/media/news/info/${appId}/${mediaId}`)
}

// 获取自动回复(按类型)
export function getAutoReplyByType(appId, type) {
    //0:关键字回复 1:被动回复 2:关注回复
    return Vue.axios.get(`/wx-auto-reply/${appId}/${type}`)
}

// 获取自动回复
export function getAutoReply(appId) {
    return Vue.axios.get(`/wx-auto-reply/${appId}`)
}

// 保存自动回复
export function saveAutoReply(autoReply) {
    return Vue.axios.put('/wx-auto-reply', autoReply)
}

// 删除自动回复
export function deleteAutoReply(id) {
    return Vue.axios.delete(`/wx-auto-reply/${id}`)
}

// 删除自动回复(按类型)
export function deleteAutoReplyByType(appId, type) {
    return Vue.axios.delete(`/wx-auto-reply/${appId}/${type}`)
}

// 群发消息给所有用户
export function massSendToAll(param) {
    return Vue.axios.post(`/wx-mass/2all`, param)
}