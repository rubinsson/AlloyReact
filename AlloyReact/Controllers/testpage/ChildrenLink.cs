using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EPiServer.Core;
using EPiServer.Web.Routing;

namespace AlloyReact.Controllers.testpage
{
    public class ChildrenLink
    {
        public ChildrenLink(PageData pageData, string url)
        {
            Name = pageData.Name;
            ContentReference = pageData.ContentLink;
            Type = pageData.PageTypeName;
            Url = url;
        }

        public ContentReference ContentReference { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }
}