import React,{Component} from 'react';
import {crtTimeFtt} from '../../utils/utils.js'
import Replie from '../component/replie'
import {getDetail} from '../../utils/api'
import { Input,Button,message } from 'antd';
import {sendReplies} from '../../utils/api'
const { TextArea } = Input;
class Detail extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            id:props.match.params.id,
            detail:{},
            text:''
        }
    }
    
    getDetail(id){
        getDetail({id}).then(res=>{
            console.log(res)
            this.setState({
                detail:res.data
            })
        })
    }

    changeArea(e){
        
        this.setState({
            text:e.target.value
        })
    }

    sendReplies(){
        if(!this.state.text){
            message.warn('文本框不能为空')
            return
        }
        var accesstoken = window.sessionStorage.getItem("accesstoken")
        var data = {
            accesstoken,
            content:this.state.text,
        }
        sendReplies(data,this.state.id).then((res)=>{
            console.log(res)
            if(res.success){
                message.success('评论成功')
            }
        })
    }

    componentWillMount(){
        this.getDetail(this.state.id)
    }

    render(){
        let { author,author_id,content,create_at,good,id,is_collect,last_reply_at,reply_count,tab,title,top,visit_count,replies }= this.state.detail
        let create_time =  crtTimeFtt(create_at)
        let last_reply_time =  crtTimeFtt(last_reply_at)
        console.log(create_at)
        return(
            <div>
                <div>
                    <h1>{title}</h1>    
                    <div>
                        <img src={author?author.avatar_url:''} alt="" className="avatar_url"/>
                        <span className="loginname mgr-10">{author?author.loginname:''}</span>
                        <span className="mgr-10 text-theme">{top ? '置顶' : ''}</span>
                        <span className="mgr-10">{good ? '精华' : ''}</span>
                        <span className="mgr-10">{is_collect ? '已收藏' : '收藏'}</span>
                        <span className="mgr-10">{visit_count}人看过</span>
                        <span className="mgr-10">创建时间：{create_time}</span>
                        <span className="mgr-10">最后一次查看：{last_reply_time}</span>
                    </div>
                </div>
                <div className="content">
                    <div dangerouslySetInnerHTML={{__html:content}}></div>
                    <div className="pdtb-30">
                        <TextArea rows={3} placeholder="请输入评论" onChange={this.changeArea.bind(this)}/>
                        <Button className="mgt-10" type="primary" onClick={this.sendReplies.bind(this)}>发送</Button>
                    </div>
                    <h3>评论({reply_count})</h3>
                    <div>
                        {replies ? <Replie replies={replies} id={id}/> : ''}
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;