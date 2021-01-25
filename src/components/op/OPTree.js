import React, {useRef, useEffect, useState} from 'react'
import {
  AppBar,
  Box, Button, Fade,
  LinearProgress,
  makeStyles,
  Paper, Slide,
  Tab,
  Tabs,
  Tooltip, Typography,
  withStyles
} from "@material-ui/core";
import * as PropTypes from "prop-types";
import {draw, drawLine} from "./treeDrawer";
import {defaultEmployees} from "./data";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

function EmployeeBox(props) {
  return <Tooltip title={((props.index * 10) % 100) + "% Convinced"} placement={"right"}>
    <Box className={'employee-box ' + (props.selected ? 'employee-box-selected' : '')} style={{...props.box}}
         onClick={()=>props.onClick(props.index)}>
      <div style={{position: 'relative'}}>
    <b style={{fontSize: '16px'}}>{props.name}</b><br/>
    <span style={{fontSize: '12px'}}>{props.title}</span>
        {props.change && props.change !== 0
          ? <div
          className={props.change > 0 ? 'increase-bubble' : 'decrease-bubble'}>{props.change}</div>
          : null}
      <BorderLinearProgress style={{marginTop: '8px'}} variant="determinate" value={(props.index * 10) % 100} />
      </div>
    </Box>
    </Tooltip>
}

EmployeeBox.propTypes = {
  box: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  }),
  name: PropTypes.string,
  title: PropTypes.string,
};

