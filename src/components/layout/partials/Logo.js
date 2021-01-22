import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <h4 className="m-0">
        <Image
          src={'logo.png'}
          alt="Open"
          width={160}
           />
        <div>Third Square Education</div>
      </h4>
    </div>
  );
}

export default Logo;