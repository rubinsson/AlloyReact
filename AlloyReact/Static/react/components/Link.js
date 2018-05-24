import React from "react";
import {
    Link as ReactLink
  } from 'react-router-dom'

const Link = ({editmode, url, name}) => {
    return (
        <li>
        {
            //When we are in editmode load an regular link and when we are in viewmode render a react router link.
            editmode ? <a href={url}>{name}</a> : <ReactLink to={{ pathname: url }}>{name}</ReactLink>
        }
        </li>
    );
};

export default Link; 