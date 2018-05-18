import React from "react";
import ContentComponent from "./ContentComponent";
import {
    BrowserRouter as Router,
    Route,
    Link as ReactLink
  } from 'react-router-dom'

const Link = ({editmode, url, name}) => {
    return (
        <li>
        {
            editmode ? <a href={url}>{name}</a> : <ReactLink to={{ pathname: url }}>{name}</ReactLink>
        }
        </li>
    );
};

const RenderParent = ({editmode, url, contentReference}) => {
    return editmode ? <ContentComponent contentReference={contentReference} /> : <Route path={url} exact render={() => <ContentComponent contentReference={contentReference} />} />;
};

const RenderChildren = ({editmode, children}) => {
    
    if(editmode) {
        return null;
    }

    return (
        <div>
            {
                children.map((item, index) => {
                    return <Route path={item.url} key={index} exact render={() => <ContentComponent contentReference={item.contentReference} />} />
                }) 
            }
        </div>
    );
};

export default class ReactBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: "",
            editurl: "",
            children: [],
        };
    }

    render() {
        return (
            <Router>
                <div>
                    <h1>React component</h1>
                    <ul>                
                    {
                        //Creating links to children
                        this.state.children.map((item, index) => {
                            return <Link editmode={this.props.editMode} url={item.url} name={item.name} key={index}/>
                        })
                        
                    }
                    </ul>
                    <RenderChildren editmode={this.props.editMode} children={this.state.children} />
                    <RenderParent editmode={this.props.editMode} url={this.state.url} contentReference={this.props.contentReference} />
                </div>
            </Router>
        );
    }

    componentDidMount() {
        fetch(this.getUrl())
            .then(response => response.json())
            .then(json => {
                this.setState({
                    url: json.url,
                    children: json.children
                });
            });
    }

    getUrl() {
        let urlString = "/api/tree?contentId=" + this.props.contentReference;
        if (this.props.editMode) {
            urlString = `${urlString}&epieditmode=${this.props.editMode}`;
        }
        return urlString;
    }
}