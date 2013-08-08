require('../ircparser.js');

describe("IrcParser", function() {
  it("is defined", function() {
    expect(IrcParser).toBeDefined();
  });

  describe(".parse", function() {
    beforeEach(function() {
      ircParser = new IrcParser();
    });

    it("is idempotent when there are no codes", function() {
      expect(ircParser.parse("test")).toEqual('test');
    });

    describe('style codes', function() {
      it("replaces normal code", function() {
        parsed = ircParser.parse("\x00test\x00");
        expect(parsed).toEqual('test');
      });

      it("replaces bold code", function() {
        parsed = ircParser.parse("\x02test\x02");
        expect(parsed).toEqual('<strong>test</strong>');
      });

      it("replaces italic code", function() {
        parsed = ircParser.parse("\x16test\x16");
        expect(parsed).toEqual('<em>test</em>');
      });

      it("replaces underline code", function() {
        parsed = ircParser.parse("\x1Ftest\x1F");
        expect(parsed).toEqual('<u>test</u>');
      });

      it("can customize the normal replacement string", function() {
        ircParser.styles.normal.replacement = '|n|$1|n|'
        parsed = ircParser.parse("\x00test\x00");
        expect(parsed).toEqual('|n|test|n|');
      });

      it("can customize the bold replacement string", function() {
        ircParser.styles.bold.replacement = '|b|$1|b|'
        parsed = ircParser.parse("\x02test\x02");
        expect(parsed).toEqual('|b|test|b|');
      });

      it("can customize the underline replacement string", function() {
        ircParser.styles.underline.replacement = '|u|$1|u|'
        parsed = ircParser.parse("\x1ftest\x1f");
        expect(parsed).toEqual('|u|test|u|');
      });

      it("can customize the italic replacement string", function() {
        ircParser.styles.italic.replacement = '|i|$1|i|'
        parsed = ircParser.parse("\x16test\x16");
        expect(parsed).toEqual('|i|test|i|');
      });
    });

    describe('color codes', function() {
      it("replaces white code", function() {
        parsed = ircParser.parse("\x0300test\x03");
        expect(parsed).toEqual('<span class="irc-00">test</span>');
      });

      it("replaces black code", function() {
        parsed = ircParser.parse("\x0301test\x03");
        expect(parsed).toEqual('<span class="irc-01">test</span>');
      });

      it("replaces navy code", function() {
        parsed = ircParser.parse("\x0302test\x03");
        expect(parsed).toEqual('<span class="irc-02">test</span>');
      });

      it("replaces green code", function() {
        parsed = ircParser.parse("\x0303test\x03");
        expect(parsed).toEqual('<span class="irc-03">test</span>');
      });

      it("replaces red code", function() {
        parsed = ircParser.parse("\x0304test\x03");
        expect(parsed).toEqual('<span class="irc-04">test</span>');
      });

      it("replaces brown code", function() {
        parsed = ircParser.parse("\x0305test\x03");
        expect(parsed).toEqual('<span class="irc-05">test</span>');
      });

      it("replaces purple code", function() {
        parsed = ircParser.parse("\x0306test\x03");
        expect(parsed).toEqual('<span class="irc-06">test</span>');
      });

      it("replaces olive code", function() {
        parsed = ircParser.parse("\x0307test\x03");
        expect(parsed).toEqual('<span class="irc-07">test</span>');
      });

      it("replaces yellow code", function() {
        parsed = ircParser.parse("\x0308test\x03");
        expect(parsed).toEqual('<span class="irc-08">test</span>');
      });

      it("replaces lightgreen code", function() {
        parsed = ircParser.parse("\x0309test\x03");
        expect(parsed).toEqual('<span class="irc-09">test</span>');
      });

      it("replaces teal code", function() {
        parsed = ircParser.parse("\x0310test\x03");
        expect(parsed).toEqual('<span class="irc-10">test</span>');
      });

      it("replaces cyan code", function() {
        parsed = ircParser.parse("\x0311test\x03");
        expect(parsed).toEqual('<span class="irc-11">test</span>');
      });

      it("replaces blue code", function() {
        parsed = ircParser.parse("\x0312test\x03");
        expect(parsed).toEqual('<span class="irc-12">test</span>');
      });

      it("replaces pink code", function() {
        parsed = ircParser.parse("\x0313test\x03");
        expect(parsed).toEqual('<span class="irc-13">test</span>');
      });

      it("replaces gray code", function() {
        parsed = ircParser.parse("\x0314test\x03");
        expect(parsed).toEqual('<span class="irc-14">test</span>');
      });

      it("replaces lightgray code", function() {
        parsed = ircParser.parse("\x0315test\x03");
        expect(parsed).toEqual('<span class="irc-15">test</span>');
      });

      it("replaces black, followed by white code", function() {
        parsed = ircParser.parse("\x0301te\x03\x0300st\x03");
        expect(parsed).toEqual('<span class="irc-01">te</span>' +
                               '<span class="irc-00">st</span>');
      });

      it("replaces black interpolating to white code", function() {
        parsed = ircParser.parse("\x0301te\x0300st\x03");
        expect(parsed).toEqual('<span class="irc-01">te</span>' +
                               '<span class="irc-00">st</span>');
      });

      it("erases color codes from empty messages", function() {
        parsed = ircParser.parse("\x0303\x03");
        expect(parsed).toEqual('<span class="irc-03"></span>');
      });

      it("replaces when content is a number", function() {
        parsed = ircParser.parse("\x03062\x03");
        expect(parsed).toEqual('<span class="irc-06">2</span>');
      });
    });

    describe('background color codes', function() {
      it("erases color codes from empty messages", function() {
        parsed = ircParser.parse("\x0303,04\x03");
        expect(parsed).toEqual('<span class="irc-03">' +
                               '<span class="irc-bg04"></span></span>');
      });

      it("replaces green with bgred code", function() {
        parsed = ircParser.parse("\x0303,04test\x03");
        expect(parsed).toEqual('<span class="irc-03">' +
                               '<span class="irc-bg04">test</span></span>');
      });

      it("handles background inheritance", function() {
        parsed = ircParser.parse("\x0301,03Hello \x0302to you\x03");
        expect(parsed).
          toEqual('<span class="irc-01"><span class="irc-bg03">Hello </span></span>' +
                  '<span class="irc-02"><span class="irc-bg03">to you</span></span>');
      });

      it("handles background concatenation", function() {
        parsed = ircParser.parse("\x0301,03Hello \x0302,04to you\x03");
        expect(parsed).
          toEqual('<span class="irc-bg03"><span class="irc-01">Hello </span>' +
                  '</span><span class="irc-02"><span class="ircbg04">to you' +
                  '</span></span>');
      });
    });
  });
});
