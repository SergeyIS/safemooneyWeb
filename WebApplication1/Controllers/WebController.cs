using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Filters;

namespace WebApplication1.Controllers
{
    [Culture]
    public class WebController : Controller
    {
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
                lang = "ru";
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
    }
}