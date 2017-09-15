var mainApp = angular.module("mainApp");
mainApp.controller("signinController", function($scope)
{
    $scope.signIn = function(form)
    {
        try
        {
            $("#loader").removeClass("hidde");
            $("#signInBtn").attr("disabled", true);

            $.ajax({
                url: host + "/api/account/login/",
                type: "POST",
                dataType: "json",
                data: {Username: form.username, Password: form.password },
                success: function (data) 
                {
                    localStorage.setItem("userId", data["UserId"]);
                    localStorage.setItem("username", data["Username"]);
                    localStorage.setItem("firstName", data["FirstName"]);
                    localStorage.setItem("lastName", data["LastName"]);
                    localStorage.setItem("token", data["Access_Token"]);

                    $("#loader").addClass("hidde");
                    location.href = "main.html";
                },
                error: function (jqXHR, textStatus, errorThrown) 
                {
                    alert("There's some problem with your data or connection");
                    $("#loader").addClass("hidde");
                    $("#signInBtn").attr("disabled", false);
                }
            });
        }
        catch(err)
        {
             $("#loader").addClass("hidde");
             $("#signInBtn").attr("disabled", false);
        }
        
    }; 
});