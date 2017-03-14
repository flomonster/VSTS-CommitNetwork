 VSS.require(["VSS/Service", "TFS/WorkItemTracking/RestClient"], function (VSS_Service, TFS_Wit_WebApi) {
    var witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);

    var repository = "9695907c-03cd-4876-976d-19cfe8bb4c58";

    var url = witClient._rootRequestPath + "DefaultCollection/_apis/git/repositories/";
    url += repository + "/commits?api-version=1.0&$top=1000";
    document.getElementById("commits_url").innerHTML+= "<a href=\"" + url + "\"> COMMITS </a>";
    console.log(witClient);
    var token = "7amudcmr43sbrwskgsdt7uju5cguo7tdnn3k2xek4hmgcfvraxoq";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true, password = btoa(token));

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
