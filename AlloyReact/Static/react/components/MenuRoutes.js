import React from "react";
import { Route } from 'react-router-dom'
import ContentComponent from "../container/ContentComponent";

const MenuRoutes = ({editmode, menu, language}) => {

    //When we are in editmode dont register any routes since we use the regular routing.
    if(editmode) {
        return null;
    }

    return (
        <div>
            {
                //When we are not in editmode, register routes so the routing will work.
                menu.map((item, index) => {
                    return <Route path={item.url} key={index} exact render={() => <ContentComponent contentReference={item.contentReference} language={language}/>} />
                }) 
            }
        </div>
    );
};

export default MenuRoutes;