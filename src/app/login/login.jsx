import React,{Component} from 'react';
import { Input, Icon,Button,message,Spin } from 'antd';
import {connect} from 'react-redux'
import {UserLogin, GetAccessToekn, SetUserStatus} from '../../redux/action'
import {login} from '../../utils/api'

class Login extends Component{
    constructor(props){
      super(props)
      console.log(props)
      console.log(this)
      this.changeUserName = this.changeUserName.bind(this)//绑定事件，否则报错
      this.login = this.login.bind(this)
      this.state = {
        accesstoken:'',
        isLoading:false
      }
    }
    // a8d50602-b30b-4639-bf41-9da83a3365da
    login(){
      const {history} = this.props;
      if(window.sessionStorage.getItem("userId")){//已登录时
        setTimeout(() => {
            history.replace("/mine");
        }, 1000)
      }
      const {GetAccessToken,UserLogin,SetUserStatus} = this.props
      let {accesstoken} = this.state
      if(!accesstoken){message.warning('请输入accesstoken'); return}
      this.setState({
        isLoading:true
      })
      login({accesstoken}).then(res=>{
        console.log(res)
        this.setState({
          isLoading:false
        })
        res.success ?message.success('登录成功') : message.error('错误的accesstoken');
        // redux
        GetAccessToken(accesstoken)
        UserLogin(res.id)
        SetUserStatus(true)
        // 本地存储
        window.sessionStorage.setItem("userId",res.id)
        window.sessionStorage.setItem("userInfo",JSON.stringify(res))
        window.sessionStorage.setItem("accesstoken",accesstoken)
        setTimeout(() => {
            history.replace("/mine");
        }, 1000)
      })
    }

    changeUserName(e){
      this.setState({
        accesstoken:e.target.value
      })
    }

    componentWillMount(){
      
    }

    render(){
        console.log(this.state)
        let {isLoading} = this.state
        return(
            <div>
                <div className="login-box">
                  <Input
                    placeholder="Enter your accesstoken"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={this.changeUserName}
                  />  
                  <div className="mgt-20">
                    <Button 
                      loading={isLoading}
                      type="primary" 
                      block
                      onClick={this.login}
                    >login</Button>
                  </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      ...state.UserID
    }
  }
const mapDispatchToProps = dispatch => {
    return {
      UserLogin: message => dispatch(UserLogin(message)),
      GetAccessToken: token => dispatch(GetAccessToekn(token)),
      SetUserStatus: off => dispatch(SetUserStatus(off))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Login);