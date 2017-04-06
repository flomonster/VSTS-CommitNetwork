VSS.ready(() => {
VSS.require(["VSS/Service", "TFS/VersionControl/GitRestClient"], function (VSS_Service, TFS_Git_WebApi)
   {
    var client = VSS_Service.getClient(TFS_Git_WebApi.GitHttpClient);
    client.getRepositories().then(
        function(repos)
        {
           client.getCommits(repos[0].id, {$top: 5}, null, null, 1000).then(
            function(commits)
            {
              	//commits = JSON.stringify(commits);
              	console.log(commits[0]);
		        if (commits.length == 1000)
                    console.log("Too many commits");
                else
                {
                    g = new Graph(commits[0].message, "swapme <athawale.1@iitj.ac.in>", "Merge to master", "23/03/2017", "https://www.google.fr/", [], true);
                    displayGraph(g);
                }
            });

        });
      });
});
