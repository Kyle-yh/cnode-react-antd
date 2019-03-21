import {message} from 'antd'
const api_url = 'https://cnodejs.org/api/v1'
function getDateDiff(date){
    let result = ''
    let dateTimeStamp = new Date(date).getTime();
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){
    //若日期不符则弹出窗口告之
    //alert("结束日期不能小于开始日期！");
    }
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
        result="" + parseInt(monthC) + "个月前";
    }
    else if(weekC>=1){
        result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"个小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else
    result="刚刚";
    return result;
}

const crtTimeFtt=(val, row) =>{
    if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
}

const isLogin = ()=>{
  if(window.sessionStorage.getItem("userId")){
    return true
  }else{
    return false
  }
}


function checkStatus(res) {
    if (res.status < 200 || res.status > 300) throw new Error('出错了')
    else return res.json()
  }


const request = (url, data={},type='get') => {
    if(type == 'get'){
      //请求参数变为字符串
      var paramStr = '?'
      for(let key in data){
        paramStr += key + '=' + data[key] + '&'
      }
      paramStr = paramStr.substr(0,paramStr.length-1)
      return new Promise((resolve, reject)=>{
        fetch(`${api_url}${url}${paramStr}`)
        .then(res=>{
          return res.json()
        }).then(res=>{
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          reject(err)
          message.error('请求失败')
        })
      })
    }else{
      return new Promise((resolve, reject)=>{
        fetch(`${api_url}${url}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res=>{
            return res.json()
          }).then(res=>{
            resolve(res)
          })
          .catch(err => {
            reject(err)
            message.error('请求失败')
          })
      })
    }
    // if (!data)
    //   return fetch(`${api_url}${url}`)
    //     .then(res => {
    //       return checkStatus(res)
    //     })
    //     .catch(error => {
    //       message.error('请求失败')
    //     })
    // else
    //   return fetch(`${api_url}${url}`, {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   })
    //     .then(res => {
    //       return checkStatus(res)
    //     })
    //     .catch(error => {
    //       message.error('请求失败')
    //     })
  }
export{
    getDateDiff,
    crtTimeFtt,
    request,
    isLogin
}
