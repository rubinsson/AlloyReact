import React from "react";

export default class ReactBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mainBody: ""
        };
    }


    render() {
        return (
            <div>
                {this.state.mainBody}
            </div>
        );
    }
    componentDidMount() {
        fetch("/api/content?contentId=" + this.props.contentReference)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    mainBody: json.mainBody
                });
            });
    }
}