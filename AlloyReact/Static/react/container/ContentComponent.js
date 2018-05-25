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
            <p data-epi-property-name="MainBody" dangerouslySetInnerHTML={{ __html: this.state.mainBody }}></p>
        );
    }
    componentDidMount() {
        fetch("/api/content?contentId=" + this.props.contentReference + "&language=" + this.props.language)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    mainBody: json.mainBody
                });
            });
    }
}