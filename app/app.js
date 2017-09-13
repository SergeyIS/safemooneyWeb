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
                if(conf.data == null)
                    element.empty();

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