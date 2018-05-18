using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EPiServer;
using EPiServer.Core;
using EPiServer.Web;
using EPiServer.Web.Routing;

namespace AlloyReact.Controllers.testpage
{
    [RoutePrefix("api/tree")]
    public class ContentTreeApiController : ApiController
    {
        private readonly IContentLoader _contentLoader;
        private readonly IUrlResolver _urlResolver;

        public ContentTreeApiController(IContentLoader contentLoader, IUrlResolver urlResolver)
        {
            _contentLoader = contentLoader;
            _urlResolver = urlResolver;
        }

        [HttpGet]
        [Route]
        public IHttpActionResult Get()
        {
            var parent = _contentLoader.Get<PageData>(new ContentReference(163));

            var children = _contentLoader
                .GetChildren<PageData>(new ContentReference(163))
                .Select(CreateContentTreeLinkItem);

            var test = CreateContentTreeLink(parent, children);

            return Ok(test);
        }

        private ParentLink CreateContentTreeLink(PageData page, IEnumerable<ChildrenLink> children)
        {

            return new ParentLink(GetUrl(page.ContentLink), children);
        }

        private ChildrenLink CreateContentTreeLinkItem(PageData page)
        {
            return new ChildrenLink(page, GetUrl(page.ContentLink));
        }

        private string GetUrl(ContentReference contentLink)
        {
            var contextMode = IsInEditMode() ? ContextMode.Edit : ContextMode.Default;
            return _urlResolver.GetUrl(contentLink, null, new UrlResolverArguments { ContextMode = contextMode });
        }

        private bool IsInEditMode()
        {
            var queryString = ControllerContext.Request.GetQueryNameValuePairs();
            return queryString.Any(value =>
                string.Equals(value.Key, "epieditmode", StringComparison.OrdinalIgnoreCase) &&
                string.Equals(value.Value, Boolean.TrueString, StringComparison.OrdinalIgnoreCase));
        }
    }
}