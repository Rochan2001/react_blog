import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  author: {
    display: "flex",
  },
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  root: {
    width: "75%",
  },
  form: {
    paddingTop: theme.spacing(3),
  },
}));

 function ArticleDetail(props) {
    const classes = useStyles();

    return (
      <div className="container my-3">
        <div class="card">
          <div class="row ">
            <div class="col-md-4">
              <img
                src={props.article.image}
                height="280"
                width="330"
                alt={props.article.name}
              ></img>
            </div>
            <div class="col-md-8 mt-3">
              <div class="card-block px-3">
                <Box className={classes.author}>
                  <Avatar src={props.article.avatar} />
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p">
                      {props.article.author}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                    >
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(
                        new Date(Date.parse(props.article.updatedAt.toDate()))
                      )}
                    </Typography>
                  </Box>
                </Box>
                <h4 class="card-title">{props.article.name}</h4>
                <p class="card-text">{props.article.content}</p>
              </div>
            </div>
          </div>
        </div>
        <form className={classes.form} noValidate autoComplete="off">
          <Box container>
            <Box item xs={12}>
              <TextField
                className={classes.root}
                id="outlined-basic"
                label="Add comment..."
                variant="outlined"
              />
            </Box>
            <Box item className="my-2" xs={12}>
              <Button variant="outlined" color="primary">
                Post
              </Button>
            </Box>
          </Box>
        </form>
      </div>
    );
}

export default ArticleDetail;
