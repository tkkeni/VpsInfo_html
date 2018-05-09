// 有关“空白”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkID=397704
// 若要在 cordova-simulate 或 Android 设备/仿真器上在页面加载时调试代码: 启动应用，设置断点，
// 然后在 JavaScript 控制台中运行 "window.location.reload()"。

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    $("button").click(
        function(){
            animate_progress("serverCard_", "load", Math.random());
        }
    )
    function onDeviceReady() {
        // 处理 Cordova 暂停并恢复事件
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova 已加载。在此处执行任何需要 Cordova 的初始化。
        //--------------------------------读取config.json--------------------------------
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

            console.log('file system open: ' + fs.name);
            fs.root.getFile("config.json", { create: true, exclusive: false }, function (fileEntry) {
                console.log("success");
                alert(123);
                
            }, onErrorCreateFile);

        }, onErrorLoadFs);
        //---------------------------------------------------------------------------------
    };
    function onErrorCreateFile(e) {
        console.log("onErrorCreateFile:" + e);
        alert("创建文件失败");
    }
    function onErrorLoadFs(e) {
        console.log("onErrorLoadFs:" + e);
    }
    function onPause() {
        // TODO: 此应用程序已挂起。在此处保存应用程序状态。
    };

    function onResume() {
        // TODO: 此应用程序已重新激活。在此处还原应用程序状态。
    };
})();
function writeConfig(fileEntry) {
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function () {
            console.log("Successful file write...");
            //readFile(fileEntry);
            readConfig(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        var dataObj = new Blob(['some file data'], { type: 'text/plain' });
        

        fileWriter.write(dataObj);
    });
}
function readConfig(fileEntry) {
    fileEntry.file(function (file) {
        let reader = new FileReader();

        reader.onloadend = function () {
            console.log("Successful file read: " + this.result);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
    function onErrorReadFile(e) { console.log("onErrorReadFile:" + e);}
}

function animate_progress(ServerID, targerProgressID, percentage)
{
    let Object = $("#" + ServerID + " #" + targerProgressID + " .progress_item");
    let OriginalWidth = $(".progress_background").width() * 0.825;
    Object.animate(
        {
            width: OriginalWidth * percentage
        }, 300, "swing");
}