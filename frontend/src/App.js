import React, { Component } from 'react';
import apiClient from 'application/apis/api-client';

const App = () => {
  return <GovExampleSearch />
}

class GovExampleSearch extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      query: ""
    }
  }

  onSearch = () => {
    this.setState({ query: ""})
  }

  render()
  {
    try {
      let searchResult = []
      apiClient.searchMockAct(this.state.query).then((res) => {
        res.forEach(a => {
          searchResult.push(a);
        })
      });
    } catch (e) {
      // handle error
    }
    return (
      <div>
        <div>
          <input type="text" />
        </div>
      </div>
    );
  }
}
export default App;