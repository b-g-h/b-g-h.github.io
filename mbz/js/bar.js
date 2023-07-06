function farblos()
{
    const pattern1 = ["#df0000", "#24c62b", "#1010b2", "#e29e14", "#7d11c9", "#f0f", "#065109", "#06b7f4"];
    const pattern2 = ["url(#pattern-circles)", "darkgrey", "url(#pattern-checkers)", "#2b2b2b", "url(#pattern-cubes)", "url(#pattern-lines)", "black", "url(#pattern-chevron)"];
    
    if (document.getElementById("bar-1").getAttribute("fill") == "#df0000"){
        for(let i=1; i<9; i++){
            document.getElementById("bar-"+i).setAttribute("fill", pattern2[i-1]);
            document.getElementById("key-"+i).setAttribute("fill", pattern2[i-1]);
        }
    } else {
        for(let i=1; i<9; i++){
            document.getElementById("bar-"+i).setAttribute("fill", pattern1[i-1]);
            document.getElementById("key-"+i).setAttribute("fill", pattern1[i-1]);
        }
    }
}
function stroke()
{
    var strokeString = "stroke-width:2;stroke:black"
    for(let i=1; i<9; i++){
        document.getElementById("bar-"+i).setAttribute("style", strokeString);
        document.getElementById("key-"+i).setAttribute("style", strokeString);
    }
}
