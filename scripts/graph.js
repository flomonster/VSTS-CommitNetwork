class Graph
{
  constructor(id, author, msg, date, url, children = [], merge = false)
  {
    this.id = id;
    this.author = author;
    this.msg = msg;
    this.date = date;
    this.url = url;
    this.children = children;
    this.merge = merge;
  }
}

merge = new Graph("MERGE", "swapme <athawale.1@iitj.ac.in>", "Merge to master", "23/03/2017", "");
merge.merge = true;
child1 = new Graph("id 2", "swapme <athawale.1@iitj.ac.in>", "ADD readme", "23/03/2017", "", [merge]);
child2 = new Graph("id 3", "swapme <athawale.1@iitj.ac.in>", "ADD gitignore", "23/03/2017", "", [merge]);
test1 = new Graph("id 1", "swapme <athawale.1@iitj.ac.in>", "Initial Commit", "22/03/2017", "", [child1, child2]);
