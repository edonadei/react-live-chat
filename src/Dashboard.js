import React from "react";
import { Paper, Typography, Chip, Button, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    width: 200
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
  const [values, setValues] = React.useState({
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Paper className={classes.root}>
      <Typography align="center" variant="h4" component="h4">
        Chat app
      </Typography>
      <Typography align="center" variant="h5" component="h5">
        Topic placeholder
      </Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <List>
            {["topic1", "topic2"].map(topic => {
              return (
                <ListItem key={topic} button>
                  <ListItemText primary={topic} />
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {[
            { from: "user", msg: "hello" },
            { from: "Emrick", msg: "hello back" }
          ].map((chat, i) => {
            return (
              <div className={classes.flex} key={i}>
                <Chip className={classes.chipName} label={chat.from} />
                <Typography variant="p">
                  {chat.msg}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.flex}>
        <Grid container>
          <Grid item xs={9} lg={6}/>
          <Grid item xs={3} lg={6}>
            <TextField
              id="standard-name"
              label="Send a chat"
              className={classes.textField}
              values="values.name"
              onChange={handleChange("name")}
            />
            <Button variant="contained" color="primary">
              Send
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default Dashboard;
