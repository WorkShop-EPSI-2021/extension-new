document.getElementById("test").addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        var doc = document.getElementsByTagName('p');
        var textMail="";
        var divchiante = document.getElementsByClassName('wide-content-host')[0].firstChild.firstChild
        console.log(divchiante)
        if(divchiante.childNodes.length===4){
            var textoskour = divchiante.childNodes[2].childNodes[0].firstChild.textContent
        }else{
            var textoskour = divchiante.childNodes[1].childNodes[0].firstChild.textContent
        }

        for(var i =0;i<doc.length;i++){
            if(doc[i].outerText!==undefined && doc[i].outerText!==""&&doc[i].outerText!=="\\n"&&doc[i].outerText!=="Cela prend plus de temps que d'habitude. Essayez d'actualiser la page."){
                textMail = textMail+doc[i].outerText+" "
            }
        }
        console.log(textoskour)
        console.log(textMail)
        //wide-content-host
        //
        return document.body;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);

    });
});