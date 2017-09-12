var mainApp = angular.module("mainApp", []);

//data binding directive
mainApp.directive("bindConnect", function()
{
    return function(scope, element, attrs) {
        
        var conf = scope[attrs["bindConnect"]];

        setInterval(function()
        {
            if(conf == null || conf == undefined)
                return;

            //check for properties
            if(!(("isDataChanged" in conf) & ("data" in conf) & ("template" in conf)))
                return;

            if(conf.isDataChanged)
            {
                if(conf.data == null || conf.data == undefined || conf.template == null || conf.template == undefined)
                    return;

                element.empty();
                conf.template.tmpl(conf.data).appendTo(element);
                conf.isDataChanged = false;
            }
            
        }, 1000);
    }
});