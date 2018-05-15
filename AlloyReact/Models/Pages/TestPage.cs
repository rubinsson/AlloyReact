using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace AlloyReact.Models.Pages
{
    [SiteContentType(GUID = "9CCC8A41-5C8C-4BE0-8E73-520FF9DE8267")]
    [SiteImageUrl(Global.StaticGraphicsFolderPath + "page-type-thumbnail-standard.png")]
    public class TestPage : SitePageData
    {
        [Display(
            GroupName = SystemTabNames.Content,
            Order = 310)]
        [CultureSpecific]
        public virtual XhtmlString MainBody { get; set; }

    }
}
