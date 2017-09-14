//dataheap is module that provides data for other modules
var transactDataObject = {
    isDataChanged: false,
    templateId: "#trlTmp", 
    data: null
};

var notifyDataObject = {
    isDataChanged: false,
    templateId: "#ntfTmpl", 
    data: null
};

var searchObject = {
    isDataChanged: false,
    templateId: "#usrTmpl",
    data: null
};
var dataheap = {

    transactData: transactDataObject,
    notifyData: notifyDataObject,
    searchData: searchObject,
    startListening: function(authData) //Listen server for transactions and notifications
    {
        setInterval(function()
        {
            transactDataObject.isDataChanged = true;
            transactDataObject.data = [
                {
                    username: "Username1",
                    firstname: "firstname1",
                    lastname: "lastname1",
                    count: Math.round(Math.random()*100)+"$",
                    date: "13.09.2017"
                },
                {
                    username: "Username2",
                    firstname: "firstname2",
                    lastname: "lastname2",
                    count: Math.round(Math.random()*100)+"$",
                    date: "13.09.2017"
                }
            ];

            notifyDataObject.isDataChanged = true;
            notifyDataObject.data = [
                {
                    username: "Username1",
                    firstname: "firstname1",
                    lastname: "lastname1",
                    count: "123.45$",
                    date: "13.09.2017"
                },
                {
                    username: "Username2",
                    firstname: "firstname2",
                    lastname: "lastname2",
                    count: "123.45$",
                    date: "13.09.2017"
                }
            ];
        }, 5000);
    },
    search: function(text, auth)
    {
        $.ajax({
            url: "http://safemooney.azurewebsites.net/api/" + auth.userId + "/transactions/getuserlist",
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr, settings) 
            {
                xhr.setRequestHeader('Authorization', 'Basic ' + auth.token);
            },
            success: function (data)
            {
                searchObject.isDataChanged = true;
                searchObject.data = data;
            },
            error: function (jqXHR, textStatus, errorThrown) 
            {
                if(jqXHR.status == 404)
                {
                    searchObject.isDataChanged = true;
                    searchObject.data = null;
                }
                else if(jqXHR.status != 200)
                {
                    alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                }
                else
                {
                    searchObject.isDataChanged = true;
                    searchObject.data = jqXHR.responseText;
                }
            }
        });
    },

    cleanSrc: function(){ searchObject.data = null; searchObject.isDataChanged = true; }
};


