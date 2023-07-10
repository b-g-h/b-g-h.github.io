function wechsel1() 
{
    var bild = document.getElementById("sport");
    bild.setAttribute("src", "img/sport-2.png");
    bild.setAttribute("alt", "farbige Version des Fotos");
    document.getElementById("sport_ori").setAttribute("aria-pressed", "false");
    document.getElementById("sport_1").setAttribute("aria-pressed", "true");
    document.getElementById("sport_2").setAttribute("aria-pressed", "false");
}
function wechsel2() 
{
    var bild = document.getElementById("sport");
    bild.setAttribute("src", "img/sport-3.png");
    bild.setAttribute("alt", "freigestellter Torhüter");
    document.getElementById("sport_ori").setAttribute("aria-pressed", "false");
    document.getElementById("sport_1").setAttribute("aria-pressed", "false");
    document.getElementById("sport_2").setAttribute("aria-pressed", "true");
}
function original() 
{
    var bild = document.getElementById("sport");
    bild.setAttribute("src", "img/sport-1.png");
    bild.setAttribute("alt", "Originalfoto schwarz weiß, Handballtorwart in Abwehrhaltung, Ball fliegt auf ihn zu");
    let button = document.getElementById("sport_ori");
    button.setAttribute("aria-pressed", "true");
    document.getElementById("sport_1").setAttribute("aria-pressed", "false");
    document.getElementById("sport_2").setAttribute("aria-pressed", "false");
}

