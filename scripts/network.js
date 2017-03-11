var account = "extension-westworld";
var repository = "e3bd020e-a357-42f3-8da2-fb5880201dbd";

var url = "https://" + account + ".visualstudio.com/DefaultCollection/_apis/git/repositories/";
url += repository + "/commits?api-version=1.0";

var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);

xhr.open('GET', '/api', true);
xhr.send(null);
//var response = JSON.parse(xhr.responseText);
console.log(xhr.responseText);

