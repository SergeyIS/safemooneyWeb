var mainApp = angular.module("mainApp");
mainApp.controller("signupController", function($scope)
{
    $scope.signUp = function(form)
    {
        try
        {
            //play download animation
            $("#loader").removeClass("hidde");
            $("#signUpBtn").attr("disabled", true);

            //request
            $.ajax({
                url: host + "/api/account/signup/",
                type: "POST",
                dataType: "json",
                data: {
                        Username: form.username,
                        Password: form.password,
                        FirstName: form.firstname,
                        LastName: form.lastname
                    },
                success: function (data) 
                {
                    tryLogin(form.username, form.password);
                },
                error: function (jqXHR, textStatus, errorThrown) 
                {
                    if(jqXHR.status != 200)
                    {
                        alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                        $("#signUpBtn").attr("disabled", false);
                        $("#loader").addClass("hidde");
                    }
                    else
                    {
                        tryLogin(form.username, form.password);
                    }
                }
            });
        }
        catch(e)
        {
            //stop download animation
            $("#loader").addClass("hidde");
            $("#signUpBtn").attr("disabled", false);
        }
        

        
        
    }; 
});


function tryLogin(username, password)
{
    $.ajax({
            url: host + "/api/account/login/",
            type: "POST",
            dataType: "json",
            data: {Username: username, Password: password },
            async: false,
            success: function (data) 
            {
                localStorage.setItem("userId", data["UserId"]);
                localStorage.setItem("username", data["Username"]);
                localStorage.setItem("firstName", data["FirstName"]);
                localStorage.setItem("lastName", data["LastName"]);
                localStorage.setItem("token", data["Access_Token"])

                location.href = "main.html";
                $("#loader").addClass("hidde");
                $("#signUpBtn").attr("disabled", false);
            },
            error: function (jqXHR, textStatus, errorThrown) 
            {
                alert("Internal error");
                $("#loader").addClass("hidde");
                $("#signUpBtn").attr("disabled", false);
            }
        });

        
}