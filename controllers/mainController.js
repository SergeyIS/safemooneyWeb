var mainApp = angular.module("mainApp");
mainApp.controller("mainController", function($scope)
{
    $scope.logOut = function()
    {
        var id = localStorage.getItem("userId");
        var token = localStorage.getItem("token");
        
        $.ajax({
            url: 'http://safemooney.azurewebsites.net/api/' + id + '/account/logout/',
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

    $scope.transConf = {
        isDataChanged: true,
        template: $('#transactionTempl'),
        data: [
            {
                firstname: "Petr",
                lastname: "Petrov",
                count: "12.34$",
                date: "12.09.2017"
            },
            {
                firstname: "Ivan",
                lastname: "Petrov",
                count: "12.34$",
                date: "12.09.2017"
            }
        ]
    };
    $scope.notifyConf = {
        isDataChanged: true,
        template: $('#notificationTempl'),
        data: [
            {
                firstname: "Petr",
                lastname: "Petrov",
                count: "12.34$",
                date: "12.09.2017"
            },
            {
                firstname: "Ivan",
                lastname: "Petrov",
                count: "12.34$",
                date: "12.09.2017"
            }
        ]
    };

    $scope.userlistConf = {
        isDataChanged: true,
        template: $('#userlistTempl'),
        data: [
            {
                firstname: "Petr",
                lastname: "Petrov",
                username: "Petro"
            },
            {
                firstname: "Ivan",
                lastname: "Petrov",
                username: "IvanPetrov"
            }
        ]
    };
});