var graphConfig = new GitGraph.Template({
          colors: ["#000000", " #0fa3af", " #ae0faf ","#0f11af","#b20714"],
          branch: {
            lineWidth: 7,
            spacingX: 30,
            labelRotation: 0
          },
          commit: {
            spacingY: -80,
            dot: {
              size: 10
            },
            message: {
              font: "normal 14pt Arial"
            }
          }
         
        });


var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "horizontal"
};

var bugFixCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Bug fix commit(s)"
};

var stabilizationCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Release stabilization commit(s)"
};

// You can manually fix columns to control the display.
var masterCol = 0;
var developCol = 1;
var featureCol = 2;
var releaseCol = 3;
var supportCol = 4;


var gitgraph = new GitGraph(config);

var master = gitgraph.branch({
  name: "master",
  column: masterCol
});
master.commit("Initial commit");

var develop = gitgraph.branch({
  parentBranch: master,
  name: "develop",
  column: developCol
});
master.commit({
  messageDisplay: false // for msg disaply false it is showing msg He doesn't like George Michael!
});
develop.commit({
  messageDisplay: false
});

var feature1 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/1",
  column: featureCol
});
feature1.commit("A feature to go into v1.0.0");
feature1.merge(develop);

var feature2 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/2",
  column: featureCol
});
feature2.commit("Another feature to go into v1.0.0");
feature2.merge(develop);

var release_100 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v1.0.0",
  column: releaseCol
});
release_100.commit({
  message: "Start v1.0.0-rc Release Candidate builds",
  
});

release_100.commit(stabilizationCommit);
release_100.merge(develop).merge(master, {// merge to two 
  //dotStrokeWidth: 10, // to make the big circle where it is merging 
  message: "Release v1.0.0 tagged",
  
});

var support_10x = gitgraph.branch({
  parentBranch: master,
  name: "support/v1.0.x",
  column: supportCol
});
support_10x.commit({
  message: "Start v1.0.1-rc Release Candidate builds",
  
}).commit(bugFixCommit);

var feature3 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/3",
  column: featureCol
});
develop.commit({
  messageDisplay: false
});
feature3.commit("A feature to go into v1.1.0").commit({
  messageDisplay: false
});
feature3.merge(develop);

support_10x.commit({
  
  message: "Release v1.0.1 tagged",
  
}).merge(develop);

develop.commit({
  messageDisplay: false
});
support_10x.commit({
  message: "Start v1.0.2-rc Release Candidate builds",
  
})
support_10x.commit(bugFixCommit).commit({
  
  message: "Release v1.0.2 tagged",
 
});
support_10x.merge(develop);
develop.commit({
  messageDisplay: false
});

var release_110 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v1.1.0",
  column: releaseCol
});
release_110.commit({
  message: "Start v1.1.0-rc Release Candidate builds",
 
})
release_110.commit(stabilizationCommit);
release_110.merge(develop).merge(master, {
 
  message: "Release v1.1.0 tagged",
  
});

var support_11x = gitgraph.branch({
  parentBranch: master,
  name: "support/v1.1.x",
  column: supportCol
});
support_11x.commit({
  message: "Start v1.1.1-rc Release Candidate builds",
 
})
support_11x.commit(bugFixCommit).commit({
  
  message: "Release v1.1.1 tagged",
  
});
support_11x.merge(develop);
develop.commit({
  messageDisplay: false
});

var feature4 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/4",
  column: featureCol
});
develop.commit({
  messageDisplay: false
});
feature4.commit("A feature to go into v1.2.0").commit({
  messageDisplay: false
});
feature4.merge(develop);

support_11x.commit({
  message: "Start v1.1.2-rc Release Candidate builds",
 
})
support_11x.commit(bugFixCommit).commit({
 
  message: "Release v1.1.2",
  
});
support_11x.merge(develop);
develop.commit({
  messageDisplay: false
});

var feature5 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/5",
  column: featureCol
});
develop.commit({
  messageDisplay: false
});
feature5.commit("Another feature to go into v1.2.0").commit({
  messageDisplay: false
});
feature5.merge(develop);

support_11x.commit({
  message: "Start v1.1.3-rc Release Candidate builds",
 
})
support_11x.commit(bugFixCommit).commit({
  
  message: "Release v1.1.3 tagged",
 
});
support_11x.merge(develop);
develop.commit({
  messageDisplay: false
});

var release_120 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v1.2.0",
  column: releaseCol
});
release_120.commit({
  message: "Start v1.2.0-rc Release Candidate builds",
 
})
release_120.commit(stabilizationCommit);
release_120.merge(develop).merge(master, {
  
  message: "Release v1.2.0 tagged",
 
});
develop.commit({
  messageDisplay: false
});

