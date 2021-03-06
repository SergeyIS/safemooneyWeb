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
                location.href = "./signin";
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                if(jqXHR.status != 200)
                {
                    alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                    if (jqXHR.status == 401)
                        location.href = "./signin"
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
            firstname: localStorage.getItem("firstName"),
            lastname: localStorage.getItem("lastName"),
            username: localStorage.getItem("username"),
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
                if(jqXHR.status == 401)
                    location.href = "./signin"
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
                    if (jqXHR.status == 401)
                        location.href = "./signin"
                }
                else
                {
                    alert("User's data was changed");
                }
            }
        });
    }
    $scope.changeSearchMode = function (switcherId) {

        if(dataheap.searchMode == "global")
        {
            dataheap.searchMode = "local"
            $("#" + switcherId).css("color", "#28a5f5");
        }
        else if(dataheap.searchMode == "local")
        {
            dataheap.searchMode = "global"
            $("#" + switcherId).css("color", "#999999");
        }
    };
    $scope.changeCulture = function (culture, item_id) {
        
        $.ajax({
            url: "./changeculture?lang=" + culture,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                location.href = "./main";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status != 200) {
                    alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                    if (jqXHR.status == 401)
                        location.href = "./signin"
                }
                else {
                    location.href = "./main";
                }
            }
        });
    };
    $scope.bindAccount = function () {
        document.cookie = "userId=" + localStorage.getItem("userId");
        //todo: use host parametr to provide data about current host
        location.href = "https://oauth.vk.com/authorize?client_id=6203708&display=page&redirect_uri=http://safemooneyweb.azurewebsites.net/web/bindaccount&scope=friends,offline&response_type=code&v=5.68"
    };
    $scope.sendInvention = function(email_id){
        var email = $("#" + email_id).val();

        $.ajax({
            url: host + "/api/" + localStorage.getItem("userId") + "/services/email/sendinvent?email=" + email + "&signup_url=safemooneyweb.azurewebsites.net/web/signup",
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem("token"));
            },
            success: function (data) {
                location.href = "./main";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status != 200) {
                    alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                    if (jqXHR.status == 401)
                        location.href = "./signin"
                }
            }
        });
    }
});
