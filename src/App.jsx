import React, { Component } from 'react';

import Index from './app/index/index'
import Edit from './app/edit/edit'
import Message from './app/message/message'
import Appheader from './app/component/header'
import Detail from './app/detail/detail'
import Login from './app/login/login'
import Mine from './app/mine/mine'
import PrivateRoute from './app/privateRoute/privateRoute'

import { BrowserRouter, Route, Link,Switch,Redirect  } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;



class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillMount(){
    console.log(this)
  }

  render() {
    return (
      <div>
        <BrowserRouter>
        <Layout className="layout">
          <Appheader />
        <Content className="pdlr-200">
            <div className="content">
              
                <Switch>
                  <Route exact path="/index" component={Index}/>
                  <PrivateRoute path='/edit' component={Edit}/>
                  <PrivateRoute path='/message' component={Message}/>
                  <PrivateRoute path='/mine' component={Mine}/>
                  <Route path='/detail/:id' component={Detail}/>
                  <Route path='/login' component={Login}/>
                  <Redirect from="/" to="/index" />
                </Switch>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' ,background: '#000',color:'#fff'}}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      </BrowserRouter>
      </div>
    );
  }
}



export default App;
