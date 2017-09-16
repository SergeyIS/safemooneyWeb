var mainApp = angular.module("mainApp");
mainApp.controller("mainController", function($scope)
{
    dataheap.startListening({userId: localStorage.getItem("userId"), token: localStorage.getItem("token")});
    $scope.logOut = function()
    {
        var id = localStorage.getItem("userId");
        var token = localStorage.getItem("token");
        
        $.ajax({
            url: "http://safemooney.azurewebsites.net/api/"+id+"/account/logout",
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr, settings)
            {
                xhr.setRequestHeader('Authorization', 'Basic ' + token);
            },
            success: function (data)
            {
                location.href = "signin.html";
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                if(jqXHR.status != 200)
                {
                    alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                }
                else
                {
                    location.href = "signin.html";
                }
            }
        });
    }
});
