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
    search: function(text)
    {
        searchObject.isDataChanged = true;
        searchObject.data = [
            {
                username: Math.round(Math.random()*100),
                firstname: "firstname1",
                lastname: "lastname1"
            },
            {
                username: Math.round(Math.random()*100),
                firstname: "firstname2",
                lastname: "lastname2"
            },
            {
                username: Math.round(Math.random()*100),
                firstname: "firstname3",
                lastname: "lastname3"
            }
        ]
    },

    cleanSrc: function(){searchObject.data = null; searchObject.isDataChanged = true;}
};


