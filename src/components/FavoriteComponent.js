import React from 'react';
import { Media } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const imgStyle = {
    maxHeight: 128,
    maxWidth: 128
}

function RenderArticle({ article }) {
    return (
        <Media tag="li">
            <Media left middle>
                <Media object style={imgStyle}  src={article.image} alt={article.name} />
            </Media>
            <Media body className="ml-5">
                <Link to={`/home/${article._id}`}>
                    <Media heading>{article.name}</Media>
                </Link>
                <p>{article.content}</p>
            </Media>
        </Media>
    );
}

const Favorites = (props) => {

    if (props.favorites.isLoading) {
        return(
            <div className="container">
                <CircularProgress />
            </div>
        );
    }
    else if (props.favorites.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.favorites.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.favorites.favorites) {

        const favorites = props.favorites.favorites.articles.map((articleId) => {

            let article = props.articles.articles.filter((article) => article._id === articleId)[0];
            return (
                <div key={article._id} className="col-12 mt-5">
                    <RenderArticle article={article}  />
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>My Favorites</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="media content-section">
                        <Media list>
                            {favorites}
                        </Media>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <h4>You have no favorites</h4>
                </div>
            </div>
        )
    }

}

export default Favorites;