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

function addChildren(stack, graph, currentBranch, gitgraph)
{
  if (graph.children.length)
  {
    stack.push([graph.children[0], branch]);
  }
  for (int i = 1; i < graph.children.length; i++)
    stack.push(graph.children[i], gitgraph.branch());
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
      for (graph2 in tobemerge)
      {
        if (graph2[0] == graph[0])
        {
          branch.merge(graph2[1], 
              {
                sha1: graph.id,
                message: graph.msg,
                author: graph.author,
              });
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
      });
    }
  }
}

displayGraph(test1);
