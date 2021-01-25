import React from 'react';
// import sections
import {Card} from "material-ui";
import Image from "../components/elements/Image";
import {SectionProps} from "../utils/SectionProps";
import classNames from "classnames";
import {Box, makeStyles} from "@material-ui/core";
import OPTree from "../components/op/OPTree";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const useStyles = makeStyles({
  card: {
    borderRadius: '15px',
    backgroundImage: 'linear-gradient(to top left, #4446b7, #8486d7)',
    height: '600px',
    width: '1080px',
    boxShadow: '0px 0px 10px #4446b7'
  },
});

const OP = ({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    ...props
  }) => {
  const classes = useStyles();

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  return (
    <section
      {...props}
      className={outerClasses + " illustration-section-01"}
    >
      <div className="container reveal-from-bottom">
          <OPTree className={classes.card}/>
      </div>
    </section>
  );
}


OP.propTypes = propTypes;
OP.defaultProps = defaultProps;

export default OP;