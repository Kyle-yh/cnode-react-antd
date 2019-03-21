import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        console.log(this.props)
        this.state = {
            isAuthenticated: window.sessionStorage.getItem("userId") ? true: false
            // isAuthenticated: props.SetUserID.UserID ? true: false
        }
    }

    componentWillMount() {
        if(!this.state.isAuthenticated){
            const {history} = this.props;
            setTimeout(() => {
                history.replace("/login");
            }, 1000)
        }
    }

    render() {
        let { component: Component, ...rest} = this.props;
        console.log(rest)
        return  this.state.isAuthenticated ? 
        (<Route {...rest} render={(props) => ( <Component {...props} /> 
            )}/> ) : (<p style = {{"width": "100%", "textAlign": "center", "fontSize": "20px", "lineHeight": "50px"}}>请登录...</p>)

    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
      ...state
    }
  }
export default connect(mapStateToProps)(withRouter(PrivateRoute));