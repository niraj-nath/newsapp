import React, {useState,useEffect} from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }


  const updateNews = async()=> {
    props.setProgress(100);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading({loading:true});
    let data=await fetch(url)
    let passedData=await data.json()
    setArticles(passedData.articles);
    setLoading(false);
    setTotalResults(passedData.totalResults);
    props.setProgress(100);
  }


  useEffect(() => {
    setPage(page+1)
    document.title=`${capitalizeFirstLetter(props.category)}-NewsNepal`;
    updateNews();
    //eslint-disable-next-line
  }, [])
  

  const fetchMoreData = async() => {
    setPage(page+1);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data=await fetch(url);
    let passedData=await data.json()
    setArticles(articles.concat(passedData.articles));
    setTotalResults(passedData.totalResults);
   

  };
  
  return (
      <>
      
        <h1 className="text-center" style={{margin:"80px 0px 50px"}}>News-Nepal Top <span style={{color:'red'}}>{capitalizeFirstLetter(props.category)}</span> Headlines</h1>
        {loading&&<Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">
             {articles.map((element)=>{
                return <div className="col-md-4 " key={element.url}>
                  <NewsItems title={element.title ? element.title: ""} description={element.description?element.description: ""} urlToImage={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                </div>
              })}

            </div>
          </div>
        </InfiniteScroll>
      </>
  )
}
News.defaultProps={
  country:'in',
  pageSize:3,
  category:'general'
}
News.propsTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}
export default News