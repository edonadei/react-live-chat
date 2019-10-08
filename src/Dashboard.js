import React from "react";
import {
  Paper,
  Typography,
  Chip,
  Button,
  TextField,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CTX } from "./Store";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  chipName: {
    marginRight: "5px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "300px"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "2px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "85%"
  },
  button: {
    width: "15%"
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  // Context store
  const { allChats, sendChatAction, user } = React.useContext(CTX);

  // We get the keys from our objects to get the title of it
  const topics = Object.keys(allChats);

  // Local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState("");

  return (
    <Paper className={classes.root}>
      <Typography align="center" variant="h4" component="h4">
        Chat app
      </Typography>
      <Typography align="center" variant="h5" component="h5">
        {activeTopic}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <List>
            {topics.map(topic => {
              return (
                <ListItem
                  key={topic}
                  onClick={e => changeActiveTopic(e.target.innerText)}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {allChats[activeTopic].map((chat, i) => {
            return (
              <div className={classes.flex} key={i}>
                <Chip className={classes.chipName} label={chat.from} />
                <Typography variant="body1">
                  {chat.msg}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.flex}>
        <Grid container>
          <Grid item />
          <Grid item>
            <TextField
              id="standard-name"
              label="Send a chat"
              className={classes.textField}
              value={textValue}
              onChange={e => changeTextValue(e.target.value)}
            />
            <Button
              onClick={() => {
                sendChatAction({
                  from: user,
                  topic: activeTopic,
                  msg: textValue
                });
                changeTextValue("");
              }}
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default Dashboard;
