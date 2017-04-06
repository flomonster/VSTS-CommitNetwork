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
                    console.log(commits[1].parents);
                    var dic = {};
                    for (var i = 0; i < commits.length; i++)
                    {
                        var merge = commits[i].parents && commits[i].parents.size() > 1;
                        var date = commits[i].author.date.getFullYear();
                        date = date * 100 + commits[i].author.date.getMonth();
                        date = date * 100 + commits[i].author.date.getDate();
                        date = date * 100 + commits[i].author.date.getHours();
                        date = date * 100 + commits[i].author.date.getMinutes();
                        date = date * 100 + commits[i].author.date.getSeconds();
                        dic[commits[i].commitId] = new Graph(commits[i].commitId, commits[i].author.name, commits[i].comment, date, commits[i].remoteUrl, [], merge);
                    }
                }
            });

        });
      });
});
