using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EPiServer.Core;

namespace AlloyReact.Controllers.testpage
{
    public class ParentLink
    {

        public ParentLink(string url, IEnumerable<ChildrenLink> children)
        {
            Url = url;
            Children = children;

        }

        public string Url;

        public IEnumerable<ChildrenLink> Children { get; set; }
    }
}