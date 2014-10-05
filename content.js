// Send a message containing the page details back to the event page

var DOI = fetchDOI();

var pub_meta = fetchMeta(DOI);

chrome.runtime.sendMessage({
    'title': document.title,
    'DOI': DOI
    //'url': window.location.href,
    //'summary': window.getSelection().toString()
});



function fetchMeta(DOI)
{
    url = "http://dx.doi.org/" + DOI

//    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://google.com') + '&callback=?', function(data){
//	alert(data.contents);
//    });

//    headers = {"accept": "application/x-bibtex"}
//   r = requests.get(url, headers = headers, timeout=3)
//   print r.text
// return r.text
}




function fetchDOI()
{
    return walk(document.body);
}

function walk(node) 
{
    var child, next;
    switch ( node.nodeType )  
    {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
	child = node.firstChild;
	while ( child ) 
	{
	    next = child.nextSibling;
	    var DOI = walk(child);
	    if (DOI) { return DOI; }
	    child = next;
	}
	break;
    case 3: // Text node
	var DOI = handleText(node);
	if (DOI) {
	    console.log(DOI);
	    //alert(DOI);
	    //return "foo";
	    return DOI;
	}
	break;
    }
}

function handleText(textNode) 
{
    var str = textNode.nodeValue;

    var regex = "(10[.][0-9]+(?:[.][0-9]+)*/.*)";
    var re = new RegExp(regex, 'g');

    if (re.test(str)) {
	var m = str.match(regex);
	//console.log(m);
	return m[1];
    }
}


