(function(){
    dom()
    function dom(){{try {
        //You can play with your DOM here or check URL against your regex
        var doc = document.getElementsByTagName("p");
        if(doc.length===0)doc = document.getElementsByTagName('center')
        console.log(doc)
        var textMail = "";
        var divchiante =
            document.getElementsByClassName("wide-content-host")[0].firstChild
                .firstChild;
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
        if(textMail===''){
            alert('Nous ne pouvons pas tester cet email pour le moment')
            return null;
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
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                window.open(`https://tanjobi.fr/result/${result.body}`, '_blank');
            })
            .catch((error) => console.log("error", error));

    } catch (e) {
        console.log(e);
        return "Test";
    }}}
})();