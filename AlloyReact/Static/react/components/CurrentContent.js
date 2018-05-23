import React from "react";
import { Route } from 'react-router-dom'
import ContentComponent from "../container/ContentComponent";

const CurrentContent = ({editmode, url, contentReference}) => {
    //When we are in editmode just render a ContentComponent and in viewmode register the route to the ContentComponent
    return editmode ? <ContentComponent contentReference={contentReference} /> : <Route path={url} exact render={() => <ContentComponent contentReference={contentReference} />} />;
};

export default CurrentContent; 