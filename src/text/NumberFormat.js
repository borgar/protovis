/**
 * Returns a default number format.
 *
 * @class Represents a number format, converting between a <tt>number</tt> and a
 * <tt>string</tt>. This class allows numbers to be formatted with variable
 * precision (both for the integral and fractional part of the number), optional
 * thousands grouping, and optional padding. The thousands (",") and decimal
 * (".") separator can be customized.
 *
 * @returns {pv.Format.number} a number format.
 */
pv.Format.number = function() {
  var mini = 0, // default minimum integer digits
      maxi = Infinity, // default maximum integer digits
      mins = 0, // mini, including group separators
      minf = 0, // default minimum fraction digits
      maxf = 0, // default maximum fraction digits
      maxk = 1, // 10^maxf
      padi = "0", // default integer pad
      padistr = "",
      padf = "0", // default fraction pad
      padfstr = "",
      padg = true, // whether group separator affects integer padding
      decimal = ".", // default decimal separator
      group = ",", // default group separator
      np = "\u2212", // default negative prefix
      ns = "", // default negative suffix
      sym = true; // default symmetrical number rounding

  /** @private */
  function format(x) {
    // Round the fractional part, and split on decimal separator.
    if ( Infinity > maxf ) {
      x = (x < 0 && sym) ? -Math.round(-x * maxk) / maxk : Math.round(x * maxk) / maxk;
    }
    // Pad, truncate and group the integral part.
    var neg = (x < 0),
        pad = '',
        d = '',
        f = '',
        s = String(Math.abs(x)).split("."),
        l = s[0].length,
        n = Math.floor(Math.abs(x));
    // truncate the int if it overflows max int digits
    if ( l > maxi ) {
      n = Number(s[0].substring(l - maxi));
      l = maxi;
    }
    // pad the integer if it doesn't reach min integer digits (group doesn't affect)
    if ( padg && (l < mini) ) {
      pad = padistr.substring(0, mini - l);
    }
    // digit grouping
    var c, i = '';
    do {
      c = ( n % 1000 );
      n = Math.floor( n / 1000 );
      i = ( n ? group : '' ) +
          ( c < 100 && n ? '0' : '' ) +
          ( c <  10 && n ? '0' : '' ) +
          ( c + i );
      n && ++l;
    } while ( n );
    // pad the integer if it doesn't reach min integer digits (group affects)
    if ( !padg && (l < mins) ) {
      pad = padistr.substring(0, mins - l);
    }
    // Pad the fractional part.
    if ( x % 1 ) {
      d = decimal;
      f = s[1] + padfstr.substring(0, minf - s[1].length);
    }
    return ( neg ) ? np + pad + i + d + f + ns
                   :      pad + i + d + f;
  }

  /**
   * @function
   * @name pv.Format.number.prototype.format
   * @param {number} x
   * @returns {string}
   */
  format.format = format;

  /**
   * Parses the specified string as a number. Before parsing, leading and
   * trailing padding is removed. Group separators are also removed, and the
   * decimal separator is replaced with the standard point ("."). The integer
   * part is truncated per the maximum integer digits, and the fraction part is
   * rounded per the maximum fraction digits.
   *
   * @function
   * @name pv.Format.number.prototype.parse
   * @param {string} x the string to parse.
   * @returns {number} the parsed number.
   */
  format.parse = function(x) {
    var re = pv.Format.re;
        compile = re.compile;

    /* Remove leading and trailing padding. Split on the decimal separator. */
    var s = String(x)
        .replace(compile("^(?:" + re(padi) + ")*"), "")
        .replace(compile("(?:" + re(padf) + ")*$"), "")
        .split(decimal);

    /* Remove grouping and truncate the integral part. */
    var i = s[0].replace(compile(re(group), "g"), "");
    if (i.length > maxi) i = i.substring(i.length - maxi);

    /* Round the fractional part. */
    var f = s[1] ? Number("0." + s[1]) : 0;
    if (Infinity > maxf) f = Math.round(f * maxk) / maxk;

    return Math.round(i) + f;
  };

  /**
   * Sets or gets the minimum and maximum number of integer digits. This
   * controls the number of decimal digits to display before the decimal
   * separator for the integral part of the number. If the number of digits is
   * smaller than the minimum, the digits are padded; if the number of digits is
   * larger, the digits are truncated, showing only the lower-order digits. The
   * default range is [0, Infinity].
   *
   * <p>If only one argument is specified to this method, this value is used as
   * both the minimum and maximum number. If no arguments are specified, a
   * two-element array is returned containing the minimum and the maximum.
   *
   * @function
   * @name pv.Format.number.prototype.integerDigits
   * @param {number} [min] the minimum integer digits.
   * @param {number} [max] the maximum integer digits.
   * @returns {pv.Format.number} <tt>this</tt>, or the current integer digits.
   */
  format.integerDigits = function(min, max) {
    if (arguments.length) {
      mini = Number(min);
      maxi = (arguments.length > 1) ? Number(max) : mini;
      mins = mini + Math.floor(mini / 3) * group.length;
      padistr = pv.Format.pad(padi, mini, ''); // precalc padding
      return this;
    }
    return [mini, maxi];
  };

  /**
   * Sets or gets the minimum and maximum number of fraction digits. The
   * controls the number of decimal digits to display after the decimal
   * separator for the fractional part of the number. If the number of digits is
   * smaller than the minimum, the digits are padded; if the number of digits is
   * larger, the fractional part is rounded, showing only the higher-order
   * digits. The default range is [0, 0].
   *
   * <p>If only one argument is specified to this method, this value is used as
   * both the minimum and maximum number. If no arguments are specified, a
   * two-element array is returned containing the minimum and the maximum.
   *
   * @function
   * @name pv.Format.number.prototype.fractionDigits
   * @param {number} [min] the minimum fraction digits.
   * @param {number} [max] the maximum fraction digits.
   * @returns {pv.Format.number} <tt>this</tt>, or the current fraction digits.
   */
  format.fractionDigits = function(min, max) {
    if (arguments.length) {
      minf = Number(min);
      maxf = (arguments.length > 1) ? Number(max) : minf;
      maxk = Math.pow(10, maxf);
      padfstr = pv.Format.pad(padf, minf, ''); // precalc padding
      return this;
    }
    return [minf, maxf];
  };

  /**
   * Sets or gets the character used to pad the integer part. The integer pad is
   * used when the number of integer digits is smaller than the minimum. The
   * default pad character is "0" (zero).
   *
   * @param {string} [x] the new pad character.
   * @returns {pv.Format.number} <tt>this</tt> or the current pad character.
   */
  format.integerPad = function(x) {
    if (arguments.length) {
      padi = String(x);
      padistr = pv.Format.pad(padi, mini, ''); // precalc padding
      padg = /\d/.test(padi);
      return this;
    }
    return padi;
  };

  /**
   * Sets or gets the character used to pad the fration part. The fraction pad
   * is used when the number of fraction digits is smaller than the minimum. The
   * default pad character is "0" (zero).
   *
   * @param {string} [x] the new pad character.
   * @returns {pv.Format.number} <tt>this</tt> or the current pad character.
   */
  format.fractionPad = function(x) {
    if (arguments.length) {
      padf = String(x);
      padfstr = pv.Format.pad(padf, minf, ''); // precalc padding
      return this;
    }
    return padf;
  };

  /**
   * Sets or gets the character used as the decimal point, separating the
   * integer and fraction parts of the number. The default decimal point is ".".
   *
   * @param {string} [x] the new decimal separator.
   * @returns {pv.Format.number} <tt>this</tt> or the current decimal separator.
   */
  format.decimal = function(x) {
    if (arguments.length) {
      decimal = String(x);
      return this;
    }
    return decimal;
  };

  /**
   * Sets or gets the character used as the group separator, grouping integer
   * digits by thousands. The default decimal point is ",". Grouping can be
   * disabled by using "" for the separator.
   *
   * @param {string} [x] the new group separator.
   * @returns {pv.Format.number} <tt>this</tt> or the current group separator.
   */
  format.group = function(x) {
    if (arguments.length) {
      group = x ? String(x) : "";
      mins = mini + Math.floor(mini / 3) * group.length;
      return this;
    }
    return group;
  };

  /**
   * Sets or gets whether the rounding method used is symmetrical or asymmetrical.
   * The default method is symmetrical (rounded away from zero). If this is set to
   * false then then rounding is asymmetrical (rounded "up": away from zero if positive,
   * toward zero if negative).
   *
   * @param {boolean} [x] new setting for symmetry.
   * @returns {pv.Format.number} <tt>this</tt> or the current state of round method.
   */
  format.symmetricRounding = function(x) {
    if (arguments.length) {
      sym = !!x;
      return this;
    }
    return !!x;
  };

  /**
   * Sets or gets the negative prefix and suffix. The default negative prefix is
   * "&minus;", and the default negative suffix is the empty string.
   *
   * @param {string} [x] the negative prefix.
   * @param {string} [y] the negative suffix.
   * @returns {pv.Format.number} <tt>this</tt> or the current negative format.
   */
  format.negativeAffix = function(x, y) {
    if (arguments.length) {
      np = String(x || "");
      ns = String(y || "");
      return this;
    }
    return [np, ns];
  };

  return format;
};
