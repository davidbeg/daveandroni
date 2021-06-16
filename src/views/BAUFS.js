import React from 'react';
// import sections
import {Card} from "material-ui";
import Image from "../components/elements/Image";
import {SectionProps} from "../utils/SectionProps";
import classNames from "classnames";
import {Box, makeStyles} from "@material-ui/core";
import OPTree from "../components/op/OPTree";
import styles from "./BAUFS.module.css";

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
    width: '1366px',
    boxShadow: '0px 0px 10px #4446b7'
  },
});

const BAUFS = ({
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

  return (
    <div className={`${styles.mainContainer}`}>
        <OPTree className={classes.card}/>
    </div>
  );
}


BAUFS.propTypes = propTypes;
BAUFS.defaultProps = defaultProps;

export default BAUFS;