class Graph
{
  constructor(id, author, msg, children = [])
  {
    this.id = id;
    this.author = author;
    this.msg = msg;
    this.children = children;
  }
}
