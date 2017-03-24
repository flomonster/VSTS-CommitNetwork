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
