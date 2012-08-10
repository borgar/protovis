/**
 * Constructs a new date format with the specified string pattern.
 *
 * @class The format string is in the same format expected by the
 * <tt>strftime</tt> function in C. The following conversion specifications are
 * supported:<ul>
 *
 * <li>%a - abbreviated weekday name.</li>
 * <li>%A - full weekday name.</li>
 * <li>%b - abbreviated month names.</li>
 * <li>%B - full month names.</li>
 * <li>%c - locale's appropriate date and time.</li>
 * <li>%C - century number.</li>
 * <li>%d - day of month [01,31] (zero padded).</li>
 * <li>%D - same as %m/%d/%y.</li>
 * <li>%e - day of month [ 1,31] (space padded).</li>
 * <li>%f - milliseconds [000,999].</li>
 * <li>%F - same as %Y-%m-%d.</li>
 * <li>%g - ISO 8601 year without century [00,99].</li>
 * <li>%G - ISO 8601 year with century.</li>
 * <li>%h - same as %b.</li>
 * <li>%H - hour (24-hour clock) [00,23] (zero padded).</li>
 * <li>%I - hour (12-hour clock) [01,12] (zero padded).</li>
 * <li>%j - day number [1,366].</li>
 * <li>%k - hour (24-hour clock) [0,23].</li>
 * <li>%l - hour (12-hour clock) [1,12].</li>
 * <li>%m - month number [01,12] (zero padded).</li>
 * <li>%M - minute [0,59] (zero padded).</li>
 * <li>%n - newline character.</li>
 * <li>%p - locale's equivalent of a.m. or p.m. [AM,PM].</li>
 * <li>%P - like %p but in lowercase [am,pm].</li>
 * <li>%q - quarter of the year [1,4].</li>
 * <li>%Q - milliseconds [000,999] (zero padded).</li>
 * <li>%r - same as %I:%M:%S %p.</li>
 * <li>%R - same as %H:%M.</li>
 * <li>%s - number of seconds since unix Epoch.</li>
 * <li>%S - second [00,61] (zero padded).</li>
 * <li>%t - tab character.</li>
 * <li>%T - same as %H:%M:%S.</li>
 * <li>%u - ISO 8601 weekday number [1,7].</li>
 * <li>%U - week number [00,53].</li>
 * <li>%V - ISO 8601 week number [01,53].</li>
 * <li>%w - weekday number [0,6].</li>
 * <li>%W - week number [00,53].</li>
 * <li>%x - same as %m/%d/%y.</li>
 * <li>%X - same as %I:%M:%S %p.</li>
 * <li>%y - year with century [00,99] (zero padded).</li>
 * <li>%Y - year including century.</li>
 * <li>%z - time-zone hour offset from GMT.</li>
 * <li>%Z - timezone name or abbreviation.</li>
 * <li>%% - %.</li>
 *
 * </ul>In addition, the following conversion specifications are currently
 * <i>unsupported</i> for parsing:<ul>
 *
 * <li>%a - day of week, either abbreviated or full name.</li>
 * <li>%A - same as %a.</li>
 * <li>%A - same as %a.</li>
 * <li>%U - week number [00,53].</li>
 * <li>%w - weekday number [0,6].</li>
 * <li>%W - week number [00,53].</li>
 * <li>%z - time-zone hour offset from GMT.</li>
 * <li>%Z - timezone name or abbreviation.</li>
 *
 * </ul>
 *
 * @see <a
 * href="http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html">strftime</a>
 * documentation.
 * @see <a
 * href="http://www.opengroup.org/onlinepubs/007908799/xsh/strptime.html">strptime</a>
 * documentation.
 * @extends pv.Format
 * @param {string} pattern the format pattern.
 */
