import React from "react";
import {
  Paper,
  Typography,
  Chip,
  Button,
  TextField,
  Box
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
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: "60%"
  },
  topicsWindow: {
    width: "31.3%",
    height: "300px",
    borderRight: "2px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
    overflow: "auto",
  },
  MessageBox: {
    marginBottom: "3px",
    display: "flex",
    alignItems: "center"
  },
  inputWindow: {
    width: "70%",
    height: "50px",
    textAlign: "center"
  },
  changeNameWindow: {
    width: "30%",
    height: "50px"
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
  const { allChats, sendChatAction } = React.useContext(CTX);

  // We get the keys from our objects to get the title of it
  const topics = Object.keys(allChats);

  // Local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState("");
  // Generating base name
  const [user, changeUser] = React.useState(
    "Anon" + Math.floor(Math.random() * 10) + 1
  );

  function changeName(event) {
    // Need to be finished, can't use a state right now, just create a local hook
  }

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
              <Box className={classes.MessageBox} key={i}>
                <Chip className={classes.chipName} label={chat.from} />
                <Typography variant="body1">{chat.msg}</Typography>
              </Box>
            );
          })}
        </div>
      </div>
      <div className={classes.flex}>
        <Box className={classes.changeNameWindow}>
          <TextField
            label="Change name"
            value={user}
            onChange={e => changeUser(e.target.value)}
          />
        </Box>
        <Box color="text.primary" className={classes.inputWindow}>
          <TextField
            id="standard-name"
            label="Send a chat"
            className={classes.textField}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
          />
          <Button
            onClick={() => {
              if (textValue === "") {
              } else {
                sendChatAction({
                  from: user,
                  topic: activeTopic,
                  msg: textValue
                });
                changeTextValue("");
              }
            }}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </Box>
      </div>
    </Paper>
  );
};

export default Dashboard;
