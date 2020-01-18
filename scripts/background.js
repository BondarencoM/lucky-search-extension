chrome.commands.onCommand.addListener(onCommand);

function onCommand (command) {
  if(command === "execute_lucky_search"){
    var search = prompt();
    if(search === null)
      return;
    
    search = encodeURIComponent(search);
    search = search.replace(/(%2B)+/g,"+");// replaces all spaces with a plus

    var url = `https://www.google.com/search?q=${search}&btnI=I%27m+Feeling+Lucky`;

    chrome.tabs.create({ url }, proceedWithSearch );
  }
}

function proceedWithSearch(tab){

  //get the body of the function to pass to API as string
  let code = proceedWithSearchScript.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
  
  chrome.tabs.executeScript(tab.id, {code});
}

function proceedWithSearchScript(){
  
  //Google asks for confirmation to redirect
  if(document.title === "Redirect Notice" || document.links.length == 2)
    //click the first link on the page
    document.links[0].click();
  //google shows normal results page
  else
    //click the first google result
    document.querySelector("h3.LC20lb").parentElement.click();
  
}