using System.Web.Mvc;
using AlloyReact.Models.Pages;
using AlloyReact.Models.ViewModels;
using EPiServer;

namespace AlloyReact.Controllers
{
    public class TestPageController : PageControllerBase<TestPage>
    {
        public ActionResult Index(TestPage currentPage)
        {
            var model = PageViewModel.Create(currentPage);
            return View(model);
        }
    }
}