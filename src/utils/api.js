import {request} from './utils'
//主页
const getIndex = (data) =>{
    return request('/topics',data)
}
//详情
const getDetail = (data) =>{
    return request(`/topic/${data.id}`)
}
// 登录
const login = (data) =>{
    return request(`/accesstoken`,data,'post')
}
// 个人中心
const getMine = (data) =>{
    return request(`/user/${data.loginname}`)
}
// 评论
const sendReplies = (data,id) =>{
    return request(`/topic/${id}/replies`,data,'post')
}
// 点赞
const thumbUp = (data,reply_id) => {
    return request(`/reply/${reply_id}/ups`,data,'post')
}


export{
    getIndex,
    getDetail,
    login,
    getMine,
    sendReplies,
    thumbUp
}