
walk(document.body);

function walk(node) 
{
    // I stole this function from here:
    // http://is.gd/mwZp7E
    
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
	    walk(child);
	    child = next;
	}
	break;
	
    case 3: // Text node
	handleText(node);
	break;
    }
}

function handleText(textNode) 
{
    var str = textNode.nodeValue;

    var regex = "(10[.][0-9]+(?:[.][0-9]+)*/.*)";
    var re = new RegExp(regex, 'g');

    if (re.test(str)) {
	chrome.runtime.sendMessage({ "setBadgeText" : 'DOI' });
	chrome.runtime.sendMessage({ "setBadgeBackgroundColor" : [255,0,0,128] });
    }
    // should check if DOI is already in JournalMap and badge a
    // different color if yes, or prompt to submit page if no.
}


