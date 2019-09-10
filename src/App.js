import React from 'react';
import './App.css';

const DATA_URI = 'https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json'

class App extends React.Component {
  constructor (props) {
    super(props)
    const {sort} = props
    this.state = {
      sortBy: sort ? sort : 'gold',
      errorLoading: false,
      isLoading: true,
      errorMessage: '',
      data: undefined
    }

    // bind methods
    this.onClickSortHeader = this.onClickSortHeader.bind(this)
  }

   async componentDidMount() {
     try {
       const res = await fetch(DATA_URI)
       let data = await res.json()
       data = data.map((country) => {
         // Create total property
         country.total = country.gold + country.silver + country.bronze
         return country
       })

       this.setState({
         data,
         isLoading: false
       })
     } catch(e) {
       this.setState({errorLoading: true})
     }

   }

  getSortedData (data, sortBy) {
    data = data != null ? data : this.state.data
    const clonedData = JSON.parse(JSON.stringify(data))

    clonedData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) { return 1}
      if (a[sortBy] > b[sortBy]) { return -1}
      if(sortBy === 'gold') {
        if (a['silver'] < b['silver']) { return 1}
        if (a['silver'] > b['silver']) { return -1}
      } else {
        if (a['gold'] < b['gold']) { return 1}
        if (a['gold'] > b['gold']) { return -1}
      }
      return 0
      // return b[sortBy] - a[sortBy]
    })

    return clonedData
  }
  onClickSortHeader (e) {
    const {target} = e
    const el = target.hasAttribute('data-sort-type') ? target : target.closest('[data-sort-type]')
    const sort = el.getAttribute('data-sort-type')
    const data = this.getSortedData(null, sort)

    this.setState({
      data,
      sortBy: sort
    })
  }

  render () {
    const {id, sort} = this.props
    const {isLoading, errorLoading, data, sortBy} = this.state

    if(isLoading ) {
      return (<p>Currently loading..</p>)
    }
    if(errorLoading) {
      return (<p>Error loading results. Please contact a site admin</p>)
    } else {
      return (
        <div className="App" id={id} sort={sort}>
        <h2 className="medalsheader">Medal Count</h2>
          <table className="medalstable" data-qa="medalstable">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th
                  scope="col" data-sort-type="gold"
                  className={sortBy === 'gold' ? 'sorted': null}
                  onClick={this.onClickSortHeader}
                  title="Click to sort by Gold medals"
                >
                  <span className="medal-icon medal-icon--gold" />
                </th>
                <th
                  scope="col" data-sort-type="silver"
                  className={sortBy === 'silver' ? 'sorted': null}
                  onClick={this.onClickSortHeader}
                  title="Click to sort by Silver medals"
                  >
                    <span className="medal-icon medal-icon--silver" />
                  </th>
                <th
                  scope="col" data-sort-type="bronze"
                  className={sortBy === 'bronze' ? 'sorted': null}
                  onClick={this.onClickSortHeader}
                  title="Click to sort by Bronze medals"
                  >
                    <span
                      className="medal-icon medal-icon--bronze" />
                  </th>
                <th scope="col" data-sort-type="total"
                className={sortBy === 'total' ? 'sorted': null}
                onClick={this.onClickSortHeader}
                title="Click to sort by Total medals"
                >TOTAL</th>
              </tr>
            </thead>
            <tbody>
            {data && this.getSortedData(data, sortBy).slice(0, 10).map((country, i) => (
              <tr key={country.code} data-qa-country-row={country.code}>
                <td>{i + 1}</td>
                <td className="medalstable__country">
                  <span className={`flag flag--${country.code}`} /> {country.code}
                </td>
                <td>{country.gold}</td>
                <td>{country.silver}</td>
                <td>{country.bronze}</td>
                <td><strong>{country.total}</strong></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

}

export default App;
