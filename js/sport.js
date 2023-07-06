function wechsel1() 
{
    var bild = document.getElementById("sport");
    bild.setAttribute("src", "img/sport-2.png");
    bild.setAttribute("alt", "farbige Version des Fotos");
}
function wechsel2() 
{
    var bild = document.getElementById("sport");
    bild.setAttribute("src", "img/sport-3.png");
    bild.setAttribute("alt", "freigestellter Torhüter");
}
function original() 
{
    var bild = document.getElementById("sport");
    bild.setAttribute("src", "img/sport-1.png");
    bild.setAttribute("alt", "Originalfoto schwarz weiß, Handballtorwart in Abwehrhaltung, Ball fliegt auf ihn zu");
}

function wechsel()
{
    var bild = document.getElementById("sport");
    var qu = bild.getAttribute("src");

    if (qu == "img/sport-1.png") {
        bild.setAttribute("src", "img/sport-2.png");
        bild.setAttribute("alt", "farbige Version des Fotos");
    }
    if (qu == "img/sport-2.png") {
        bild.setAttribute("src", "img/sport-3.png");
        bild.setAttribute("alt", "freigestellter Torhüter");
    }
    if (qu == "img/sport-3.png") {
        bild.setAttribute("src", "img/sport-1.png");
        bild.setAttribute("alt", "Originalfoto schwarz weiß, Handballtorwart in Abwehrhaltung, Ball fliegt auf ihn zu");
    }
}