import React from "react";
import { Route } from 'react-router-dom'
import ContentComponent from "../container/ContentComponent";

const ChildrenRoutes = ({editmode, children}) => {
    //When we are in editmode dont register any routes since we use the regular routing.
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

export default ChildrenRoutes;