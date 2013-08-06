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
        expect(parsed).toEqual('<span class="irc-03 irc-bg04"></span>');
      });

      it("replaces green with bgred code", function() {
        parsed = ircParser.parse("\x0303,04test\x03");
        expect(parsed).toEqual('<span class="irc-03 irc-bg04">test</span>');
      });
    });
  });
});
