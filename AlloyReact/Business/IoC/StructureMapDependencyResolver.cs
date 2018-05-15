using System.Web.Http.Dependencies;
using StructureMap;

namespace AlloyReact.Business.IoC
{
    public class StructureMapDependencyResolver : StructureMapDependencyScope, IDependencyResolver, System.Web.Mvc.IDependencyResolver
    {
        public StructureMapDependencyResolver(IContainer container) : base(container) { }

        public IDependencyScope BeginScope()
        {
            var childContainer = Container.GetNestedContainer();
            return new StructureMapDependencyScope(childContainer);
        }
    }
}