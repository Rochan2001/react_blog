import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Pagination from "@material-ui/lab/Pagination";


const useStyles = makeStyles((theme) => ({
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

function RenderArticles ({article,classes}){

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={article.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Box className={classes.author}>
          <Avatar src={article.avatar} />
          <Box ml={2}>
            <Typography variant="subtitle2" component="p">
              {article.author}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(article.updatedAt.toDate())))}
            </Typography>
          </Box>
        </Box>
        <Box>
          <FavoriteBorderIcon />
        </Box>
      </CardActions>
    </Card>
  );


}




function Articles({classes,articles}){

  const articles_ = articles.map((article) => {
    return (
        <Grid key={article._id} item xs={12} sm={6} md={4}>
            <RenderArticles classes={classes} article={article}/>
        </Grid>
    );
  });

  return (
    <Grid container spacing={3}>
      {articles_}
    </Grid>
  );

}



function Home (props) {

    const classes = useStyles();

    return (
      <div className="container mt-3">
        <Container maxWidth="lg" className={classes.blogsContainer}>
          <Typography variant="h4" className={classes.blogTitle}>
            Articles
          </Typography> 
            <Articles
              classes={classes}
              articles={props.articles.articles}
            />
          <Box my={4} className={classes.paginationContainer}>
            <Pagination count={10} size="small" />
          </Box>
        </Container>
      </div>
    );

}

export default Home;