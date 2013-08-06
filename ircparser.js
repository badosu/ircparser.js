IrcParser = function() {
  var ircParser = {};
  var colorChar = '\x03';
  var setupColors;
  var replaceTokens;

  ircParser.colors = {
    white:      { code: '(00)' },
    black:      { code: '(01)' },
    navy:       { code: '(02)' },
    green:      { code: '(03)' },
    red:        { code: '(04)' },
    brown:      { code: '(05)' },
    purple:     { code: '(06)' },
    olive:      { code: '(07)' },
    yellow:     { code: '(08)' },
    lightgreen: { code: '(09)' },
    teal:       { code: '(10)' },
    cyan:       { code: '(11)' },
    blue:       { code: '(12)' },
    pink:       { code: '(13)' },
    gray:       { code: '(14)' },
    lightgray:  { code: '(15)' }
  };

  ircParser.styles = {
    normal:    { code: '\x00', replacement: '$1'                  },
    bold:      { code: '\x02', replacement: '<strong>$1</strong>' },
    italic:    { code: '\x16', replacement: '<em>$1</em>'         },
    underline: { code: '\x1F', replacement: '<u>$1</u>'           }
  };

  ircParser.bgcolors = {};

  for (var colorName in ircParser.colors) {
    var color = ircParser.colors[colorName],
        exp = colorChar + color.code + '([^' + colorChar + ']*)' + colorChar,
        bgcode = "([0-9][0-9])," + color.code,
        bgexp = colorChar + bgcode + "([^" + colorChar + ']*)' + colorChar;

    color.regexp = new RegExp(exp, 'g');
    color.replacement = '<span class="irc-$1">$2</span>';

    ircParser.bgcolors['bg' + colorName] = {
      code: bgcode,
      regexp: new RegExp(bgexp, 'g'),
      replacement: '<span class="irc-$1 irc-bg$2">$3</span>'
    };
  }

  for (var styleName in ircParser.styles) {
    var style = ircParser.styles[styleName],
        exp = style.code + '([^' + style.code + ']*)' + style.code;

    style.regexp = new RegExp(exp, 'g');
  }

  replaceTokens = function(irc, collection) {
    for (var tokenName in collection) {
      var token = collection[tokenName];
      irc = irc.replace(token.regexp, token.replacement);
    }

    return irc;
  };

  ircParser.parse = function(irc) {
    irc = replaceTokens(irc, ircParser.bgcolors);
    irc = replaceTokens(irc, ircParser.styles);
    irc = replaceTokens(irc, ircParser.colors);

    return irc;
  };

  return ircParser;
};
