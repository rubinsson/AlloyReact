import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import ContentComponent from "./container/ContentComponent";
import Link from "./components/Link"
import ChildrenRoutes from "./components/ChildrenRoutes"
import CurrentContent from "./components/CurrentContent"

export default class ReactBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: "",
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
                        this.state.children.map((item, index) => {
                            return <Link editmode={this.props.editMode} url={item.url} name={item.name} key={index}/>
                        })
                        
                    }
                    </ul>
                    <ChildrenRoutes editmode={this.props.editMode} children={this.state.children} />
                    <CurrentContent editmode={this.props.editMode} url={this.state.url} contentReference={this.props.contentReference} />
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