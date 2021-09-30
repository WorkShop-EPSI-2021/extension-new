document.getElementById("test").addEventListener("click", () => {
  console.log("Popup DOM fully loaded and parsed");

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
chrome.tabs.executeScript(null,{
      //code: 'document.body.innerText;',
     file:'./domOutlook.js'
    },(results) => {
      //Here we have just the innerHTML and not DOM structure
      console.log("Popup script:");
      console.log(results[0])
      
    }
  );
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("scan").classList.add("hidden");
});

document.getElementById("details").addEventListener("click", () => {
  let advancedResult = document.getElementById("result-advanced");
  let result = document.getElementById("result");
  advancedResult.classList.remove("hidden");
  result.classList.add("hidden");
});

document.getElementById("return").addEventListener("click", () => {
    let advancedResult = document.getElementById("result-advanced");
    let scan = document.getElementById("scan");
    scan.classList.remove("hidden");
    advancedResult.classList.add("hidden");
})

