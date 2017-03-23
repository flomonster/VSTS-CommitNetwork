VSS.require(["VSS/Service", "VSS/Authentication/Services", "TFS/VersionControl/GitRestClient"], function (VSS_Service, AuthenticationService, TFS_Wit_WebApi) {
    /*
    var authTokenManager = AuthenticationService.authTokenManager; 
    authTokenManager.getToken().then(function (token) {
      console.log(token);
    var header = authTokenManager.getAuthorizationHeader(token);
    var req = new XMLHttpRequest();
    var url = "https://extension-westworld.VisualStudio.com/DefaultCollection/_apis/projects?api-version=2.0";
    req.open("GET", url, true);
    req.setRequestHeader("Authorization", header); 
    req.onload = function () {
      console.log(req.status);
      if (req.status == 200)
        console.log(req.responseText);

    }
    req.send();
    });
    */
    var client = VSS_Service.getCollectionClient(TFS_Wit_WebApi.GitHttpClient);
    var repoID = "9695907c-03cd-4876-976d-19cfe8bb4c58";
    client.getCommits(repoID, null).then(
        function(commits)
        {
          console.log(commits);
        });
});
