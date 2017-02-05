import React, { Component } from 'react';
import classNames from 'classnames';

class Tooltip extends Component {
  render() {
    const {
      popupInfo
    } = this.props;
    const {
      title,
      text,
      style
    } = popupInfo;
    let tooltipHeader;
    if ( title ) {
      tooltipHeader = (<h3 className="tooltip-header">{title}</h3>);
    }
    let tooltipSection;
    if ( text ) {
      tooltipSection = (<div className="tooltip-section">{text}</div>);
    } 

    const tooltipClasses = classNames({
      'popup-tooltip': true,
      'alt-style': style === 'altStyle'
    })
    return(
      <div className={tooltipClasses} ref="tooltip">
        {tooltipHeader}
        {tooltipSection}
      </div>
    )
  }
}

export default Tooltip;