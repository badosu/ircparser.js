IrcParser = function() {
  var ircParser = {};
  var regex = /\x03([0-9][0-9])(,([0-9][0-9]))?([^\x03]*)\x03(([0-9][0-9])(,[0-9][0-9])?)?/;

  ircParser.parse = function(irc) {
    irc = this.replaceStyles(irc);
    irc = this.replaceColors(irc);
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

      color.replacement = '<span class="irc-$1">$4</span>';

      ircParser.colorNames[color.code] = colorName;
      ircParser.bgcolors['bg' + colorName] = {
        replacement: '<span class="irc-bg$3">$4</span>'
      };
    }

    for (var styleName in ircParser.styles) {
      var style = ircParser.styles[styleName],
          exp = style.code + '([^' + style.code + ']*)' + style.code;

      style.regexp = new RegExp(exp, 'g');
    }
  };

  ircParser.replaceColors = function(irc) {
    var matches = irc.match(regex);
    while(matches) {
      var fgcode = matches[1];
      var isbg = matches[2];
      var content = matches[4];
      var isnstop = matches[5];
      var nfgcode = matches[6];
      var isnbg = matches[7];

      var fgName = ircParser.colorNames[fgcode];
      var color = ircParser.colors[fgName];

      if (isbg) {
        var bgCode = matches[3];
        var bgName = ircParser.colorNames[bgCode];
        var bgColor = ircParser.bgcolors['bg' + bgName];

        var replacement = '\x03' + fgcode + bgColor.replacement + '\x03';

        if (isnstop) {
          replacement += nfgcode;
          replacement += isnbg ? isnbg : ',' + bgCode;
        }

        irc = irc.replace(regex, replacement);
      }
      else if (isnstop) {
        replacement = color.replacement + '\x03' + nfgcode;

        if (isnbg) replacement += isnbg;

        irc = irc.replace(regex, replacement);
      }
      else {
        irc = irc.replace(regex, color.replacement);
      }

      matches = irc.match(regex);
    }

    if(irc.match(/\x03/g)) {
      irc = this.parse(irc + "\x03");
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
