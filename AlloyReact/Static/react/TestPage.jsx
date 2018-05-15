import React from "react";
import ContentComponent from "./ContentComponent";
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

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
                    <ul>                
                    {
                        //Creating links to children
                        this.state.children.map((item, index) => <li key={index}><Link to={{ pathname: item.url }}>{item.name}</Link></li>)
                    }
                    </ul>
                    {
                        //Register routes for children
                        this.state.children.map((item, index) => <Route path={item.url} exact render={(props) => <ContentComponent contentReference={item.contentReference} />} key={index} />)

                        //Register route for parent
                    }
                    <Route path={this.state.url} exact render={() => <ContentComponent contentReference={this.props.contentReference} />}/>
                </div>
            </Router>
        );
    }

    componentDidMount() {
        fetch("/api/tree?contentId=" + this.props.contentReference)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    url: json.url,
                    editurl: json.editurl,
                    children: json.children
                });
            });
    }
}