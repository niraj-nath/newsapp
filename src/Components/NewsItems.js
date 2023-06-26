import React from "react";

const NewsItems =(props)=> { 
  let { title, description, urlToImage, newsUrl, author, publishedAt, source } =props;
  return (
    <div className="my-3">
      <div className="card">
        <div style={{ display:'flex' , justifyContent:'flex-end', position:'absolute',right:0}}>
          <span className=" badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        <img src={!urlToImage ? "https://st.depositphotos.com/1011646/1255/i/450/depositphotos_12553000-stock-photo-breaking-news-screen.jpg" : urlToImage} className="card-img-top text-danger" alt="img not found!"/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <strong>
            <p className="card-text">
              <small className="text-body-light">
                By:{author ? author : "Unknown"} on{" "}{new Date(publishedAt).toUTCString()}
              </small>
            </p>
          </strong>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  );
}

export default NewsItems;
