var mainApp = angular.module("mainApp", []);
//data binding directive
mainApp.directive("bindConnect", function()
{
    return function(scope, element, attrs) {
        var conf = dataheap[attrs["bindConnect"]];

        setInterval(function()
        {
            if(conf == null || conf == undefined)
                return;

            //check for properties
            if(!(("isDataChanged" in conf) & ("data" in conf) & ("templateId" in conf)))
                return;

            
            if(conf.isDataChanged)
            {
                if(conf.data == null || conf.data == "")
                {
                    element.empty();
                    conf.isDataChanged = false;
                    return;
                }
                    

                if(conf.data == undefined || conf.templateId == null || conf.templateId == undefined)
                    return;

                element.empty();
                var ui = $(conf.templateId);
                ui.tmpl(conf.data).appendTo(element);
                conf.isDataChanged = false;
            }
            
        }, 1000);
    }
});

//network configuration
//var host = "http://localhost:50266"
var host = "http://safemooney.azurewebsites.net";