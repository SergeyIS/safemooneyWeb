using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
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
    }
}