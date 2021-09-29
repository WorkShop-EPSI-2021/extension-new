function cacaTest() {
    console.log("suce moi");
}

document.getElementById("test").addEventListener("click", () => {
  console.log("Popup DOM fully loaded and parsed");
  var results={};

  function modifyDOM() {
    try {
      //You can play with your DOM here or check URL against your regex
      var doc = document.getElementsByTagName("p");
      var textMail = "";
      var divchiante =
        document.getElementsByClassName("wide-content-host")[0].firstChild
          .firstChild;
      console.log(divchiante);
      if (divchiante.childNodes.length === 4) {
        var textoskour =
          divchiante.childNodes[2].childNodes[0].firstChild.textContent;
      } else {
        var textoskour =
          divchiante.childNodes[1].childNodes[0].firstChild.textContent;
      }

      for (var i = 0; i < doc.length; i++) {
        if (
          doc[i].outerText !== undefined &&
          doc[i].outerText !== "" &&
          doc[i].outerText !== "\\n" &&
          doc[i].outerText !==
            "Cela prend plus de temps que d'habitude. Essayez d'actualiser la page."
        ) {
          textMail = textMail + doc[i].outerText + " ";
        }
      }
      var object = document
        .getElementById("ReadingPaneContainerId")
        .getElementsByClassName("allowTextSelection")[0].textContent;
      console.log(textoskour);
      console.log(textMail);
      var email = { sender: textoskour, content: textMail, object: object };
      console.log(email);
      console.log(JSON.stringify(email));
      //wide-content-host
      //
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        sender: textoskour,
        content: textMail,
        object: object,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://cubecesi.online/v1/scan", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => console.log("error", error));
      /*        axios.post('https://cubecesi.online/v1/scan', {
                        email
                    }).then(response => {
                        console.log(response.data)
                    })*/


      return document.body;
      //hide SCAN div => show RESULT div
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript(
    {
      code: "(" + modifyDOM + ")();", //argument here is a string but function.toString() returns function's code
    },
    (results) => {
      //Here we have just the innerHTML and not DOM structure
      console.log("Popup script:");
      console.log(results[0]);
      
    }
  );
  document.getElementById("result").classList.remove("hidden");
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

