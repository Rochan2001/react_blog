import React, { Component }from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { auth } from "../firebase/firebase";



const useStyles = (theme) => ({
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
});


class ArticleDetail extends Component {

  constructor(props){
    super(props);
    this.state={
      value:"",
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleChange(event){
     this.setState({value: event.target.value});
    }

  handleSubmit(event) {
    this.props.postComment(this.state.value,this.props.article._id);
    event.preventDefault();
  }

  render() 
   {
     const { classes } = this.props;

    if (this.props.isLoading) {
      return <div className={classes.root}><CircularProgress /></div>;
    }
    else if (this.props.errMess) {
      return (
        <div className="col-12">
          <h4>{this.props.errMess}</h4>
        </div>
      );
    } 
     else
    return (
      <div className="container my-3">
        <div class="card">
          <div class="row ">
            <div class="col-md-4">
              <img
                src={this.props.article.image}
                height="280"
                width="330"
                alt={this.props.article.name}
              ></img>
            </div>
            <div class="col-md-8 mt-3">
              <div class="card-block px-3">
                <Box className={classes.author}>
                  <Avatar src={this.props.article.avatar} />
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p">
                      {this.props.article.author}
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
                        new Date(
                          Date.parse(this.props.article.updatedAt.toDate())
                        )
                      )}
                    </Typography>
                  </Box>
                </Box>
                <h4 class="card-title">{this.props.article.name}</h4>
                <p class="card-text">{this.props.article.content}</p>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Box container>
            <Box item xs={12}>
              <TextField
                label="Add comment..."
                value={this.state.value}
                onChange={this.handleChange}
                className={classes.root}
                id="input-with-icon-textfield"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar  src={auth.currentUser?auth.currentUser.photoURL:null} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box item className="my-2" xs={12}>
              <Button type="submit" variant="outlined" color="primary">
                Post
              </Button>
            </Box>
          </Box>
        </form>
        {this.props.comments.length} {this.props.comments.length <= 1 ?"comment":"comments"}
        <RenderComments deleteComment={this.props.deleteComment} comments={this.props.comments} />
      </div>
    );}
}

function RenderComments({comments, deleteComment}){

  return (
    <div className="media content-section">
      <RenderComment deleteComment={deleteComment} comments={comments} />
    </div>
  );
}





function RenderComment({ comments, deleteComment }) {

  const handleDeleteComment = (docId) => {
    deleteComment(docId);
  }
  
  const COMMENTS = comments.map((comment) => {
    return auth.currentUser ? (
      auth.currentUser.uid === comment.author._id ? (
        <li class="media mt-2 mb-2">
          <img
            class="mr-3 rounded-circle article-img"
            alt={comment.author.firstname}
            src={comment.author.image}
          ></img>
          <div className="container">
            <div className="media-body row">
              <div className="col-12">
                <strong>
                  <h7 class="mt-0">{comment.author.firstname}</h7>
                </strong>
              </div>
            </div>
            <div className="row">
              <div className="col-8">{comment.comment}</div>
              <div className="col-4">
                <Button onClick={() => {handleDeleteComment(comment._id)}}>
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          </div>
        </li>
      ) : (
        <li class="media mt-2 mb-2">
          <img
            class="mr-3 rounded-circle article-img"
            alt={comment.author.firstname}
            src={comment.author.image}
          ></img>
          <div className="container">
            <div className="media-body row">
              <div className="col-12">
                <strong>
                  <h7 class="mt-0">{comment.author.firstname}</h7>
                </strong>
              </div>
            </div>
            <div className="row">
              <div className="col-12">{comment.comment}</div>
            </div>
          </div>
        </li>
      )
    ) : (
      <li class="media mt-2 mb-2">
        <img
          class="mr-3 rounded-circle article-img"
          alt={comment.author.firstname}
          src={comment.author.image}
        ></img>
        <div className="container">
          <div className="media-body row">
            <div className="col-12">
              <strong>
                <h7 class="mt-0">{comment.author.firstname}</h7>
              </strong>
            </div>
          </div>
          <div className="row">
            <div className="col-12">{comment.comment}</div>
          </div>
        </div>
      </li>
    );
  })
  return (
    <ul class="list-unstyled">
      {COMMENTS}
    </ul>

  );
}

export default withStyles(useStyles, { withTheme: true })(ArticleDetail);
