var mainApp = angular.module("mainApp", []);
mainApp.factory("dataService", function($http)
{
    //get auth data from localStorage
    //check if data is correct
    //request transactions
    //return transactions 

    return {
        getTransactions: function()
        {
            var id = localStorage.getItem("userId");
            var token = localStorage.getItem("token");
            var deferred = $q.defer();
            $.ajax({
                url: 'http://safemooney.azurewebsites.net/api/' + id + '/transactions/fetch/',
                 type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr, settings) 
                {
                    xhr.setRequestHeader('Authorization', 'Basic ' + token);
                },
                success: function (data)
                {
                    
                },
                error: function (jqXHR, textStatus, errorThrown) 
                {
                    if(jqXHR.status != 200)
                    {
                        alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                    }
                    else
                    {
                    }
                }
            });
        },
        findUsers: function(search){},
        getNotifications : function(){}
    };
});