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
var vkSearchObject = {
    isDataChanged: false,
    templateId: "#vkUsrTmpl",
    data: null
};
var searchModeEnum = {
    local: "local",
    global: "global"
};
var dataheap = {

    transactData: transactDataObject,
    notifyData: notifyDataObject,
    searchData: searchObject,
    vkSearchData: vkSearchObject,
    startListening: function(auth) //Listen server for transactions and notifications
    {
        setInterval(function()
        {
            $.ajax({
                url: host+ "/api/" + auth.userId + "/transactions/fetch",
                type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr, settings) 
                {
                    xhr.setRequestHeader('Authorization', 'Basic ' + auth.token);
                },
                success: function (data)
                {
                    transactDataObject.isDataChanged = true;
                    transactDataObject.data = data;
                },
                error: function (jqXHR, textStatus, errorThrown) 
                {
                    if(jqXHR.status == 404)
                    {
                        transactDataObject.isDataChanged = true;
                        transactDataObject.data = null;
                    }
                    else if(jqXHR.status != 200)
                    {
                        alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                        if (jqXHR.status == 401)
                            location.href = "./signin"
                    }
                    else
                    {
                        transactDataObject.isDataChanged = true;
                        transactDataObject.data = jqXHR.responseText;
                    }
                }
            });

            $.ajax({
                url: host + "/api/" + auth.userId + "/transactions/checkqueue",
                type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr, settings) 
                {
                    xhr.setRequestHeader('Authorization', 'Basic ' + auth.token);
                },
                success: function (data)
                {
                    notifyDataObject.isDataChanged = true;
                    notifyDataObject.data = data;
                },
                error: function (jqXHR, textStatus, errorThrown) 
                {
                    if(jqXHR.status == 404)
                    {
                        notifyDataObject.isDataChanged = true;
                        notifyDataObject.data = null;
                    }
                    else if(jqXHR.status != 200)
                    {
                        alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                        if (jqXHR.status == 401)
                            location.href = "./signin"
                    }
                    else
                    {
                        notifyDataObject.isDataChanged = true;
                        notifyDataObject.data = jqXHR.responseText;
                    }
                }
            });
        }, 5000);
    },
    search: function(text, auth)
    {
        if(text == "")
            return;
        
        //start animation
        $("#loader").removeClass("hide");
     
        //find out the mode
        if (this.searchMode == searchModeEnum.global)
        {
            $.ajax({
                url: host + "/api/" + auth.userId + "/transactions/getuserlist?search=" + text,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + auth.token);
                },
                success: function (data) {
                    searchObject.isDataChanged = true;
                    searchObject.data = data;
                    $("#loader").addClass("hide");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 404 || jqXHR.status == 400) {
                        searchObject.isDataChanged = true;
                        searchObject.data = null;
                    }
                    else if (jqXHR.status != 200) {
                        alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                        if (jqXHR.status == 401)
                            location.href = "./signin"
                    }
                    else {
                        searchObject.isDataChanged = true;
                        searchObject.data = jqXHR.responseText;
                        $("#loader").addClass("hide");
                    }
                }
            });
        }
        else if (this.searchMode == searchModeEnum.local)
        {
            $.ajax({
                url: host + "/api/" + auth.userId + "/services/vk/search?query=" + text,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + auth.token);
                },
                success: function (data) {
                    vkSearchObject.isDataChanged = true;
                    vkSearchObject.data = data;
                    $("#loader").addClass("hide");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 404 || jqXHR.status == 400) {
                        vkSearchObject.isDataChanged = true;
                        vkSearchObject.data = null;
                    }
                    else if (jqXHR.status != 200) {
                        alert("There's some problem with your data or connection. Server returned status code: " + jqXHR.status);
                        if (jqXHR.status == 401)
                            location.href = "./signin"
                    }
                    else {
                        vkSearchObject.isDataChanged = true;
                        vkSearchObject.data = jqXHR.responseText;
                        $("#loader").addClass("hide");
                    }
                }
            });
        }
       
    },
    cleanSrc: function () { searchObject.data = null; searchObject.isDataChanged = true; vkSearchObject.data = null; vkSearchObject.isDataChanged = true; },
    searchMode: "global"
};


