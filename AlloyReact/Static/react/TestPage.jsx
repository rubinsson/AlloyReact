import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import ContentComponent from "./container/ContentComponent";
import Link from "./components/Link"
import MenuRoutes from "./components/MenuRoutes"
import ContentRoutes from "./components/ContentRoutes"

export default class ReactBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: "",
            menu: [],
        };
    }

    render() {
        return (
            <Router>
                <div>
                    <h1>React component</h1>
                    <ul>                
                    {
                        this.state.menu.map((item, index) => {
                            return <Link editmode={this.props.editMode} url={item.url} name={item.name} key={index}/>
                        })
                        
                    }
                    </ul>
                    <MenuRoutes editmode={this.props.editMode} menu={this.state.menu} language={this.props.language} />
                    <ContentRoutes editmode={this.props.editMode} url={this.state.url} contentReference={this.props.contentReference} language={this.props.language} />
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
                    menu: json.children
                });
            });
    }

    //When we are in editmode add epieditmode=true to the url
    getUrl() {
        let urlString = "/api/tree?contentId=" + this.props.contentReference + "&language=" + this.props.language;
        if (this.props.editMode) {
            urlString = `${urlString}&epieditmode=${this.props.editMode}`;
        }
        return urlString;
    }
}