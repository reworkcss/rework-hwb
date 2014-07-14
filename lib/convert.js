'use strict';

/**
 * Implementation of the spec according to http://dev.w3.org/csswg/css-color/#the-hwb-notation
 */

function hslToRgb(hue, sat, light) {
  if( light <= .5 ) {
    var t2 = light * (sat + 1);
  } else {
    var t2 = light + sat - (light * sat);
  }
  var t1 = light * 2 - t2;
  var r = hueToRgb(t1, t2, hue + 2);
  var g = hueToRgb(t1, t2, hue);
  var b = hueToRgb(t1, t2, hue - 2);
  return [r,g,b];
}

function hueToRgb(t1, t2, hue) {
  if(hue < 0) hue += 6;
  if(hue >= 6) hue -= 6;

  if(hue < 1) return (t2 - t1) * hue + t1;
  else if(hue < 3) return t2;
  else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
}

function hwbToRgb(hue, white, black) {
  var rgb = hslToRgb(hue, 1, .5);

  if(white + black > 1) {
    var rat = white + black;
    white /= rat;
    black /= rat;
  }

  for(var i = 0; i < 3; i++) {
    rgb[i] *= (1 - white - black);
    rgb[i] += white;
    rgb[i] *= 255;
    rgb[i] = Math.ceil(rgb[i]);
    if(rgb[i] < 0) rgb[i] = 0;
    if(rgb[i] > 255) rgb[i] = 255;
  }
  return rgb;
}

module.exports = function(hue, white, black) {
  /** Format conversion **/
  hue = (parseFloat(hue) % 360) / 360 * 6;
  white = parseFloat(white) / 100;
  black = parseFloat(black) / 100;

  return hwbToRgb(hue, white, black).join();
}
