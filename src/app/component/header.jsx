import React, { Component } from 'react';
import { Layout, Menu} from 'antd';
import { BrowserRouter, Route, Link,Switch } from 'react-router-dom'
import {connect} from 'react-redux'
const { Header} = Layout;

class AppHeader extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            selectedKey: 'index',
            isAuthenticated: window.sessionStorage.getItem("userId") ? true: false
        }
    }

    
    componentWillMount(){
        let path = window.location.pathname.substr(1,window.location.pathname.length-1);
        console.log(path)
        if(!path){
            this.setState({
                selectedKey:'index'
            })
            return
        }
        this.setState({
            selectedKey:path
        })
    }
    // props修改后
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
        console.log(nextProps)
        this.setState({
            isAuthenticated: window.sessionStorage.getItem("userId")? true: false
        })
        if(this.state.isAuthenticated)
        this.setState({
            selectedKey:'mine'
        })
    }
    // 判断是否重新render组件,默认返回true
    componentWillUpdate(nextProps,nextState){
        console.log('componentWillUpdate')
        console.log(nextProps)
        console.log(nextState)
    }


    render(){
        let {isAuthenticated} = this.state
        return(
            <div>
            <Header style={{padding:'0 200px'}}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.state.selectedKey]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="index"><Link to="/index">首页</Link></Menu.Item>
              <Menu.Item key="edit"><Link to="/edit">编辑</Link></Menu.Item>
              <Menu.Item key="message"><Link to="/message">消息</Link></Menu.Item>
              {isAuthenticated ? (<Menu.Item key="mine" style={{float:'right'}}><Link to="/mine">我的</Link></Menu.Item>) :(
              <Menu.Item key="login" style={{float:'right'}}><Link to="/login">登录</Link></Menu.Item>) }
            </Menu>
          </Header>
          </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
      ...state
    }
  }
export default connect(mapStateToProps)(AppHeader);