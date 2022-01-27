import React from 'react';
import PropTypes from 'prop-types';

export const ProgressBar = ({percentage}) => {
  return <div className="progress">
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{width: `${percentage}%`}}
      >
          {percentage}%
      </div>
  </div>;
};


ProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired
}