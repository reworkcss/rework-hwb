'use strict';

var hwb      = require('./convert');
var balanced = require('balanced-match');

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
 * @param {String} string
 * @return {String}
 */

function convert(string){
  var alpha = false;
  var index = string.indexOf('hwb(');
  if (index == -1) {
    index = string.indexOf('hwba(');
    
    if (index == -1) {
      return string;
    } else {
      alpha = true;
    }
  }

  var fn = string.slice(index);
  var ret = balanced('(', ')', fn);
  
  if (!ret) {
    throw new SyntaxError('Missing closing parentheses');
  }

  var params = ret.body.split(',');

  if(!(params.length == 3 || (params.length == 4 && alpha))) {
    throw new Error('Wrong number of parameters for hwb/hwba ' + params.toString());
  }

  return 'rgb' + (alpha ? 'a(' : '(') + hwb(params[0], params[1], params[2]) + (alpha ? + ',' + params[3] + ')' : ')');
}
