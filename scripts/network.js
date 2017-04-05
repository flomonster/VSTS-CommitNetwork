VSS.ready(() => { 
VSS.require(["VSS/Service", "TFS/VersionControl/GitRestClient"], function (VSS_Service, TFS_Git_WebApi)
   {
    var client = VSS_Service.getClient(TFS_Git_WebApi.GitHttpClient);
    //var repoID = "9695907c-03cd-4876-976d-19cfe8bb4c58";
    client.getRepositories().then(
        function(repos)
        {
           client.getCommits(repos[0].id, {$top: 5}).then(
            function(commits)
            {
              console.log(commits);
            });

        });
      });
});
