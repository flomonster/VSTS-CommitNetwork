var account = "extension-westworld";
var repository = "e3bd020e-a357-42f3-8da2-fb5880201dbd";

var url = "https://" + account + ".visualstudio.com/DefaultCollection/_apis/git/repositories/";
request += repository + "/commits?api-version=1.0";

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", url, false);
xmlHttp.send();

if (xmlHttp.readyState == 4 && xmlHttp.sstatus == 200)
{
  var response = JSON.parse(xmlHttp.responseText);
  alert(response);
}
else
{
  alert("Nope");
}
