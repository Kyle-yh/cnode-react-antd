import React, { Component } from 'react';
import {Menu,Pagination,BackTop} from 'antd';
import {getDateDiff} from '../../utils/utils'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getIndex} from '../../utils/api'

let CheckTab=(props)=>{
  const tab = props.tab;
  switch(tab){
    case 'ask':
      return <span className="bg-4 fs12 white pd-2-5 radius-5">问答</span>;
      break;
    case 'share':
      return <span className="bg-3 fs12 white pd-2-5 radius-5">分享</span>;
      break;
    case 'job':
      return <span className="bg-2 fs12 white pd-2-5 radius-5">招聘</span>;
      break;
    case 'good':
      return <span className="bg-5 fs12 white pd-2-5 radius-5">精华</span>;
      break;
    default:
      return''
      break;
  }
}


class Index extends Component{
    constructor(props){
        super(props)
        console.log(props)
        
        this.state = {
          current: 'all',
          topicList:[],
          
        }
    }

    //切换导航
    handleClick = (e) => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
      this.getTopicsList({
        tab:e.key,
        page:1
      })
    }
    //获取列表
    getTopicsList(params){
      let {tab,page} = params
      var data = {
          tab,
          page,
          limit:20
      }
      getIndex(data).then((res)=>{
        console.log(res)
        if(res.success){
         this.setState({
           topicList:res.data
          })
          window.scrollTo(0,0)
          console.log(this.state.topicList)
        }
      })
    }
    
    componentWillMount(){
      console.log(this.props.accessToken)
    }

    componentDidMount(){
      console.log(this)
        this.getTopicsList({
          tab:'',
          page:1
        })
    }

    componentWillUnmount(){ 

    }

    onChange(page){
      console.log(this.state)      
      let {current} = this.state
      this.getTopicsList({
        tab:current,
        page:page
      })
      
    }
    
    


    render() {
      let topicList = this.state.topicList;
      console.log(topicList)
        return (
        <div>
             <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="all">
              全部
            </Menu.Item>
            <Menu.Item key="good">
              精华    
            </Menu.Item>
            <Menu.Item key="share">
              分享 
            </Menu.Item>
            <Menu.Item key="ask">
              问答
            </Menu.Item>
            <Menu.Item key="job">
              招聘  
            </Menu.Item>
          </Menu>
          <div className="contain">
            {
              topicList.map((data)=>{
              const {id, top, tab, good, title, author, reply_count, visit_count, create_at, last_reply_at} = data
                return(<div className="list-item" key={id}>
                  <Link className="title" to={`/detail/${id}`}>
                    {top ? <span className="bg-1 fs12 white pd-2-5 radius-5">置顶</span> : ''}
                    <CheckTab tab={tab}/>
                    <span className="text">{title}</span>
                  </Link>
                  <div className="author">
                      <img src={author.avatar_url} alt={author.loginname}/>
                      <span className="name">{author.loginname}</span>
                  </div>
                  <div className="bottom">
                    <span>{reply_count}条回复</span>
                    <span>{visit_count}人浏览过</span>
                    <span>{getDateDiff(last_reply_at)}</span>
                  </div>
              </div>)
              })
            }
          </div>
          <BackTop />
          <div style={{marginTop:50}}>
            <Pagination showQuickJumper defaultCurrent={1} total={1000} onChange={this.onChange.bind(this)} />
          </div>
        </div>
        );
    }
}
const mapStateToProps = state => {
  console.log(state)
  return {
    ...state
  }
}
export default connect(mapStateToProps)(Index);