function linker(commits, dict)
{
  if (commits.length == dict.length)
  {
    for (var i = 0; i < commits.length; i++)
    {
      var commit = dic[commits[i].commitId];
      for (var p in commits[i].parents)
        dic[p].children.push(commit);
    }
    displayGraph(dic[commits[0].commitId]);
  }
}

VSS.ready(() => {
VSS.require(["VSS/Service", "TFS/VersionControl/GitRestClient"], function (VSS_Service, TFS_Git_WebApi)
   {
    var client = VSS_Service.getClient(TFS_Git_WebApi.GitHttpClient);
    client.getRepositories().then(
        function(repos)
        {
          var repoId = repos[0].id;
          client.getCommits(repoId, null, null, null, 1000).then(
          function(commits)
          {
            console.log(commits[800]);
            if (commits.length == 1000)
              console.log("Too many commits");
            else
            {
              var dic = {};
              for (var i = 0; i < commits.length; i++)
              {
                client.getCommit(commits[i].commitId, repoId).then(
                function(commit)
                {
                  console.log(commits[i]);
                  commits[i].parents = commit.parents;
                  var merge = commits[i].parents.size() > 1;
                  var date = commits[i].author.date.getFullYear();
                  date = date * 100 + commits[i].author.date.getMonth();
                  date = date * 100 + commits[i].author.date.getDate();
                  date = date * 100 + commits[i].author.date.getHours();
                  date = date * 100 + commits[i].author.date.getMinutes();
                  date = date * 100 + commits[i].author.date.getSeconds();
                  dic[commits[i].commitId] = new Graph(commits[i].commitId, commits[i].author.name, commits[i].comment, date, commits[i].remoteUrl, [], merge);
                  linker(commits, dic);
                });
              }
            }
          });
        });
      });
});
