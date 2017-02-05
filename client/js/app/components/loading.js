import React from 'react');
import classNames from 'classnames');
import arcSvg from  '../../helpers/svg-arc' );

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
}());


var Loading = React.createClass({

  componentDidMount: function() {
    var svg,
      svgWrap = document.createElement( 'div' )
    ;

    svgWrap.setAttribute( 'class', 'svg-wrap' );

    var start = (+ new Date());
    var min = 0.2;
    var maxDelta = 0.3;
    var stop = false;

    var that = this;
    function animateSvg() {
      // continously increasing number for animation
      var dt = ( (+ new Date()) - start ) / 600;

      // If there is an svg arc remove it
      if ( svg ) {
        try {
          svgWrap.removeChild( svg );
        } catch(e) { }
      }

      // Create an svg arc with an svg size of 100, a radius of 40, a mathmatically computed number between 0 - 1 for the easing that is on a cosine curve , a background class, and a foreground class
      svg = arcSvg( 100, 40, min + maxDelta / 2 + ( maxDelta / 2 * Math.cos( dt ) ), 'loading-bg', 'loading-fg' );
      svg.setAttribute( 'fill', 'none' );
      // Append svg arc to a div container
      svgWrap.appendChild( svg );

      // loop svg arc animation until loading directive is taken out of view
      if ( !stop ) {
        that.animationId = requestAnimationFrame( animateSvg );
      }
    }

    // Kick off animation of svg arc
    this.animationId = window.requestAnimationFrame( animateSvg );
    var loadingIcon = this.refs.loadingIcon;
    loadingIcon.appendChild( svgWrap );
  },

  componentWillUnmount: function() {
    window.cancelAnimationFrame(this.animationId);
  },

  render: function() {

    const {
      fullscreen,
    } = this.props;

    let loadingIconClasses = classNames({
      'loading-icon': true,
      'fullscreen': fullscreen,
    });

    return (
      <div className={ loadingIconClasses } ref="loadingIcon">
          <img src="" />
      </div>
    );
  }
});

module.exports = Loading;