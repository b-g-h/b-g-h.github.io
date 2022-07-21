// Mein Shortcode (im Theme)
function formel()
{
var list = document.getElementsByTagName("script"); k =0;
var b1 = document.getElementById("LTX");
b1.setAttribute("disabled", true);
b1.innerHTML = "LaTeX Anzeige ist aktiv";
/*b1.setAttribute("style", "display: none;")*/

for (i=0; i<list.length; i++){var attribute  = list[i].getAttribute("type");
if(attribute=="math/tex"||attribute=="math/tex; mode=display")
    {k=k+1;
   var neu = document.createElement("span");
   var Eltern = document.getElementById("MathJax-Element-" + k +"-Frame").parentNode;
   var child = document.getElementById("MathJax-Element-" + k +"-Frame")

   Eltern.insertBefore(neu, child);
   neu.classList.add("sr-only");
   neu.appendChild(document.createTextNode(document.getElementById("MathJax-Element-"+k).innerHTML));
    }
    {};};
};
