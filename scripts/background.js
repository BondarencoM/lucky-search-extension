chrome.commands.onCommand.addListener(onCommand);

var search = null;

function onCommand (command) {
  if(command === "execute_lucky_search"){
    search = prompt();
    if(search !== null)
      chrome.tabs.create({ url: `https://www.google.com` }, fillInData );
  }
}

function fillInData(tab){
  let code = proceedWithSearch.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
  console.log("search ="+search);
  code = code.replace("__user_query__",search);
  chrome.tabs.executeScript(tab.id, {code: code});
}

function proceedWithSearch(){
  
  let inputs = document.forms[0].elements;

  let searchField = inputs.namedItem("q");
  searchField.value = "__user_query__";
  
  let submit = inputs.namedItem("btnI");
  submit[1].click();

}