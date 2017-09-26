var mainApp = angular.module("mainApp");
mainApp.controller("mainController", function($scope)
{
    dataheap.startListening({userId: localStorage.getItem("userId"), token: localStorage.getItem("token")});
    $scope.logOut = function()
    {
        var id = localStorage.getItem("userId");
        var token = localStorage.getItem("token");
        
        $.ajax({
            url: host + "/api/" + id + "/account/logout",
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr, settings)
            {
                xhr.setRequestHeader('Authorization', 'Basic ' + token);
            },
            success: function (data)
            {
                location.href = "signin";
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                if(jqXHR.status != 200)
                {
                    alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                }
                else
                {
                    location.href = "signin";
                }
            }
        });
    }
    $scope.account = {
        userdata : {
            firstname: "Sergey",
            lastname: "Sidorov",
            username: "SergeyIS",
            oldpassword : "",
            newpassword: ""
        }
    };

    $scope.changeUserInfo = function(){
        
        var id = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        $.ajax({
            url: host + "/api/" + id + "/account/changeuserinfo",
            type: 'POST',
            dataType: 'json',
            data: $scope.account.userdata,
            beforeSend: function (xhr, settings)
            {
                xhr.setRequestHeader('Authorization', 'Basic ' + token);
            },
            success: function (data)
            {
                localStorage.setItem("username", data["Username"]);
                localStorage.setItem("firstName", data["FirstName"]);
                localStorage.setItem("lastName", data["LastName"]);

               alert("User's data was changed");
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
            }
        });
    };

    $scope.changePassword = function(){
        var id = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        $.ajax({
            url: host + "/api/" + id + "/account/changepass",
            type: 'POST',
            dataType: 'json',
            data: {oldpassword: $scope.account.userdata.oldpassword, newpassword: $scope.account.userdata.newpassword},
            beforeSend: function (xhr, settings)
            {
                xhr.setRequestHeader('Authorization', 'Basic ' + token);
            },
            success: function (data)
            {
               alert("User's data was changed");
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                if(jqXHR.status != 200)
                {
                    alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                }
                else
                {
                    alert("User's data was changed");
                }
            }
        });
    }
    
});
