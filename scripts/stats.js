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
          console.log(commits);
          var stats = {};
          var names = [];
          var min = Number.MAX_VALUE, max = Number.MIN_VALUE, high = 0;
          var zero = new Date(2000, 0, 1);
          for (var i = 0; i < commits.length; i++)
          {
            var dateDiff = Math.round((commits[i].author.date - zero)/(1000*60*60*24));
            if (dateDiff > max)
              max = dateDiff;
            if (dateDiff < min)
              min = dateDiff;

              var email = commits[i].author.email;

              if (email in stats)
              {
                if (dateDiff in stats[email])
                  stats[email][dateDiff]++;
                else
                  stats[email][dateDiff] = 1;
              }
              else
              {
                stats[email] = {dateDiff: 1};
                names.push(commits[i].author.name);
              }
              if (stats[email][dateDiff] > high)
                high++;
          }

          displayStats(stats, names, min, max, high);
        }
      });
    });
});
