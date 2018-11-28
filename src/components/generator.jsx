import React from 'react';
import Buttons from './buttons.jsx'
import $ from 'jquery'

class Generator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.getPages();
    this.handleGenerating = this.handleGenerating.bind(this);
  }

getPages(){
  const urlFirstPage = "https://api.themoviedb.org/3/movie/popular?api_key=eaedd471df3d7aa5738e47fa4acd44f3&language=en-US&page=1";

  $.ajax({
    url: urlFirstPage,
    success: (results) => {
      this.setState({pages: results.total_pages})
      this.handleGenerating();
    },
    error: (jqxhr, textStatus, errorThrown) => {
      console.log("There was an error")
    }
  })
}

handleGenerating(){
  const randomNumber = Math.floor(Math.random()*this.state.pages)
  const urlRandomPage = `https://api.themoviedb.org/3/movie/popular?api_key=eaedd471df3d7aa5738e47fa4acd44f3&language=en-US&page=${randomNumber}`;

  $.ajax({
    url: urlRandomPage,
    success: (options) => {
      const randomOnPage = Math.floor(Math.random()*20)
      const chosenMovie = options.results[randomOnPage];
      const {title, poster_path, vote_count, vote_average, overview} = chosenMovie;
      this.setState({title: title, poster: `https://image.tmdb.org/t/p/w185${poster_path}`, voteCount: vote_count, voteAvg: vote_average, overview: overview
      });
    },
    error: (jqxhr, textStatus, errorThrown) => {
      console.log("There was an error")
    }
  })


  $("#generatorButton").click(()=>{
    $('.toAnimate').addClass('animated');
    $('button').attr('disabled', true);
    setTimeout(()=> {
          $('button').attr('disabled', false);
        }, 1000);
    setTimeout(()=> {
          $(".toAnimate").removeClass('animated');
        }, 1300);
});


  }

  render () {
  return (
<React.Fragment>
  <div id ='contID' className='container'>
    <div id= 'rowID' className='row'>

      <div id='leftPanel' className='panels col-10 col-md-8 col-lg-7 mx-auto my-auto'>
        <h4 className='toAnimate'>{this.state.title}</h4>
      <div className='toAnimate' id="overview">{this.state.overview}</div>
      <Buttons generate={()=>{this.handleGenerating()}} title={this.state.title}/>
      </div>

    <div id='rightPanel' className='col-6 col-md-4 col-lg-3 mx-auto my-auto'>
        <div id="poster" className='panels'><img className='img-fluid toAnimate' src={this.state.poster} alt="Movie poster"></img></div>
      <div id="votes" className='panels'>
        <div className='toAnimate'>
        <div id='score' className='toAnimate'>{this.state.voteAvg}<span>average score</span></div>
      {this.state.voteCount} total votes </div>
      </div>
    </div>

    </div>
  </div>
</React.Fragment>
  )
  }
}

export default Generator;
