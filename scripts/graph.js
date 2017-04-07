class Graph
{
  constructor(id, author, msg, date, url, children = [], parents = [], merge = false)
  {
    this.id = id;
    this.author = author;
    this.msg = msg;
    this.date = date;
    this.url = url;
    this.children = children;
    this.parents = parents;
    this.merge = merge;
  }
}

merge = new Graph("MERGE", "swapme <athawale.1@iitj.ac.in>", "Merge to master", "23/03/2017", "https://www.google.fr/", [], [], true);
child1 = new Graph("id 2", "swapme <athawale.1@iitj.ac.in>", "ADD readme", "23/03/2017", "", [merge]);
child2 = new Graph("id 3", "swapme <athawale.1@iitj.ac.in>", "ADD gitignore", "23/03/2017", "https://www.google.es/", [merge]);
test1 = new Graph("id 1", "swapme <athawale.1@iitj.ac.in>", "Initial Commit", "22/03/2017", "https://extension-westworld.visualstudio.com/_git/COMMIT%20NETWORK/commit/1c054af8d49bf140df6d4253d5ac312579ceb973?refName=refs%2Fheads%2Fmaster", [child1, child2]);
