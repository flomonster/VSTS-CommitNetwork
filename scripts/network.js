VSS.ready(() => {
VSS.require(["VSS/Service", "TFS/VersionControl/GitRestClient"], function (VSS_Service, TFS_Git_WebApi)
   {
      var client = VSS_Service.getClient(TFS_Git_WebApi.GitHttpClient);
      var context = VSS.getWebContext();
      var repoId = context.project.name;

      client.getCommits(repoId, null, repoId, null, 1000).then(
      function(commits)
      {
        if (commits.length == 1000)
          console.log("Too many commits");
        else if (commits.length == 0)
          console.log("Any commits");
        else
        {
          var stats = {};
          var dic = {};
          for (var i = 0; i < commits.length; i++)
          {
            client.getCommit(commits[i].commitId, repoId, repoId).then(
            function(commit)
            {
              var merge = commit.parents.length > 1;
              var date = commit.author.date.getFullYear();
              date = date * 100 + commit.committer.date.getMonth();
              date = date * 100 + commit.committer.date.getDate();
              date = date * 100 + commit.committer.date.getHours();
              date = date * 100 + commit.committer.date.getMinutes();
              date = date * 100 + commit.committer.date.getSeconds();
              dic[commit.commitId] = new Graph(commit.commitId, commit.author.name, commit.comment, date, commit.remoteUrl, [], commit.parents, merge);
              var day = String("00" + commit.author.date.getDate()).slice(-2) + "/" + String("00" + commit.author.date.getMonth()).slice(-2);
              if (commit.author.email in stats)
              {
                if (day in stats[commit.author.email])
                  stats[commit.author.email][day]++;
                else
                  stats[commit.author.email][day] = 1;
              }
              else
                stats[commit.author.email] = {day: 1};

              if (commits.length == Object.keys(dic).length)
              {
                for (var id in dic)
                  for (var p = 0; p < dic[id].parents.length; p++)
                    dic[dic[id].parents[p]].children.push(dic[id]);
                displayGraph(dic[commits[commits.length - 1].commitId]);
                displayStats(stats);
              }
            });
          }
        }
      });
    });
});
