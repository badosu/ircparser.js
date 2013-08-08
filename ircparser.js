IrcParser = function() {
  var ircParser = {};
  var bgregex = /\x03([0-9][0-9]),([0-9][0-9])([^\x03]*)\x03([0-9][0-9](,)?)?/;
  var fgregex = /\x03([0-9][0-9])([^\x03]*)\x03([0-9][0-9])?/;

  ircParser.parse = function(irc) {
    irc = this.replaceStyles(irc);
    irc = this.replaceBGs(irc);
    irc = this.replaceFGs(irc);

    return irc;
  };

  ircParser.colors = {
    white:      { code: '00' },
    black:      { code: '01' },
    navy:       { code: '02' },
    green:      { code: '03' },
    red:        { code: '04' },
    brown:      { code: '05' },
    purple:     { code: '06' },
    olive:      { code: '07' },
    yellow:     { code: '08' },
    lightgreen: { code: '09' },
    teal:       { code: '10' },
    cyan:       { code: '11' },
    blue:       { code: '12' },
    pink:       { code: '13' },
    gray:       { code: '14' },
    lightgray:  { code: '15' }
  };

  ircParser.styles = {
    normal:    { code: '\x00', replacement: '$1'                  },
    bold:      { code: '\x02', replacement: '<strong>$1</strong>' },
    italic:    { code: '\x16', replacement: '<em>$1</em>'         },
    underline: { code: '\x1F', replacement: '<u>$1</u>'           }
  };

  ircParser.bgcolors = {};
  ircParser.colorNames = {};

  ircParser.init = function() {
    for (var colorName in ircParser.colors) {
      var color = ircParser.colors[colorName];

      color.replacement = '<span class="irc-$1">$2</span>';

      ircParser.colorNames[color.code] = colorName;
      ircParser.bgcolors['bg' + colorName] = {
        replacement: '<span class="irc-bg$2">$3</span>'
      };
    }

    for (var styleName in ircParser.styles) {
      var style = ircParser.styles[styleName],
          exp = style.code + '([^' + style.code + ']*)' + style.code;

      style.regexp = new RegExp(exp, 'g');
    }
  };

  ircParser.replaceFGs = function(irc) {
    var matches = irc.match(fgregex);
    while(matches) {
      var fgcode = matches[1];
      var nfgcode = matches[3];

      var fgcolor = ircParser.colorNames[fgcode];
      var color = ircParser.colors[fgcolor];

      if (nfgcode) {
        irc = irc.replace(fgregex, color.replacement + '\x03' + nfgcode);
      }
      else {
        irc = irc.replace(fgregex, color.replacement);
      }

      matches = irc.match(fgregex);
    }

    return irc;
  };

  ircParser.replaceBGs = function(irc) {
    var matches = irc.match(bgregex);
    while(matches) {
      var fgcode = matches[1];
      var bgcode = matches[2];
      var nfgcode = matches[4];
      var nisbg = matches[5];

      var fgcolorName = ircParser.colorNames[fgcode];
      var color = ircParser.colors[fgcolorName];

      var bgcolorName = ircParser.colorNames[fgcode];
      var bgcolor = ircParser.bgcolors['bg'+bgcolorName];

      var replacement;

      if (nisbg) {
        replacement = bgcolor.replacement;
      }
      else if (nfgcode) {
        console.log('OHAI');
        replacement = bgcolor.replacement.replace('$3','\x03'+fgcode+'$3\x03'+nfgcode);
      }
      else {
        replacement = bgcolor.replacement.replace('$3','\x03'+fgcode+'$3\x03');
      }

      irc = irc.replace(bgregex, replacement);

      matches = irc.match(bgregex);
    }

    return irc;
  };

  ircParser.replaceStyles = function(irc) {
    for (var tokenName in ircParser.styles) {
      var token = ircParser.styles[tokenName];
      irc = irc.replace(token.regexp, token.replacement);
    }

    return irc;
  };

  ircParser.init();

  return ircParser;
};