const useStyles = makeStyles(theme=>({
  root: {
    width: 270,
    flexGrow: 1,
    backgroundColor: '#363c6e',
  },
  labelContainer: {
    paddingLeft: 0,
    paddingRight: 0
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ActionButton(props) {
  let tooltip = <Typography>
    {props.button.tooltip}<br/>
    {props.button.time}{" days to execute"}
  </Typography>;
  return <Tooltip placement={"left"} title={tooltip}>
  <div
    onClick={props.active ? ()=>props.onClick(props.button) : ()=>{}}
    className={'action-button row ' + (props.active ? 'action-button-active' : '')}>
    {props.button.name}{" | "}{props.button.time}d
  </div>
    </Tooltip>;
}

ActionButton.propTypes = {button: PropTypes.shape({
    name: PropTypes.string,
    tooltip: PropTypes.string,
  })};

const OPTree = props => {
  const classes = useStyles();
  const canvasRef = useRef(null)
  const [tab, setTab] = React.useState(0);
  const [days, setDays] = React.useState(30);
  const [progress, setProgress] = React.useState(40);
  const [selected, setSelected] = React.useState(0);
  const [employees, setEmployees] = React.useState(defaultEmployees);

  console.log(employees)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    draw(context)
  }, [])

  let tabStyle = {
    minWidth: 280,
    paddingLeft: 12,
    paddingRight: 12,
  };
  let tabClass = { labelContainer: classes.labelContainer };
  let labelStyle = { fontSize: "14px" };

  tabStyle.minWidth = 88;
  tabStyle.marginLeft = '5px';
  tabStyle.marginTop = '5px';
  tabStyle.paddingLeft = 0;
  tabStyle.paddingRight = 0;

  function onEmployeeClick(index) {
    setSelected(index)
  }

  let actions = [
    {name: "CEO memo", tooltip: "Ask the CEO to send a memo", time: 2},
    {name: "Decree", tooltip: "Dispatch a decree", time: 3},
    {name: "Mass Communication", tooltip: "Send a mass communication that explain the intiative", time: 4},
    {name: "Workshop", tooltip: "Run a two day workshop", time: 5},
    {name: "Sand A to see B", tooltip: "Send the selected person to see another person", time: 6},
  ];

  function onActionClick(action) {
    setDays(days + action.time)
    let newProgress = progress + (Math.random() > 0.5 ? 10 : -10);
    setProgress(Math.min(Math.max(newProgress, 0), 100))
    let newEmployees = [...employees]
    newEmployees.forEach(employee=>{
      employee.change = 0
      if (Math.random() > 0.8) {
        employee.change = Math.floor(Math.random() * 30 - 15)
      }
    })
    setEmployees(newEmployees)
  }

  return <div style={{position: 'relative'}}>
    <canvas ref={canvasRef} {...props}/>
    {
      employees.map((employee, index)=><EmployeeBox onClick={onEmployeeClick} {...employee} index={index} selected={index===selected}/>)
    }
    <Paper className={classes.root} style={{overflow: 'hidden', position: 'absolute', top: 20, left: 780, width: '285px', height: '560px', borderRadius: '15px'}}>
      <AppBar style={{borderRadius: '5px'}} position="static" color="primary">
        <Tabs
          value={tab}
          onChange={(event, index)=>setTab(index)}
          tabItemContainerStyle={{width: '280px'}}
        >
          <Tab  label={<span style={labelStyle}>Tactics</span>}
               classes={tabClass}
               style={tabStyle}
                />
          <Tab label={<span style={labelStyle}>Bio</span>}
               classes={tabClass}
               style={tabStyle}
                />
          <Tab label={<span style={labelStyle}>History</span>}
               classes={tabClass}
               style={tabStyle}
                />
        </Tabs>
      </AppBar>
      <div style={{overflowY: 'auto', borderBottom: '2px solid grey', position: 'relative', width: '100%', height: 'calc(100% - 154px)', paddingBottom: '66px'}}>
        <div>
          <Slide direction="right" in={tab===0} unmountOnExit>
            <Box style={{position: 'absolute', width: '100%', paddingTop: '5px'}}>
              <table>
              {actions.map(button=>(
                <tr><ActionButton onClick={onActionClick} button={button} active={Math.random() > 0.3}/></tr>))
              }
              {actions.map(button=>(
                <tr><ActionButton onClick={onActionClick} button={button} active={Math.random() > 0.3}/></tr>))
              }
              </table>
            </Box>
          </Slide>
          <Slide direction={tab===1 || tab===0 ? "left" : 'right'} in={tab===1} unmountOnExit>
            <Box style={{position: 'absolute', width: '100%'}}>
              <div style={{color: 'white', padding: '20px'}}>
                <div className={'row'} style={{float: 'left'}}>
                  <Typography style={{margin: 'auto 10px auto 0'}}>
                    {employees[selected].name}
                  </Typography>
                  <img style={{borderRadius: '20%', width: '140px'}} src={'https://mindbodygreen-res.cloudinary.com/images/w_767,q_auto:eco,f_auto,fl_lossy/usr/RetocQT/sarah-fielding.jpg'}/>
                </div>
              <Typography style={{margin: 'auto 10px auto 0', textAlign: 'left'}}>
                Some history about the person
              </Typography>
              <Typography style={{margin: 'auto 10px auto 0', textAlign: 'left'}}>
                What we've learned about this person so far: ABCDEFG
              </Typography>
              </div>
            </Box>
          </Slide>
          <Slide direction="left" in={tab===2} unmountOnExit>
            <Box style={{position: 'absolute', width: '100%'}}>
              {[actions[0], actions[0], actions[1]].map(button=>(
                <ActionButton button={button} active={false}/>))
              }
            </Box>
          </Slide>
        </div>
        <TabPanel value={tab} index={1} style={{overflow: 'hidden'}}>
        </TabPanel>
        <TabPanel value={tab} index={2} style={{overflow: 'hidden'}}>
        </TabPanel>
      </div>
      <h6 style={{fontSize: '80%', position: 'absolute', left: '0', bottom: '67px', margin: '0 0 0 15px'}}>Time: {days}/120 days</h6>
      <BorderLinearProgress style={{position: 'absolute', bottom: '55px', margin: '0 5%', width: '90%'}} variant="determinate" value={days*100/120} />
      <h6 style={{fontSize: '80%', position: 'absolute', left: '0', bottom: '22px', margin: '0 0 0 15px'}}>Total progress: {progress}% days</h6>
      <BorderLinearProgress style={{position: 'absolute', bottom: '10px', margin: '0 5%', width: '90%'}} variant="determinate" value={progress} />
    </Paper>
  </div>
}

export default OPTree