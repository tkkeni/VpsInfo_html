

window.onload = function() {
    let dataObject = [];
    for(var i = 0;i<=100;i++)
    {
        if(i> 10 && i< 50)
        {
            dataObject[i] = new Object();
            dataObject[i].x = moment.unix(1318781876 + 300 * i);
            dataObject[i].y = "Nan";
            continue;
        }
        dataObject[i] = new Object();
        dataObject[i].x = moment.unix(1318781876 + 300 * i);
        dataObject[i].y = Math.random() * 100;
    }
    Chart_New("Ping", $("#Chart_ping"), dataObject, "Ping", "Time", "ms", 500);
    Chart_New("networkIO", $("#Chart_networkIO"), dataObject, "NetworkIO", "Time", "MB/S", 100);
    setTimeout(function(){
        dataObject = [];
        for(var i = 0;i<=864;i++)
        {
            if(i> 100 && i< 150)
            {
                dataObject[i] = new Object();
                dataObject[i].x = moment.unix(1318781876 + 300 * i);
                dataObject[i].y = "Nan";
                continue;
            }
            dataObject[i] = new Object();
            dataObject[i].x = moment.unix(1318781876 + 300 * i);
            dataObject[i].y = Math.random() * 100;
        }
        Chart_update("Ping", dataObject);
    }, 2000);
};
