using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EPiServer;
using EPiServer.Core;
using EPiServer.Globalization;
using EPiServer.Web;
using EPiServer.Web.Routing;

namespace AlloyReact.Controllers.testpage
{
    [RoutePrefix("api/tree")]
    public class ContentTreeApiController : ApiController
    {
        private readonly IContentLoader _contentLoader;
        private readonly IUrlResolver _urlResolver;

        public ContentTreeApiController(IContentLoader contentLoader, IUrlResolver urlResolver, LanguageResolver languageResolver)
        {
            _contentLoader = contentLoader;
            _urlResolver = urlResolver;
        }

        [HttpGet]
        [Route]
        public IHttpActionResult Get(string contentId, string language)
        {
            var languageBranch = CultureInfo.GetCultureInfo(language);
            var parent = _contentLoader.Get<PageData>(new ContentReference(contentId), languageBranch);

            var children = _contentLoader
                .GetChildren<PageData>(parent.ContentLink, languageBranch)
                .Select(CreateContentTreeLinkItem);

            var test = CreateContentTreeLink(parent, children);

            return Ok(test);
        }

        private ParentLink CreateContentTreeLink(PageData page, IEnumerable<ChildrenLink> children)
        {

            return new ParentLink(GetUrl(page.ContentLink, page.Language), children);
        }

        private ChildrenLink CreateContentTreeLinkItem(PageData page)
        {
            return new ChildrenLink(page, GetUrl(page.ContentLink, page.Language));
        }

        private string GetUrl(ContentReference contentLink, CultureInfo languageBranch)
        {
            var contextMode = IsInEditMode() ? ContextMode.Edit : ContextMode.Default;
            return _urlResolver.GetUrl(contentLink, languageBranch.Name, new UrlResolverArguments { ContextMode = contextMode });
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