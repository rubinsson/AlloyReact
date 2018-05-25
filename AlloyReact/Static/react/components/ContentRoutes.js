import React from "react";
import { Route } from 'react-router-dom'
import ContentComponent from "../container/ContentComponent";

const ContentRoutes = ({editmode, url, contentReference, language}) => {

    //When we are in editmode just load the contentcomponent and dont register any routes.
    if(editmode) {
        return <ContentComponent contentReference={contentReference} language={language} />;
    }

    //When we are in editmode, register routes so the routing will work.
    return <Route path={url} exact render={() => <ContentComponent contentReference={contentReference} language={language} />} />

};

export default ContentRoutes; 