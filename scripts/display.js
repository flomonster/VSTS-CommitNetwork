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
              return "<b>" + commit.author + "</b>" +
              "<div style=\"float: right;\">" + commit.sha1.substr(0, 7) + "</div><br>" +
              commit.message;
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
    stack.push([graph.children[0], branch]);
    for (var i = 1; i < graph.children.length; i++)
      stack.push([graph.children[i], gitgraph.branch({parentBranch: branch})]);
  }
}

function displayGraph(graph)
{
  var gitgraph = new GitGraph(config);
  var stack = [[graph, gitgraph.branch()]];
  var tobemerge = []
  while (stack.length)
  {
    [graph, branch] = stack.pop();
    if (graph.merge)
    {
      var find = false;
      for (var i = 0; i < tobemerge.length; i++)
      {
        var tuple = tobemerge[i];
        if (tuple[0] === graph)
        {
          branch.merge(tuple[1],
              {
                dotColor: branch.color,
                sha1: graph.id,
                dotSize: 10,
                dotStrokeWidth: 10,
                message: graph.msg,
                author: graph.author,
              });
          addChildren(stack, graph, branch, gitgraph);
          find = true
          break;
        }
      }
      if (!find)
        tobemerge.push([graph, branch]);
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
}
