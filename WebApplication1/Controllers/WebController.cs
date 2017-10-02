using System;
using System.Collections.Generic;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Filters;
using WebApplication1.Infrastructure;

namespace WebApplication1.Controllers
{
    [Culture]
    public class WebController : Controller
    {
        private static RemoteConfig rmConfig;
        
        public static void Configure(RemoteConfig config)
        {
            rmConfig = config;
        }

        [HttpGet]
        public ActionResult SignIn()
        {
            return View();
        }

        [HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Main()
        {
            return View();
        }

        [HttpGet]
        public ActionResult EmptyQuery()
        {
            return Redirect("./web/main");
        }

        [HttpGet]
        public ActionResult ChangeCulture(string lang)
        {
            string returnUrl = Request.UrlReferrer.AbsolutePath;
            // culture list
            List<string> cultures = new List<string>() { "ru", "en", "zh" };
            if (!cultures.Contains(lang))
            {
                lang = "en";
            }
            // save our cookie
            HttpCookie cookie = Request.Cookies["lang"];
            if (cookie != null)
                cookie.Value = lang;   // if thre's cookie, save value
            else
            {

                cookie = new HttpCookie("lang");
                cookie.HttpOnly = false;
                cookie.Value = lang;
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            Response.Cookies.Add(cookie);

            return new HttpStatusCodeResult(200);
        }

        [HttpGet]
        public ActionResult BindAccount(String code)
        {
            if (String.IsNullOrEmpty(code))
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            //get cookie with userId
            HttpCookie userIdCookie = Request.Cookies["userId"];
            int idValue = -1;

            if(userIdCookie == null || String.IsNullOrEmpty(userIdCookie.Value) || 
                !Int32.TryParse(userIdCookie.Value, out idValue) || idValue < 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            //connect to remote server
            String url = $"{rmConfig.RemoteHost}/api/{idValue}/services/vk/addservice?code={code}";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            }
            catch (Exception e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
            }

            return Redirect("/web/main");
        }
    }
}