import React from "react";
import {
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

export default Link; 