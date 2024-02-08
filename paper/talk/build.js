const md = require('markdown-it')();
md.use(require('markdown-it-attrs'), {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: []  // empty array = all attributes are allowed
});

md.use(require('markdown-it-header-sections'));
const container = require('markdown-it-container');
const fs = require('fs');
const minify = require('minify');

let ASYNC_COUNTER = 0;
let STANDALONE = process.argv.indexOf('--standalone') !== -1;
let DIRECT_LINKS = process.argv.indexOf('--links') !== -1;

let HEAD = '';
let HEAD_REPLACE = {};
let BODY_REPLACE = {};

let DEBUG = process.argv.indexOf('--debug') !== -1;
let debug = function(name, start) {
  if (!DEBUG) return;
  console.log(name + ' ' + (start ? 'Start' : 'End'));
};

// Title slide
md.use(container, 'TitleSlide', {
  validate: function(params) {
    return params.trim().match(/^TitleSlide$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    debug('TitleSlide', start);
    if (start) {
      return '<section>\n';
    }
    return '</section>\n';
  },

  marker: '*'
});


md.use(container, 'Title', {
  validate: function(params) {
    return params.trim().match(/^Title\s+(.*)$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    debug('Title', start);
    if (start) {
      const title = tokens[idx].info.replace(/^Title/, '').trim();
      return `<title>${title}</title>\n<h1 style="text-align: left">\n${title}\n`;
    }
    return '</h1>\n';
  }
});


md.use(container, 'Subtitle', {
  validate: function(params) {
    return params.trim().match(/^Subtitle\s+(.*)$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    debug('SubTitle', start);
    if (start) {
      let content = tokens[idx].info.replace(/^Subtitle/, '').trim();
      return `<hr> <small> ${content}`;
    }
    return '</small>\n';
  },

});


md.use(container, 'Author', {
  validate: function(params) {
    return params.trim().match(/^Author\s+(.*)$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    debug('Author', start);
    if (start) {
      let content = tokens[idx].info.replace(/^Author/, '').trim();
      return `<div class="Author">${content}`;
    }
    return '</div>\n\n';
  }
});


md.use(container, 'Affiliations', {
  validate: function(params) {
    return params.trim().match(/^Affiliations$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    debug('Affiliations', start);
    if (start) {
      let content = tokens[idx].info.replace(/^Affiliations/, '').trim();
      return '<div class="Affiliations">';
    }
    return '</div>\n\n';
  },

  marker: '*'
});

md.use(container, 'Affiliation', {
  validate: function(params) {
    return params.trim().match(/^Affiliation$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    debug('Affiliation', start);
    if (start) {
      let content = tokens[idx].info.replace(/^Affiliation/, '').trim();
      return '<div class="Affiliation">';
    }
    return '</div>\n\n';
  }
});


// Header content
md.use(container, 'Head', {
  validate: function(params) {
    return params.trim().match(/^Head$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    debug('Head', start);
    if (start) {
      HEAD = '<head>\n';
      HEAD += '<meta charset="UTF-8">\n';
      HEAD += '<meta name="robots" content="noindex">\n';
      HEAD += '<meta name="viewport" content="width=device-width, initial-scale=1">\n';
      HEAD += '<meta name="description" content="Lecture at IIT Delhi">\n';
    } else {
      HEAD += '</head>\n';
    }
    return '';
  },

  marker: '*'
});


md.use(container, 'Icon', {
  validate: function(params) {
    return params.trim().match(/^Icon\s+(.*)$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    let elements = tokens[idx].info.trim().split(/\s/);
    debug('Icon', start);
    if (start) {
      HEAD += `<link rel="icon" href="${elements[1]}" type="image/x-icon">\n`; // Image compacting
    }
    return '';
  }
});


let asyncJS = async function(stream, count) {
  minify.js(stream).then((x) => {
    HEAD_REPLACE[count] = x;
    ASYNC_COUNTER--;
  });
};


let minifyScript = function(stream) {
  let count = 'HEAD' + ASYNC_COUNTER;
  ASYNC_COUNTER++;
  asyncJS(stream, count);
  return count;
};


md.use(container, 'Script', {
  validate: function(params) {
    return params.trim().match(/^Script\s+(.*)$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    let elements = tokens[idx].info.trim().split(/\s/);
    debug('Script', start);
    if (!start) return '';
    const src = elements[1];
    const reg = new RegExp('^(https*|file)://');
    if (!STANDALONE || src.match(reg)) {
      HEAD += ` <script type="text/javascript" src="${src}"></script>\n`;
      return '';
    }
    // Insert script
    // This should throw an error if file is not available!
    let stream = fs.readFileSync(src, {encoding:'utf8'});
    if (elements[2] === 'minify') {
      stream = minifyScript(stream);
    }
    HEAD += ` <script type="text/javascript">${stream}</script>\n`;
    return '';
    }
});


md.use(container, 'CSS', {
  validate: function(params) {
    return params.trim().match(/^CSS\s+(.*)$/);
  },

  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    let elements = tokens[idx].info.trim().split(/\s/);
    debug('CSS', start);
    if (!start) return '';
    const src = elements[1];
    const reg = new RegExp('^(https*|file)://');
    if (!STANDALONE || src.match(reg)) {
      HEAD += ` <link rel="stylesheet" href="${elements[1]}">\n`;
      return '';
    }
    // Insert CSS
    // This should throw an error if file is not available!
    let stream = fs.readFileSync(src, {encoding:'utf8'});
    if (elements[2] === 'minify') {
      stream = minify.css(stream);
    }
    HEAD += ` <style type="text/css">${stream}</style>\n`;
    return '';
  }
});



// <head>
// <meta charset="UTF-8">
// <meta name="robots" content="noindex">
// <meta name="viewport" content="width=device-width, initial-scale=1">
// <link rel="icon" href="favicon.ico" type="image/x-icon">
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1">
// <link rel="stylesheet" href="styles.css">
// <script type="text/javascript" src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
// <script type="text/javascript" src="mathjax-conf.js"></script>
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/mathjax@3.1.0/es5/tex-mml-chtml.js"></script>
// <script type="text/javascript" src="cacc.js"></script>
// <script type="text/javascript" src="cacc-conf.js"></script>
// </head>

// Navigatalbe
md.use(container, 'Diagcess', {
  validate: function(params) {
    return params.trim().match(/^Diagcess\s+(.*)$/);
  },
  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    let elements = tokens[idx].info.trim().split(/\s/);
    if (!start) {
      return '</div></div></center>\n';
    }
    let div = '<center><div class="diagramScale">';
    if (!STANDALONE) {
      return div + `<div class="ChemAccess-element" id="${elements[1]}" tabindex="0" `
        + `role="application" aria-label="Navigatable diagram" `
        + `data-src="${elements[2]}" `
        + `data-cml="${elements[3]}">`;
    }
    div += `<div class="ChemAccess-element" id="${elements[1]}" tabindex="0" '
      + 'role="application" aria-label="Navigatable diagram">`;
    let svg = fs.readFileSync(elements[2], {encoding:'utf8'});
    let xml = fs.readFileSync(elements[3], {encoding:'utf8'});
    xml = xml.replace(/<sre:[a-z]*\/>/g, '');
    xml = xml.replace(/sre:/g, '');
    if (elements[4] === 'minify') {
      svg = minify.html(svg);
      xml = minify.html(xml);
    }
    div += `<div class="svg">${svg}</div>`;
    div += `<div class="cml">${xml}</div>`;
    return div;
  }
});


md.use(container, 'Standalone', {
  validate: function(params) {
    return params.trim().match(/^Standalone\s+(.*)$/);
  },
  render: function(tokens, idx) {
    const start = tokens[idx].nesting === 1;
    let elements = tokens[idx].info.replace(/^Standalone\s+/, '');
    if (STANDALONE && start) {
      return `<div><small>${elements}</small></div>`;
    }
    return '';
  }
});


// Base 64 encoding
let defaultRenderer = md.renderer.rules.image;
let imageTypes = {
  'bmp': 'bmp',
  'gif': 'gif',
  'ico': 'x-icon',
  'jpeg': 'jpeg',
  'jpg': 'jpeg',
  'png': 'png',
  'svg': 'svg+xml',
  'tif': 'tiff',
  'tiff': 'tiff'
};

// Currently only works for local, relative paths.
let imageType = function(src) {
  let reg = new RegExp('^(https*|file)://');
  if (src.match(reg)) return null;
  let ext = src.split('.');
  return ext.length && imageTypes[ext[ext.length - 1].toLowerCase()];
};
md.renderer.rules['image'] = function (tokens, idx, options, env, slf) {
  let token = tokens[idx];
  let src = token.attrGet('src');
  let type = imageType(src);
  if (!type) {
    return defaultRenderer(tokens, idx, options, env, slf);
  }
  try {
    let stream = fs.readFileSync(src, {encoding:'base64'});
    token.attrSet('src', 'data:image/' + type + ';base64,\n' + stream);
  } catch (e) {
  }
  return defaultRenderer(tokens, idx, options, env, slf);
};


const CURRENT_FOLDER = process.cwd()+'/';

let SLIDES = md.render(fs.readFileSync(CURRENT_FOLDER+'slides.md').toString());


// let defaultRenderer = md.renderer.rules.text;
// md.renderer.rules['text'] = function (tokens, idx, options, env, slf) {
//   var token = tokens[idx];
//   if (!token.content.match(/^.ChemAccess /)) {
//     return defaultRenderer(tokens, idx, options, env, slf);
//   }
//   let elements = token.content.split(' ');
//   return `<center><div class="diagramScale"><div class="ChemAccess-element" id="${elements[1]}" tabindex="0" `
//     + `role="application" aria-label="Navigatable diagram" `
//     + `data-src="${elements[2]}" `
//     + `data-cml="${elements[3]}"></div></div></center>`;
// };

let SLIDE_COUNTER = 0;

let insertButtons = function() {
  // On standalone insert the arrow buttons and the general configuration code.
  return STANDALONE ?
    '<span class="btn next"></span><span class="btn prev"></span>' : '';
};


let makeSlideLinks = function() {
  let div = '';
  if (DIRECT_LINKS) {
    div += '<div class="directlinks">';
    for (let i = 1; i <= SLIDE_COUNTER; i++) {
       // div += `<button class="directlink" onclick="window.location.href='#slide${i}';">${i}</button>`;
      div += `<span class="directlink"><a href="#slide${i}">${i}</a></span>`;
    }
    div += '</div>';
  SLIDES = SLIDES.replace(/<\/section>/g, div + '</section>');
  }
  return '';
};


let output = function() {
  const html = `
<!DOCTYPE html>
<html lang="en">
${HEAD}
<body>
<div class="slider">
${insertButtons()}
${makeSlideLinks()}
${SLIDES}
</div>
</body>
</html>
`;
  fs.writeFileSync('index.html', html);
};


let slideIds = function() {
  while(SLIDES.match(/<section>/)) {
    SLIDES = SLIDES.replace(/<section>/, `<section id="slide${++SLIDE_COUNTER}">`);
  }
};

let replace = function() {
  for (let key of Object.keys(HEAD_REPLACE)) {
    HEAD = HEAD.replace(key, HEAD_REPLACE[key]);
  }
  for (let key of Object.keys(BODY_REPLACE)) {
    SLIDES = SLIDES.replace(key, BODY_REPLACE[key]);
  }
  SLIDES = SLIDES.replace(/<a /g, '<a target="_blank" rel="noopener"');
  slideIds();
};

let finalizeOutput = function() {
  if (ASYNC_COUNTER) {
    debug('Finalize', true);
    setTimeout(
      finalizeOutput,
      100
    );
    return;
  }
  replace();
  debug('Finalize');
  output();
};


finalizeOutput();
