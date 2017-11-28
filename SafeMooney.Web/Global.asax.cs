using System;
using System.Web.Mvc;
using System.Configuration;
using System.Web.Routing;
using SafeMooney.Web.Infrastructure;
using SafeMooney.Web.Controllers;

namespace SafeMooney.Web
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
                //todo: write log
            }
        }
    }
}
