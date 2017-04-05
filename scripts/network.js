VSS.ready(() => { 
VSS.require(["VSS/Service", "TFS/VersionControl/GitRestClient"], function (VSS_Service, TFS_Git_WebApi)
   {
    var client = VSS_Service.getClient(TFS_Git_WebApi.GitHttpClient);
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
