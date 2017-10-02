using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using WebApplication1.Infrastructure;
using WebApplication1.Controllers;

namespace WebApplication1
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            try
            {
                AreaRegistration.RegisterAllAreas();
                RouteConfig.RegisterRoutes(RouteTable.Routes);

                var remoteConfig = (RemoteConfig)ConfigurationManager.GetSection("remoteConfig");
                WebController.Configure(remoteConfig);
            }
            catch (Exception e)
            {

            }
        }
    }
}
