/* jshint node: true */

// s is svg-size
// r is the radius of circle
// n is a number between 0 and 1
// bgc is background class
// fgc is foreground class
function arcSvg( s, r, n, bgc, fgc ) {
  var svg, cx, cy, circum, bg, fg
  ;

  svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
  svg.setAttribute( 'width', s );
  svg.setAttribute( 'height', s );
  svg.setAttribute( 'viewBox', '0 0 ' + s + ' ' + s );

  var defs = document.createElementNS( 'http://www.w3.org/2000/svg', 'defs' );
  svg.appendChild( defs );

  // var linearGradient = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
  // linearGradient.setAttribute( 'id', 'grad1');
  // linearGradient.setAttribute( 'x1', 1 );
  // linearGradient.setAttribute( 'x2', 0 );
  // linearGradient.setAttribute( 'y1', 0 );
  // linearGradient.setAttribute( 'y2', 1 );
  // defs.appendChild( linearGradient );

  // var stop1 = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
  // stop1.setAttribute( 'offset', '3%' );
  // stop1.setAttribute( 'class', 'gradient1' );
  // linearGradient.appendChild( stop1 );

  // var stop2 = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
  // stop2.setAttribute( 'offset', '25%' );
  // stop2.setAttribute( 'class', 'gradient2' );
  // linearGradient.appendChild( stop2 );

  // var stop3 = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
  // stop3.setAttribute( 'offset', '96%' );
  // stop3.setAttribute( 'class', 'gradient3' );
  // linearGradient.appendChild( stop3 );


  cx = s / 2;
  cy = cx;
  circum = ( 2 * Math.PI * r );

  bg = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
  bg.setAttribute( 'cx', cx );
  bg.setAttribute( 'cy', cy );
  bg.setAttribute( 'r', r );
  bg.setAttribute( 'class', bgc );

  svg.appendChild( bg );

  fg = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
  fg.setAttribute( 'cx', cx );
  fg.setAttribute( 'cy', cy );
  fg.setAttribute( 'r', r );
  fg.setAttribute( 'stroke-dasharray', ( circum * n ) + ' ' + ( 2 * circum ) );
  fg.setAttribute( 'stroke-dashoffset', 0 );
  fg.setAttribute( 'transform', 'rotate(-90,' + cx + ',' + cy + ')' );
  fg.setAttribute( 'stroke', 'url("#grad1")' );
  fg.setAttribute( 'class', fgc );

  svg.appendChild( fg );

  return svg;
}

module.exports = arcSvg;