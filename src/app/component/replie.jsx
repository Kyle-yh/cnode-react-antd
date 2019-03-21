import React, { Component } from 'react';
import {crtTimeFtt,isLogin} from '../../utils/utils.js'
import { Input,Button,message,Icon } from 'antd';
import {sendReplies,thumbUp} from '../../utils/api'

class Replie extends Component{
    constructor(props){
        super(props);
        this.state = {
            replies:this.props.replies,
            id:this.props.id
        }
        console.log(props)
    }
    
    componentWillMount(){
        let replies = this.state.replies;
        for(let item of replies){
            item.isShowText = false
        }
        this.setState({
            replies
        })
    }

    showText(id){
        if(!isLogin()){
            message.error('您还未登录，登录后才能回复');
            return
        }
        console.log(id)
        let replies = this.state.replies;
        for(let item of replies){
            item.isShowText = false
            if(item.id == id){
                item.isShowText = true
            }
        }
        this.setState({
            replies
        })
    }

    changeText(id,e){
        console.log(id)
        console.log(e.target.value)
        let replies = this.state.replies;
        for(let item of replies){
            if(item.id == id){
                item.text = e.target.value
            }
        }
        this.setState({
            replies
        })
    }
    // 评论
    sendText(id){
        console.log(id)
        let replies = this.state.replies;
        for(let item of replies){
            if(item.id == id){
                if(!item.text){
                    message.warn('文本框不能为空')
                    return
                }
                var accesstoken = window.sessionStorage.getItem("accesstoken")
                var data = {
                    accesstoken,
                    content:item.text,
                    reply_id:item.reply_id
                }
                sendReplies(data,this.state.id).then((res)=>{
                    console.log(res)
                    if(res.success){
                        message.success('回复成功')
                        item.isShowText = false
                        this.setState({
                            replies
                        })
                    }
                })
            }
        }
        
    }
    // 点赞
    putUp(id){
        console.log(id)
        let replies = this.state.replies;
        for(let item of replies){
            if(item.id == id){
                var accesstoken = window.sessionStorage.getItem("accesstoken")
                var data= {
                    accesstoken
                }
                thumbUp(data,id).then((res)=>{
                    console.log(res)
                    if(res.success){
                        if(item.is_uped){
                            item.ups.splice(item.ups.length-1,item.ups.length)
                        }else{
                            item.ups.push(1)
                        }
                        item.is_uped = !item.is_uped
                        this.setState({
                            replies
                        })
                    }
                })
            }
        }
        
    }

    render(){
        let replies = this.state.replies;
        return(
            <div>
                {
                    replies.map((data)=>{
                        const {id, author, content, create_at, is_uped, reply_id, ups,isShowText} = data
                        let create_time = crtTimeFtt(create_at)
                        let upsLength = ups.length
                        return(
                            <div className="border-bottom mgt-20 pdb-30" key={id}>
                                <div>
                                    <img src={author.avatar_url} alt="" className="avatar_url"/>
                                    <span className="mgr-20">{author.loginname}</span>
                                    <span className="mgr-20">{create_time}</span>
                                    <span className="mgr-20" onClick={this.putUp.bind(this,id)}>
                                        <Icon type="like" theme={is_uped?'filled':''}/> {upsLength}
                                    </span>
                                    <span className="text-theme2 pointer" onClick={this.showText.bind(this,id)}>回复</span>
                                </div>
                                <div className="mgt-10" dangerouslySetInnerHTML={{__html:content}}></div>
                                {
                                    isShowText ? 
                                    (<div>
                                        <Input placeholder="请输入回复"  style={{'width':'500px'}} onChange={this.changeText.bind(this,id)}/>
                                        <Button onClick={this.sendText.bind(this,id)} type="primary" style={{'marginLeft':'10px'}}>发送</Button>
                                    </div>) :''
                                
                                }
                                
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default Replie;