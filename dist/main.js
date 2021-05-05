(()=>{"use strict";const t=function(t,e,n,r){return((t,e,n,r)=>{let a={title:t,description:e,priority:n,due_date:r,is_displayed:!1,children:[]};return Object.assign({state:a})})(t,e,n,r)};function e(t,e){let n=document.createElement("input");return n.setAttribute("type","text"),n.setAttribute("class","form_field"),n.placeholder=t,n.required=e,n}function n(t,e,n){let r=document.createElement("option");r.setAttribute("value",e);let a=document.createTextNode(t);r.appendChild(a),n.appendChild(r)}function r(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function a(t){r(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function i(t){r(1,arguments);var e=a(t);return!isNaN(e)}var o={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function u(t){return function(e){var n=e||{},r=n.width?String(n.width):t.defaultWidth;return t.formats[r]||t.formats[t.defaultWidth]}}var s,c={date:u({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:u({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:u({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},d={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function l(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,o=a.width?String(a.width):i;r=t.formattingValues[o]||t.formattingValues[i]}else{var u=t.defaultWidth,s=a.width?String(a.width):t.defaultWidth;r=t.values[s]||t.values[u]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function f(t){return function(e,n){var r=String(e),a=n||{},i=a.width,o=i&&t.matchPatterns[i]||t.matchPatterns[t.defaultMatchWidth],u=r.match(o);if(!u)return null;var s,c=u[0],d=i&&t.parsePatterns[i]||t.parsePatterns[t.defaultParseWidth];return s="[object Array]"===Object.prototype.toString.call(d)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(c))return n}(d):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(c))return n}(d),s=t.valueCallback?t.valueCallback(s):s,{value:s=a.valueCallback?a.valueCallback(s):s,rest:r.slice(c.length)}}}const m={code:"en-US",formatDistance:function(t,e,n){var r;return n=n||{},r="string"==typeof o[t]?o[t]:1===e?o[t].one:o[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+r:r+" ago":r},formatLong:c,formatRelative:function(t,e,n,r){return d[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:l({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:l({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:l({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:l({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:l({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(s={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),r=e||{},a=n.match(s.matchPattern);if(!a)return null;var i=a[0],o=n.match(s.parsePattern);if(!o)return null;var u=s.valueCallback?s.valueCallback(o[0]):o[0];return{value:u=r.valueCallback?r.valueCallback(u):u,rest:n.slice(i.length)}}),era:f({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:f({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:f({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:f({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:f({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function h(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function g(t,e){r(2,arguments);var n=a(t).getTime(),i=h(e);return new Date(n+i)}function w(t,e){r(2,arguments);var n=h(e);return g(t,-n)}function b(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const v=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return b("yy"===e?r%100:r,e.length)},p=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):b(n+1,2)},y=function(t,e){return b(t.getUTCDate(),e.length)},T=function(t,e){return b(t.getUTCHours()%12||12,e.length)},C=function(t,e){return b(t.getUTCHours(),e.length)},M=function(t,e){return b(t.getUTCMinutes(),e.length)},D=function(t,e){return b(t.getUTCSeconds(),e.length)},E=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return b(Math.floor(r*Math.pow(10,n-3)),e.length)};var x=864e5;function U(t){r(1,arguments);var e=1,n=a(t),i=n.getUTCDay(),o=(i<e?7:0)+i-e;return n.setUTCDate(n.getUTCDate()-o),n.setUTCHours(0,0,0,0),n}function P(t){r(1,arguments);var e=a(t),n=e.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(n+1,0,4),i.setUTCHours(0,0,0,0);var o=U(i),u=new Date(0);u.setUTCFullYear(n,0,4),u.setUTCHours(0,0,0,0);var s=U(u);return e.getTime()>=o.getTime()?n+1:e.getTime()>=s.getTime()?n:n-1}function k(t){r(1,arguments);var e=P(t),n=new Date(0);n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0);var a=U(n);return a}var N=6048e5;function S(t,e){r(1,arguments);var n=e||{},i=n.locale,o=i&&i.options&&i.options.weekStartsOn,u=null==o?0:h(o),s=null==n.weekStartsOn?u:h(n.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=a(t),d=c.getUTCDay(),l=(d<s?7:0)+d-s;return c.setUTCDate(c.getUTCDate()-l),c.setUTCHours(0,0,0,0),c}function _(t,e){r(1,arguments);var n=a(t,e),i=n.getUTCFullYear(),o=e||{},u=o.locale,s=u&&u.options&&u.options.firstWeekContainsDate,c=null==s?1:h(s),d=null==o.firstWeekContainsDate?c:h(o.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(i+1,0,d),l.setUTCHours(0,0,0,0);var f=S(l,e),m=new Date(0);m.setUTCFullYear(i,0,d),m.setUTCHours(0,0,0,0);var g=S(m,e);return n.getTime()>=f.getTime()?i+1:n.getTime()>=g.getTime()?i:i-1}function W(t,e){r(1,arguments);var n=e||{},a=n.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:h(i),u=null==n.firstWeekContainsDate?o:h(n.firstWeekContainsDate),s=_(t,e),c=new Date(0);c.setUTCFullYear(s,0,u),c.setUTCHours(0,0,0,0);var d=S(c,e);return d}var Y=6048e5;function L(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=e||"";return n+String(a)+o+b(i,2)}function O(t,e){return t%60==0?(t>0?"-":"+")+b(Math.abs(t)/60,2):H(t,e)}function H(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+b(Math.floor(a/60),2)+n+b(a%60,2)}const A={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return v(t,e)},Y:function(t,e,n,r){var a=_(t,r),i=a>0?a:1-a;return"YY"===e?b(i%100,2):"Yo"===e?n.ordinalNumber(i,{unit:"year"}):b(i,e.length)},R:function(t,e){return b(P(t),e.length)},u:function(t,e){return b(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return b(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return b(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return p(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return b(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,i){var o=function(t,e){r(1,arguments);var n=a(t),i=S(n,e).getTime()-W(n,e).getTime();return Math.round(i/Y)+1}(t,i);return"wo"===e?n.ordinalNumber(o,{unit:"week"}):b(o,e.length)},I:function(t,e,n){var i=function(t){r(1,arguments);var e=a(t),n=U(e).getTime()-k(e).getTime();return Math.round(n/N)+1}(t);return"Io"===e?n.ordinalNumber(i,{unit:"week"}):b(i,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):y(t,e)},D:function(t,e,n){var i=function(t){r(1,arguments);var e=a(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var i=e.getTime(),o=n-i;return Math.floor(o/x)+1}(t);return"Do"===e?n.ordinalNumber(i,{unit:"dayOfYear"}):b(i,e.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return b(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return b(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return b(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return T(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):C(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):b(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):b(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):M(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):D(t,e)},S:function(t,e){return E(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return O(a);case"XXXX":case"XX":return H(a);case"XXXXX":case"XXX":default:return H(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return O(a);case"xxxx":case"xx":return H(a);case"xxxxx":case"xxx":default:return H(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+L(a,":");case"OOOO":default:return"GMT"+H(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+L(a,":");case"zzzz":default:return"GMT"+H(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return b(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return b((r._originalDate||t).getTime(),e.length)}};function q(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}}function z(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}}const F={p:z,P:function(t,e){var n,r=t.match(/(P+)(p+)?/),a=r[1],i=r[2];if(!i)return q(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;case"PPPP":default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",q(a,e)).replace("{{time}}",z(i,e))}};function j(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var B=["D","DD"],X=["YY","YYYY"];function Q(t){return-1!==B.indexOf(t)}function G(t){return-1!==X.indexOf(t)}function I(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var R=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,J=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Z=/^'([^]*?)'?$/,$=/''/g,V=/[a-zA-Z]/;function K(t){return t.match(Z)[1].replace($,"'")}var tt=36e5,et={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},nt=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,rt=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,at=/^([+-])(\d{2})(?::?(\d{2}))?$/;function it(t,e){r(1,arguments);var n=e||{},a=null==n.additionalDigits?2:h(n.additionalDigits);if(2!==a&&1!==a&&0!==a)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var i,o=ot(t);if(o.date){var u=ut(o.date,a);i=st(u.restDateString,u.year)}if(isNaN(i)||!i)return new Date(NaN);var s,c=i.getTime(),d=0;if(o.time&&(d=dt(o.time),isNaN(d)||null===d))return new Date(NaN);if(!o.timezone){var l=new Date(c+d),f=new Date(0);return f.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),f.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),f}return s=ft(o.timezone),isNaN(s)?new Date(NaN):new Date(c+d+s)}function ot(t){var e,n={},r=t.split(et.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?(n.date=null,e=r[0]):(n.date=r[0],e=r[1],et.timeZoneDelimiter.test(n.date)&&(n.date=t.split(et.timeZoneDelimiter)[0],e=t.substr(n.date.length,t.length))),e){var a=et.timezone.exec(e);a?(n.time=e.replace(a[1],""),n.timezone=a[1]):n.time=e}return n}function ut(t,e){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=t.match(n);if(!r)return{year:null};var a=r[1]&&parseInt(r[1]),i=r[2]&&parseInt(r[2]);return{year:null==i?a:100*i,restDateString:t.slice((r[1]||r[2]).length)}}function st(t,e){if(null===e)return null;var n=t.match(nt);if(!n)return null;var r=!!n[4],a=ct(n[1]),i=ct(n[2])-1,o=ct(n[3]),u=ct(n[4]),s=ct(n[5])-1;if(r)return function(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}(0,u,s)?function(t,e,n){var r=new Date(0);r.setUTCFullYear(t,0,4);var a=7*(e-1)+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+a),r}(e,u,s):new Date(NaN);var c=new Date(0);return function(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(mt[e]||(ht(t)?29:28))}(e,i,o)&&function(t,e){return e>=1&&e<=(ht(t)?366:365)}(e,a)?(c.setUTCFullYear(e,i,Math.max(a,o)),c):new Date(NaN)}function ct(t){return t?parseInt(t):1}function dt(t){var e=t.match(rt);if(!e)return null;var n=lt(e[1]),r=lt(e[2]),a=lt(e[3]);return function(t,e,n){return 24===t?0===e&&0===n:n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}(n,r,a)?n*tt+6e4*r+1e3*a:NaN}function lt(t){return t&&parseFloat(t.replace(",","."))||0}function ft(t){if("Z"===t)return 0;var e=t.match(at);if(!e)return 0;var n="+"===e[1]?-1:1,r=parseInt(e[2]),a=e[3]&&parseInt(e[3])||0;return function(t,e){return e>=0&&e<=59}(0,a)?n*(r*tt+6e4*a):NaN}var mt=[31,null,31,30,31,30,31,31,30,31,30,31];function ht(t){return t%400==0||t%4==0&&t%100}let gt=function(){let t=JSON.parse(localStorage.getItem("task_array"));return null==t?[]:t}();function wt(i,o){let u=function(t){let e=document.getElementById("content"),n=parseInt(t.id)+1,r=document.createElement("div");return r.setAttribute("id",n),r.setAttribute("class","column"),e.appendChild(r),r}(i);!function(t,e,n){let i=document.createElement("button");i.setAttribute("class","sort_button"),i.addEventListener("click",(function(){!function(t){t.sort((function(t,e){return""==t.state.due_date&&""!=e.state.due_date?1:""==e.state.due_date&&""!=t.state.due_date?-1:""==e.state.due_date&&""==e.state.due_date?0:function(t,e){r(2,arguments);var n=a(t),i=a(e),o=n.getTime()-i.getTime();return o<0?-1:o>0?1:o}(it(t.state.due_date),it(e.state.due_date))})),yt()}(n);let i=t.getElementsByClassName("titles_container");i[0].innerHTML="",bt(n,i[0],e,!1)})),i.innerHTML="Sort by Date",t.appendChild(i);let o=document.createElement("button");o.setAttribute("class","sort_button"),o.addEventListener("click",(function(){!function(t){t.sort((function(t,e){return parseInt(t.state.priority)-parseInt(e.state.priority)})),yt()}(n);let r=t.getElementsByClassName("titles_container");r[0].innerHTML="",bt(n,r[0],e,!1)})),o.innerHTML="Sort by Priority",t.appendChild(o)}(i,u,o);let s=function(t){let e=document.createElement("div");return e.setAttribute("class","titles_container"),t.appendChild(e),e}(i),c=function(t){let e=document.createElement("button");return e.setAttribute("class","new_task_button"),e.innerHTML="New Task",t.appendChild(e),e}(i);c.addEventListener("click",(function(){0==i.getElementsByClassName("form_container").length&&function(r,a,i,o,u){let s=function(t,r){let a=document.createElement("form"),i=e("Enter Title",!0),o=e("Enter Description",!1),u=function(t){let e=document.createElement("SELECT");return e.setAttribute("class","form_field"),e.required=!1,n("Select Priority (Optional)",4,e),n("Low",3,e),n("Medium",2,e),n("High",1,e),e}(),s=function(t){let e=document.createElement("input");return e.setAttribute("type","date"),e.setAttribute("class","form_field"),e.required=!1,e}(),c=document.createElement("button");c.setAttribute("type","button"),c.setAttribute("class","form_button"),c.innerHTML="Cancel",c.addEventListener("click",(function(){!function(t){t.remove()}(t)}));let d=document.createElement("button");d.setAttribute("type","submit"),d.setAttribute("class","form_button"),d.innerHTML="Submit",a.appendChild(i),a.appendChild(o),a.appendChild(u),a.appendChild(s),a.appendChild(d),a.appendChild(c);let l=[i,o,u,s];return t.appendChild(a),{form:a,fields_array:l}}(r);s.form.onsubmit=function(){return function(t,e,n){let r=e(t[0].value,t[1].value,t[2].value,t[3].value);n.push(r)}(s.fields_array,t,i),yt(),r.remove(),o.innerHTML="",bt(i,o,u,!1),!1}}(function(t){let e=document.createElement("div");return e.setAttribute("class","form_container"),t.appendChild(e),e}(i),0,o,s,u)})),bt(o,s,u)}function bt(t,e,n,o=!0){t.forEach((function(u){1==o&&(u.state.is_displayed=!1);let s=document.createElement("div");"1"==u.state.priority?s.setAttribute("class","title_and_delete_button_container high_priority"):"2"==u.state.priority?s.setAttribute("class","title_and_delete_button_container medium_priority"):"3"==u.state.priority?s.setAttribute("class","title_and_delete_button_container low_priority"):s.setAttribute("class","title_and_delete_button_container");let c=function(t,e){let n=document.createElement("div");return n.setAttribute("class","title"),n.innerHTML=t.state.title,e.appendChild(n),n}(u,s);c.addEventListener("click",(function(){pt(n),function(t,e){t.forEach((function(t){t.state.is_displayed=!1})),e.state.is_displayed=!0}(t,u),function(t,e){vt(e.id);let n=function(t){let e=document.createElement("div");return e.setAttribute("class","info_container"),t.appendChild(e),e}(e),o=document.createElement("div");o.setAttribute("class","info_container_title"),o.innerHTML="Title: "+t.state.title,n.appendChild(o);let u=document.createElement("div");u.innerHTML="Description: "+t.state.description,n.appendChild(u);let s=document.createElement("div");if(s.innerHTML="Priority: "+("1"==(c=t.state.priority)?"High":"2"==c?"Normal":"3"==c?"Low":"None"),n.appendChild(s),""!=t.state.due_date){let e=document.createElement("div");e.innerHTML="Due Date: "+function(t,e,n){r(2,arguments);var o=String(e),u=n||{},s=u.locale||m,c=s.options&&s.options.firstWeekContainsDate,d=null==c?1:h(c),l=null==u.firstWeekContainsDate?d:h(u.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var f=s.options&&s.options.weekStartsOn,g=null==f?0:h(f),b=null==u.weekStartsOn?g:h(u.weekStartsOn);if(!(b>=0&&b<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!s.localize)throw new RangeError("locale must contain localize property");if(!s.formatLong)throw new RangeError("locale must contain formatLong property");var v=a(t);if(!i(v))throw new RangeError("Invalid time value");var p=j(v),y=w(v,p),T={firstWeekContainsDate:l,weekStartsOn:b,locale:s,_originalDate:v};return o.match(J).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,F[e])(t,s.formatLong,T):t})).join("").match(R).map((function(n){if("''"===n)return"'";var r=n[0];if("'"===r)return K(n);var a=A[r];if(a)return!u.useAdditionalWeekYearTokens&&G(n)&&I(n,e,t),!u.useAdditionalDayOfYearTokens&&Q(n)&&I(n,e,t),a(y,n,s.localize,T);if(r.match(V))throw new RangeError("Format string contains an unescaped latin alphabet character `"+r+"`");return n})).join("")}(it(t.state.due_date),"MM/dd/yyyy"),n.appendChild(e)}var c}(u,n),wt(n,u.state.children)}));let d=function(t){let e=document.createElement("a");return e.innerHTML="X",e.setAttribute("class","delete_button"),t.appendChild(e),e}(s);d.addEventListener("click",(function(){!function(t,e){1==e.state.is_displayed&&(vt(t.id),pt(t))}(n,u),function(t,e){let n=e.indexOf(t);e.splice(n,1),yt()}(u,t),c.remove(),d.remove()})),e.appendChild(s)}))}function vt(t){let e=document.getElementById("content").getElementsByClassName("column");for(let n=e.length-1;n>t;n--)e[n].remove()}function pt(t){t.innerHTML=""}function yt(){localStorage.setItem("task_array",JSON.stringify(gt))}!function(){let t=document.getElementById("content"),e=document.createElement("div");e.id=0,e.setAttribute("class","column"),t.appendChild(e),wt(e,gt)}()})();