using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using EPiServer;
using EPiServer.Core;

namespace AlloyReact.Controllers.testpage
{
    [RoutePrefix("api/content")]
    public class ContentApiController : ApiController
    {
        private readonly IContentLoader _contentLoader;

        public ContentApiController(IContentLoader contentLoader)
        {
            _contentLoader = contentLoader;
        }

        [HttpGet]
        [Route]
        public IHttpActionResult Get(string contentId)
        {
            var contentLink = ContentReference.Parse(contentId);
            var content = _contentLoader.Get<IContent>(contentLink);
            return Ok(content);
        }
    }
}