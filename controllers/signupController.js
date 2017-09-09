var mainApp = angular.module("mainApp");
mainApp.controller("signupController", function($scope)
{
    $scope.signUp = function(form)
    {
        $.ajax({
            url: 'http://safemooney.azurewebsites.net/api/account/signup/',
            type: 'POST',
            dataType: 'json',
            data: {
                    Username: form.username,
                    Password: form.password,
                    FirstName: form.firstname,
                    LastName: form.lastname
                 },
            success: function (data) 
            {
                location.href = "signin.html";
            },
            error: function (jqXHR, textStatus, errorThrown) 
            {
                if(jqXHR.status != 200)
                {
                    alert("There's some problem with connection");
                }
                else
                {
                    location.href = "signin.html";
                }
            }
        });
        
    }; 
});