pv.Format.date = function(pattern) {
  var pad = pv.Format.pad;

  // expand shorthand notation
  pattern = pattern.replace( /%F/g, '%Y-%m-%d' )
                   .replace( /%[Dx]/g, '%m/%d/%y' )
                   .replace( /%[Xr]/g, '%I:%M:%S %p' )
                   .replace( /%R/g, '%H:%M' )
                   .replace( /%T/g, '%H:%M:%S' )
                   ;

  /** @private */
  function format(d) {
    // invalid dates will crash array lookups
    if ( isNaN(d) ) { return '☹'; }
    // format date
    return pattern.replace(/%[a-zA-Z0-9]/g, function(s) {
        switch (s) {
          case '%a': return format.days[d.getUTCDay()].substring(0,3);
          case '%A': return format.days[d.getUTCDay()];
          case '%h':
          case '%b': return format.months[d.getUTCMonth()].substring(0,3);
          case '%B': return format.months[d.getUTCMonth()];
          case '%c': return d.toLocaleString();
          case '%C': return pad("0", 2, Math.floor(d.getUTCFullYear() / 100) % 100);
          case '%d': return pad("0", 2, d.getUTCDate());
          // case %D: shorthand, see above
          case '%f':
          case '%Q': return pad("0", 3, d.getUTCMilliseconds());
          case '%e': return pad(" ", 2, d.getUTCDate());
          // case %F: shorthand, see above
          case '%g': return pad("0", 2, format.isocalendar(d)[0] % 100);
          case '%G': return pad("0", 4, format.isocalendar(d)[0]);
          case '%H': return pad("0", 2, d.getUTCHours());
          case '%I': return pad("0", 2, d.getUTCHours() % 12 || 12);
          case '%j': return pad("0", 3, Math.floor(( d - Date.UTC( d.getUTCFullYear(), 0, 1 ) ) / 864e5 ) + 1);
          case '%k': return d.getUTCHours();
          case '%l': return d.getUTCHours() % 12 || 12;
          case '%m': return pad("0", 2, d.getUTCMonth() + 1);
          case '%M': return pad("0", 2, d.getUTCMinutes());
          case '%n': return "\n";
          case '%p': return d.getUTCHours() < 12 ? "AM" : "PM";
          case '%P': return d.getUTCHours() < 12 ? "am" : "pm";
          case '%q': return Math.floor( d.getUTCMonth() / 3 ) + 1;
          // case %r: shorthand, see above
          // case %R: shorthand, see above
          case '%s': return ~~( d / 1000 );
          case '%S': return pad("0", 2, d.getUTCSeconds());
          case '%t': return "\t";
          // case %T: shorthand, see above
          case '%u': return d.getUTCDay() || 7;
          case '%U':
            var doy = Math.floor(( d - Date.UTC( d.getUTCFullYear(), 0, 1 ) ) / 864e5 ) + 1;
            return pad("0", 2, Math.floor((doy + 6 - d.getUTCDay()) / 7));
          case '%V':
            return pad("0", 2, format.isocalendar(d)[1]);
          case '%w': return d.getUTCDay();
          case '%W':
            var doy = Math.floor(( d - Date.UTC( d.getUTCFullYear(), 0, 1 ) ) / 864e5 ) + 1;
            return pad("0", 2, Math.floor((doy + 7 - (d.getUTCDay() || 7)) / 7));
          // case %x: shorthand, see above
          // case %X: shorthand, see above
          case '%y': return pad("0", 2, d.getUTCFullYear() % 100);
          case '%Y': return d.getUTCFullYear();
          case '%z': return "+0000";
          case '%Z': return "UTC";
          case '%%': return "%";
        }
        return s;
      });
  }

  /**
   * Converts a date to a string using the associated formatting pattern.
   *
   * @function
   * @name pv.Format.date.prototype.format
   * @param {Date} date a date to format.
   * @returns {string} the formatted date as a string.
   */
  format.format = format;

  // Create expression from format pattern and register callbacks for 
  // each field in the format pattern.
  var fields = [function(){}],
      parse_re = pv.Format.re(pattern).replace(/(%[a-zA-Z0-9]|\s+)/g, function(s) {
        // flexible whitespace
        if ( /^\s/.test(s) ) { return "\\s+"; }
        switch (s) {
          case '%A': // TODO %U: weekday [monday,sunday]
          case '%a': // TODO %U: weekday [mon,sun]
            fields.push(function(){});
            return "([A-Za-z]+)";
          case '%b': // [jan,dec]
          case '%h': // [jan,dec]
          case '%B': // [january,december]
            fields.push(function(x,d) {
              x = x.toLowerCase();
              var m = -1, mn = this.months, l = x.length;
              while ( ++m < 12 ) {
                if ( mn[m].substr(0,l).toLowerCase() == x ) {
                  return (d.month = m);
                }
              }
            });
            return "([A-Za-z]+)";
          case '%C': // [00,99]
            fields.push(function(x,d) { d.year = x * 100 + d.year % 100; });
            return "(\\d\\d)";
          case '%e': // [ 1,31]
            fields.push(function(x,d) { d.date = Number(x); });
            return "\\s?([12]\\d|3[01]|[1-9])";
          case '%d': // [01,31]
            fields.push(function(x,d) { d.date = Number(x); });
            return "\\s?(0[1-9]|[12]\\d|3[01])";
          case '%f': // [000,999]([000,999])?
          case '%Q': // [000,999]([000,999])?
            fields.push(function(x,d) { d.msec = parseFloat('0.' + x) * 1000; });
            return "(\\d{3,6})";
          case '%g': // [00,99] iso year
            fields.push(function(x,d) {
              x = Number(x);
              d.isoyear = x + (x < 69 ? 2000 : 1900);
            });
            return "(\\d\\d)";
          case '%G': // [0000,9999] iso year
            fields.push(function(x,d) { d.isoyear = Number(x); });
            return "(\\d{4})";
          case '%I': // [01,12]
            fields.push(function(x,d) { d.hour = Number(x); });
            return "(0?\\d|[12]\\d)";
          case '%H': // [00,23]
            fields.push(function(x,d) { d.hour = Number(x); });
            return "(0?\\d|1\\d|2[0-4])";
          case '%j': // [001,366]
            fields.push(function(x,d) { d.month = 0; d.date = Number(x);
            });
            return "(\\d{3})";
          case '%l': // [ 1,12]
            fields.push(function(x,d) { d.hour = Number(x); });
            return "\\s?(\\d|1[012])";
          case '%m': // [01,12]
            fields.push(function(x,d) { d.month = Number(x)-1; });
            return "(0?[1-9]|1[012])";
          case '%M': // [00,59]
            fields.push(function(x,d) { d.minute = Number(x); });
            return "(0\\d|[1-5]\\d)";
          case '%p': // [AM,PM]
          case '%P': // [am,pm]
            fields.push(function(x,d) {
              d.hour = (d.hour % 12) + (/^a\.?m$/i.test(x) ? 0 : 12);
            });
            return "([ap]\\.?m|[AP]\\.?M)\\.?";
          case '%q': // [1,4]
            fields.push(function(x,d) {
              d.date = 1;
              d.month = (Number(x) - 1) * 3;
            });
            return "(\\d)";
          case '%s':
            fields.push(function(x,d) { d.ts = x * 1000; });
            return "(-?\\d+)";
          case '%S':
            fields.push(function(x,d) { d.second = Number(x); });
            return "(0\\d|[1-5]\\d|6[01])";
          case "%n": // "\n"
          case "%t": // "\t"
            return "\\s*";
          case "%U": // TODO %U: week number [00,53]
            fields.push(function(){});
            return "(0?\\d|[1-4]\\d|5[0-3])";
          case "%u": // iso weekday [1,7]
            fields.push(function (x,d) { d.isoday = Number(x); });
            return '([1-7])';
          case '%V':
            fields.push(function(x,d) { d.isoweek = Number(x); });
            return "(0[1-9]|[1-4]\\d|5[0-3])";
          case "%w": // weekday [0,6]
            fields.push(function(){});
            return '([0-6])';
          case '%W': // TODO %W: week number [00,53]
            fields.push(function(){});
            return "(0?\\d|[1-4]\\d|5[0-3])";
          case '%y': // [00,99]
            fields.push(function(x,d) {
              x = Number(x);
              d.year = x + (x < 69 ? 2000 : 1900);
            });
            return "(\\d\\d)";
          case '%Y': // [0000,9999]
            fields.push(function(x,d) { d.year = Number(x); });
            return "(\\d{4})";
          case '%z':
          case '%Z':
            fields.push(function(){});
            return "([+-]\\d{4}|GMT|[CEP]ST|UTC|Z)";
          case '%%': // "%"
            return "%";
        }
        return s;
      });


  /**
   * Parses a date from a string using the associated formatting pattern.
   *
   * @function
   * @name pv.Format.date.prototype.parse
   * @param {string} s the string to parse as a date.
   * @returns {Date} the parsed date.
   */
  format.parse = function(s) {
    var match = s.match(parse_re);
    if ( match ) {
      var d = {
        msec: 0,
        second: 0,
        minute: 0,
        hour: 0,
        date: 1,
        month: 0,
        year: 1970,
        isoyear: null,
        isoweek: null,
        isoday: null,
        ts: null
      };
      match.forEach(function(m, i) { fields[i].call(format, m, d); });
      // have timestamp
      if ( d.ts !== null ) { return new Date(d.ts); }
      // convert iso
      if ( d.isoyear !== null && d.isoweek !== null ) {
        var iy = new Date(Date.UTC(d.isoyear, 0, 3));
        d.year = d.isoyear;
        d.month = 0;
        d.date = 3 - iy.getUTCDay() + (d.isoweek - 1) * 7 + (d.isoday || 1);
      }
      return new Date(Date.UTC(d.year, d.month, d.date, d.hour, d.minute, d.second, d.msec));
    }
    return new Date('?'); // Invalid Date
  };

  // allow overwriting the month/days
  // FIXME: replace with a translation hook
  format.months = [ "January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December" ];
  format.days   = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                    "Saturday" ];

  /** @private */
  format.isocalendar = function ( dt ) {
    var d = dt.getUTCDay(),
        t = new Date( dt * 1 );
    t.setDate( t.getDate() - ((d + 6) % 7) + 3 );
    var iso_year = t.getUTCFullYear(),
        w = Math.floor( (t.getTime() - Date.UTC(iso_year, 0, 1, -6)) / 864e5 );
    // return a 3-tuple, (ISO year, ISO week number, ISO weekday).
    return [ iso_year, 1+Math.floor(w/7), d||7 ];
  };

  return format;
};
