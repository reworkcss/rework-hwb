'use strict';

var cString  = require('color-string'), 
  cConvert   = require('color-convert'),
  balanced   = require('balanced-match');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to convert CSS color functions.
 *
 * @param {Object} stylesheet
 */

function plugin(stylesheet){
  stylesheet.rules.forEach(rule);
}

/**
 * Convert a `rule`.
 *
 * @param {Object} rule
 */

function rule(obj){
  if (obj.declarations) obj.declarations.forEach(declaration);
  if (obj.rules) obj.rules.forEach(rule);
}

/**
 * Convert a `dec`.
 *
 * @param {Object} dec
 */

function declaration(dec){
  if (!dec.value) return;
  try {
    dec.value = convert(dec.value);
  } catch (err) {
    err.position = dec.position;
    throw err;
  }
}

/**
 * Checks for hwb or hwba appearance and converts it
 * 
 * @param {String} string
 * @return {String}
 */

function convert(string){
  var alpha = 0;
  var index = string.indexOf('hwb(');
  if (index == -1) {
    return string;
  }

  var color = cConvert.hwb2rgb(cString.getHwb(string)),
    alpha = cString.getAlpha(string);

  return cString.rgbString(color, alpha);
}
