import React from 'react';

class Buttons extends React.Component {
  render () {
return (
<div>
  <button className='btn btn-success mr-2 mb-2' onClick={this.props.generate}>Give me a movie!</button>
<a id="tweet-quote" target="_blank" href={`https://twitter.com/intent/tweet/?text=Movie for today!%0A${this.props.title}`}><button className='btn btn-primary mb-2'>Share</button></a>
</div>
)
  }
}

export default Buttons;
