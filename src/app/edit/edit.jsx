import React,{Component} from 'react';


class Edit extends Component{
    constructor(props) {
        super(props);
        this.state = {
          editorHtml: '',
          editorText: '',
        }
      }

    componentWillMount(){

    }

    
    render(){
        console.log(this)
        return(
            <div>edit</div>
        )
    }
}

export default Edit;