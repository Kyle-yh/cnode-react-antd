import React,{Component} from 'react';
import {request,getDateDiff} from '../../utils/utils.js'
import {Avatar,Tabs,List} from 'antd'
import {getMine} from '../../utils/api'
class Mine extends Component{
    constructor(props){
        super(props)
        this.state = {
            loginInfo :JSON.parse(window.sessionStorage.getItem("userInfo")),
            userInfo:{}
        }
    }

    getUserInfo = async () => {
        console.log(this.state.loginInfo)
        let {loginInfo} = this.state
        try {
            let res = await getMine({loginname:loginInfo.loginname})
            console.log(res.data)
            this.setState({
                userInfo:res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }

    componentWillMount(){
        this.getUserInfo()
    }

    render(){
        const data = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2',
            },
            {
              title: 'Ant Design Title 3',
            },
            {
              title: 'Ant Design Title 4',
            },
          ];
        const TabPane = Tabs.TabPane;
        const {userInfo} = this.state
        console.log(userInfo)
        return(
            <div>
                <div className="author" style={{'textAlign':'center','marginTop':'50px'}}>
                    <Avatar src={userInfo.avatar_url}  style={{'width':'100px','height':'100px'}}/>
                    {/* <img src={userInfo.avatar_url} alt={userInfo.loginname}/> */}
                    <h2 className="name" style={{'margin':'20px 0 100px'}}>{userInfo.loginname}</h2>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="最近回复的文章" key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={userInfo.recent_replies}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={item.author.avatar_url} />}
                            title={<a href={'/detail/' + item.id}>{item.title}</a>}
                            description={'最近浏览：' + getDateDiff(item.last_reply_at)}
                            />
                        </List.Item>
                        )}
                    />
                    </TabPane>
                    <TabPane tab="最近浏览的文章" key="2">
                    <List
                        itemLayout="horizontal"
                        dataSource={userInfo.recent_topics}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={item.author.avatar_url} />}
                            title={<a href={'/detail/' + item.id}>{item.title}</a>}
                            description={'最近浏览：' + getDateDiff(item.last_reply_at)}
                            />
                        </List.Item>
                        )}
                    />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Mine;