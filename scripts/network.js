function linker(dict)
{
}

VSS.ready(() => {
VSS.require(["VSS/Service", "TFS/VersionControl/GitRestClient"], function (VSS_Service, TFS_Git_WebApi)
   {
    var client = VSS_Service.getClient(TFS_Git_WebApi.GitHttpClient);
    client.getRepositories().then(
        function(repos)
        {
          var repoId = repos[1].id;
          client.getCommits(repoId, null, null, null, 1000).then(
          function(commits)
          {
            if (commits.length == 1000)
              console.log("Too many commits");
            else if (commits.length == 0)
              console.log("Any commits");
            else
            {
              var dic = {};
              for (var i = 0; i < commits.length; i++)
              {
                client.getCommit(commits[i].commitId, repoId).then(
                function(commit)
                {
                  var merge = commit.parents.length > 1;
                  var date = commit.author.date.getFullYear();
                  date = date * 100 + commit.author.date.getMonth();
                  date = date * 100 + commit.author.date.getDate();
                  date = date * 100 + commit.author.date.getHours();
                  date = date * 100 + commit.author.date.getMinutes();
                  date = date * 100 + commit.author.date.getSeconds();
                  dic[commit.commitId] = new Graph(commit.commitId, commit.author.name, commit.comment, date, commit.remoteUrl, [], commit.parents, merge);
                  if (commits.length == Object.keys(dic).length)
                  {
                    linker(dic);
                    for (var id in dic)
                    {
                      for (var p = 0; p < dic[id].parents.length; p++)
                        dic[dic[id].parents[p]].children.push(dic[id]);
                    }
                    console.log("OK");
                    displayGraph(dic[commits[commits.length - 1].commitId]);
                  }
                });
              }
            }
          });
        });
      });
});
