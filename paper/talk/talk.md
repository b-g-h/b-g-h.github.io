***Head

:::Icon logos/favicon.ico
:::CSS node_modules/normalize.css/normalize.css minify
:::CSS Resources/styles.css minify
:::Script Resources/scripts/mathjax-conf.js minify
:::Script https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.3/tex-mml-chtml.js
:::Script Resources/scripts/cacc.js
:::Script Resources/scripts/cacc-conf.js minify
:::Script Resources/scripts/general-conf.js minify
:::

***

***TitleSlide

:::Title Using LaTeX in Schools: Simplifying Inclusive STEM Education
:::
:::Author Barbara Henn, Michael Schäffler, Davide Cervone, Volker Sorge, Dorine in 't Veld
:::

***Affiliations
***Affiliations

:::Affiliation
SBBZ Ilvesheim, Germany
![SBBZ Logo](Resources/logos/sbbz_logo_2400.png)
[schloss-schule-ilvesheim.de](https://schloss-schule-ilvesheim.de/)
[barbara.henn|michael.schaeffler@sbbz-ilvesheim.de](mailto:barbara.henn@sbbz-ilvesheim.de)
:::


:::Affiliation
MathJax Consortium, USA
![MathJax Logo](Resources/logos/badge-square2.png)
[mathjax.org](https://mathjax.org)
[v.sorge|dpvc@mathjax.org](mailto:v.sorge@mathjax.org)
:::

:::Affiliation
Dedicon, The Netherlands
![Dedicon Logo](Resources/logos/dedicon_logo.svg)
[dedicon.nl](https://www.dedicon.nl/)
[dorineintVeld@dedicon.nl](mailto:dorineintVeld@dedicon.nl)
:::

*******************

## Overview

Over the last 20+ years, LaTeX has been used to teach BVI children mathematics
in Germany

* Recount some of that experience
* Technical support via MathJax
* Similar aims in The Netherlands


## History

Discussions in Germany on the future of Mathematics education for BVI children
since the early 90s.

* Number of blind students in mainstream schools in Germany rose significantly
* Students working consistently with a PC 
* Use of connected Braille display
* Use of 8-dot Braille as opposed to traditional 6-dot

LaTeX as teaching language suggested as early as 1993.

## Practice

* Blind students learn 8-dot Braille from year one for reading
* Particular useful for mathematics:
  * One Braille cell per written character
  * No indicators for numbers, capital letters, etc.
* LaTeX for non-Ascii characters, special expressions etc.
  * Element symbol, root symbol, etc. 
    $\in, \sqrt{\ }$
* Use of [simplifcations](https://www.augenbit.de/wiki/index.php?title=LaTeX-Manual_Sekundarstufe_1)
  * use keyboard keys as much as possible, e.g., * rather than \cdot
  * bevelled fraction rather than \frac:  $1/2$ vs $\frac{1}{2}$
  * command abbreviations etc. 
* Easy transition into higher education


## Technical Support

Easy enough for conventional material in word processors but for the Web?

* Original support by Barbara Henn in MathJax 2.7
  * Exposed the overall LaTeX formula
  * Allowed for direct copying of LaTeX
  * Braille translation via screen reader translation tables
* Future support in MathJax 4
  * Direct aria support
  * Direct generation of Braille

## What is MathJax?

* [MathJax](https://www.mathjax.org) is an open-source JavaScript library for
    rendering Mathematics in all
* Can take LaTeX, AsciiMath, and MathML as input
*   Generates browser output, e.g. HTML/CSS, SVG
*   MathJax is the de facto rendering solution of (nearly) all Mathematics on
    the web
* De facto rendering solution of (nearly) all Mathematics on the web:
    publishers, stackexchange, mediawiki, etc.
*   Around for nearly 15 years
    * lastest stable release: version 3.2.1
    * Version 4.0 is in beta


## Making Math Accessible

$$
   x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$

* Speech via screen reading
* Self-voicing support
* Multiple rule sets for transcription
* Various locales


## MathJax and Accessibility

* Enrich Math using [Speech Rule Engine](https://speechruleengine.org){target="_blank"}
* Javascript library for translating XML into Speech (markup)
* Open source library [available at github](https://github.com/zorkow/speech-rule-engine){target="_blank"}
* Only Math speech solution in JavaScript
* Runs in browser, command line, as node module.
* Initially implemented in the context of ChromeVox
* Speech solution for: ChromeVox, MathJax, EquatIO, MathLive, ...

## Generate Semantics

* Math markup (e.g., LaTeX, MathML) are not very expressive
* SRE rewrites internally into [semantically improved term structure](https://zorkow.github.io/semantic-tree-visualiser/visualise.html?310000111100%3Cmath%3E%0A%20%20%3Cmi%3Ea%3C/mi%3E%0A%20%20%3Cmsup%3E%0A%20%20%20%20%3Cmi%3Ex%3C/mi%3E%0A%20%20%20%20%3Cmn%3E2%3C/mn%3E%0A%20%20%3C/msup%3E%0A%20%20%3Cmo%3E+%3C/mo%3E%0A%20%20%3Cmi%3Eb%3C/mi%3E%0A%20%20%3Cmi%3Ex%3C/mi%3E%0A%20%20%3Cmo%3E+%3C/mo%3E%0A%20%20%3Cmi%3Ec%3C/mi%3E%0A%20%20%3Cmo%3E%3D%3C/mo%3E%0A%20%20%3Cmn%3E0%3C/mn%3E%0A%3C/math%3E){target="_blank"}

```LaTeX
    ax^2+bx+c=0
```

```html
<math>
  <mi>a</mi>
  <msup>
    <mi>x</mi>
    <mn>2</mn>
  </msup>
  <mo>+</mo>
  <mi>b</mi>
  <mi>x</mi>
  <mo>+</mo>
  <mi>c</mi>
  <mo>=</mo>
  <mn>0</mn>
</math>
```


## Example

$$
   ax^2+bx+c=0
$$

:::Standalone Click or focus on the formula and press <kbd>ENTER</kbd> to start, <kbd>Escape</kbd> to quit.
:::

* Source in LaTeX
* Rendered with MathJax
* Embedded semantics generated with SRE
* Accessibility "built-in"



## Euro Braille Translation

* SRE has already a Nemeth rule set implementation
* Add {\LaTeX} to 8-dot Braille
* Generally straight forward
  * One Braille cell per character
  * Engage a small rule set for some of the conventions
[augenbit.de](https://augenbit.de/wiki/index.php?title=LaTeX-Manual_LaTeX_Grundregeln)
  * Provide customisation
* Provide direct copy and paste via selection

## Recursive Exploration

* Generally not difficult
* None trivial for {\LaTeX}
  * Turing complete
  * MathJax uses a recursive stack machine for parsing
* Not all expressions lead to "sensible" output
* Copying of sub-expressions?

[Examples](https://mathjax.github.io/MathJax-demos-web/euro-braille/)


## Experiences

* Learning curve considerably less steep than for Math Braille code
* Ideal for inclusive education
  * Communication easier between BVI students and teachers or sighted peers
  * If necessary rendering straight forward
* Easier transition into higher education
* Technical perspective: Full linearisation possible even for inherently 2D
  structures [compare 2d
  Nemeth](https://speech-rule-engine.github.io/sre-tests/output/nemeth/Nemeth2D.html))
  
## In German{.notes}

* Lernkurve ist nicht steil für Schüler
* 8-Punkt als Start beim Lese-Lernprozess und auch in Mathematik mit den Zeichen für Ziffern und Rechenzeichen 
* LaTeX-Befehle nach und nach: Element-Symbol, Wurzel, Bruch, ... (semantisch)
8-Punkt nicht viel langsamer als 6-Punkt zu lesen (siehe Zebra-Studie)
Fließender Übergang zum Studium 
Für Lehrer an der allgemeinen Schule (in der Inklusion) sehr gut geeignet, da sie als Mathematiklehrer Latex entweder schon von der Universität kennen oder sich schnell einarbeiten können (weniger als eine Stunde inkl. Tabelle auf Augenbit.de: https://www.augenbit.de/wiki/index.php?title=LaTeX-Manual_Sekundarstufe_1)
Verkürzte Schreibweisen erlaubt 


## Hurdles to Wider Adoption (Technical)

* 8 dot vs cursor
  * Modern Braille displays can overcome that
* Expressions can get longer
  * Use of [shortened commands](https://www.augenbit.de/wiki/index.php?title=LaTeX-Manual_Sekundarstufe_1)
  * Other [example](https://b-g-h.github.io/)

## Hurdles to Wider Adoption (Societal)

Quis custodiet ipsos custodes?{.notes}

* Who educates the educators?
  * In the German system most will have had exposure to LaTeX at University
  * Other staff can be easily trained often in less than an hour using simple
    tables, see [augenbit.de](https://augenbit.de/wiki/index.php?title=LaTeX-Manual_Sekundarstufe_1)
  * In other places this might not be the case
* But... LaTeX is so hard to learn!
  * No, it is not!
  * the document structure 
  * fighting the engine
* Market pressure: There is a big industry behind MathML, Nemeth, etc.



## Dorine's Part{.notes}

## Previous Work in The Netherlands

DEIMS 2016 Davy Kager and Dorine in ‘t Veld presented the Dutch linear math notation

* Pros
  * Allows direct communication with sighted
  * Hardly a learning curve and tolerant to deviations in descriptions (e.g. no problem if SQ or SQR or SQRT is used)
  * Requires no extra software
  * Remains consistent (only keyboard characters)
* Cons
  * Needs stricter definitions of use of brackets and spaces in complex formulas
  * Not a general standard
  * No renderer for spatial display (and back)
  * Some areas still not covered
 
 
## What happened since?

No new developments since presentation at DEIMS 2016

A downward spiral/chicken-and-egg-problem:

* Very few pupils and students do (complex) math.
* Pupils/students have to get by very much on their own
* Only very motivated and math-able students choose math
* No specialized teachers who know braille or screenreaders.
* It is hard for organisations for the VI to build and maintain expertise.
* This is not a typically Dutch problem.
* Which is why we had ICCHP-Summer University (until 2016).
 

## Braille in the Netherlands

* Several braille tables in screenreaders are in use 6-dot, 8-dot, EU, ‘American’, ‘Marburg’
* Everyone has his/her own braille on the braille display
* Everyone wants what he/she is used to
* Only for printing (or Braille on tactile images) this is a problem.
 

## The Future

Now that we have a notation that ‘works’, no urgency to change is felt.

* Dedicon builds what is asked for by educators and students.
* Hopefully the German approach raises the feeling of urgency to change.
* The advantages are obvious.
* We believe MathJax is the way to accessible math.
