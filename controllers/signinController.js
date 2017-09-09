var mainApp = angular.module("mainApp");
mainApp.controller("signinController", function($scope)
{
    $scope.signIn = function(form)
    {
        $.ajax({
            url: 'http://localhost:50266/api/account/login/',
            type: 'POST',
            dataType: 'json',
            data: {Username: form.username, Password: form.password },
            success: function (data) {
                console.log(data.Access_Token);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        
    }; 
});