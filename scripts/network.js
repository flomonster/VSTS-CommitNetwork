 VSS.require(["VSS/Service", "TFS/WorkItemTracking/RestClient"], function (VSS_Service, TFS_Wit_WebApi) {
    var witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
    console.log(witClient);

    var repository = "e3bd020e-a357-42f3-8da2-fb5880201dbd";

    var url = witClient._rootRequestPath + "DefaultCollection/_apis/git/repositories/";
    url += repository + "/commits?api-version=1.0";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
      if (xhr.status == 200)
      {
        console.log(xhr.responseText);
        //var response = JSON.parse(xhr.responseText);
      }
      else
        console.log("STATUS : " + xhr.status);
    };

    xhr.send(null);
});
