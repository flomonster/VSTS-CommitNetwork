VSS.ready(() => {
VSS.require(["VSS/Service", "TFS/VersionControl/GitRestClient"], function (VSS_Service, TFS_Git_WebApi)
   {
      var client = VSS_Service.getClient(TFS_Git_WebApi.GitHttpClient);
      var context = VSS.getWebContext();
      var repoId = context.project.name;

      client.getCommits(repoId, null, repoId, null, 100).then(
      function(commits)
      {
        if (commits.length == 0)
          console.log("Any commits");
        else
        {
          stats = {};
          for (var i = 0; i < commits.length; i++)
          {
              var day = String("00" + commits[i].author.date.getDate()).slice(-2) + "/" + String("00" + commits[i].author.date.getMonth()).slice(-2);
              var email = commits[i].author.email;

              if (email in stats)
              {
                if (day in stats[email])
                  stats[email][day]++;
                else
                  stats[email][day] = 1;
              }
              else
                stats[email] = {day: 1};
          }

          displayStats(stats);
        }
      });
    });
});
