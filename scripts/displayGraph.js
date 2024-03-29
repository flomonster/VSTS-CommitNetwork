var graphConfig = new GitGraph.Template({
          colors: ["#000000", " #0fa3af", " #ae0faf ","#0f11af","#b20714"],
          branch: {
            lineWidth: 5,
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
            },
            shouldDisplayTooltipsInCompactMod: false,
            tooltipHTMLFormatter: function (commit) {
              return "<div style=\"float:left;\"><b>" + commit.author + "</b></div>" +
              "<div style=\"float: right;\">" + commit.sha1.substr(0, 7) + "</div><br><div style=\"float:left\">" +
              commit.message + "</div>";
            }
          }

        });


var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "horizontal"
};

function addChildren(stack, graph, branch, gitgraph)
{
  if (graph.children.length)
  {
    stack.push([graph.children[0], branch, graph]);
    for (var i = 1; i < graph.children.length; i++)
      stack.push([graph.children[i], gitgraph.branch({parentBranch: branch}), graph]);
  }
}

function displayGraph(graph)
{
  var gitgraph = new GitGraph(config);
  var stack = [[graph, gitgraph.branch(), null]];
  while (stack.length)
  {
    stack.sort(
        function compare(a,b)
        { 
          if (a[0].date > b[0].date)
            return -1;
          if (a[0].date < b[0].date)
            return 1;
          return 0;
        });

    [graph, branch, _] = stack.pop();
    if (graph.merge)
    {
      [_, branch2, old]  = stack.pop();
      if (old.id == graph.parents[1])
        branch, branch2 = branch2, branch;

      branch.merge(branch2,
          {
            dotColor: branch.color,
            sha1: graph.id,
            dotSize: 10,
            dotStrokeWidth: 10,
            message: graph.msg,
            author: graph.author,
          });
      addChildren(stack, graph, branch2, gitgraph);
    }
    else
    {
      branch.commit(
      {
        sha1: graph.id,
        message: graph.msg,
        author: graph.author,
        url: graph.url,
        onClick: function(commit) {
          if (commit.url)
            window.open(commit.url, "_blank");
        }
      });
      addChildren(stack, graph, branch, gitgraph);
    }
  }
  $("div#yourdiv").attr("overflow", "hidden");
  setTimeout(function(){
   $("div#yourdiv").attr("overflow", "auto"); // auto | initial
  }, 1);
}
