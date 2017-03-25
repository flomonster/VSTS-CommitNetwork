class Graph
{
  constructor(id, author, msg, date, url, children = [])
  {
    this.id = id;
    this.author = author;
    this.msg = msg;
    this.date = date;
    this.url = url;
    this.children = children;
  }
}

child1 = new Graph("id 2", "swapme <athawale.1@iitj.ac.in>", "ADD readme", "23/03/2017", "");
test1 = new Graph("id 1", "swapme <athawale.1@iitj.ac.in>", "Initial Commit", "22/03/2017", "", [child1]);
