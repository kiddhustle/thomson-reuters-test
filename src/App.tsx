import * as React from 'react';
import './App.css';
import Country from './interfaces';

const DATA_URI = 'https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json'

interface AppProps {
  sort: string,
}

interface AppState {
  sortBy: string,
  errorLoading: boolean,
  isLoading: boolean,
  errorMessage: string,
  data: Country[]
}

class App extends React.Component<AppProps, {}> {
  constructor (props: AppProps) {
    super(props)
    // bind methods
    this.onClickSortHeader = this.onClickSortHeader.bind(this)
  }

  static defaultProps: AppProps = {
    sort: 'gold'
  }

  state: AppState = {
    sortBy: this.props.sort ? this.props.sort : 'gold',
    errorLoading: false,
    isLoading: true,
    errorMessage: '',
    data: []
  }

  async componentDidMount() {
     try {
       const res = await fetch(DATA_URI)
       let data: Country[] = await res.json()
       data = data.map((country: Country) => {
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

  getSortedData (data: Country[] | undefined, sortBy: string) {
    data = data != undefined ? data : this.state.data
    const clonedData = JSON.parse(JSON.stringify(data))

    clonedData.sort((a: any, b: any) => {
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
  onClickSortHeader (e: any) {
    const {target} = e
    const el = target.hasAttribute('data-sort-type') ? target : target.closest('[data-sort-type]')
    const sort = el.getAttribute('data-sort-type')
    const data: Country[] | undefined = this.getSortedData(undefined, sort)

    this.setState({
      data,
      sortBy: sort
    })
  }

  render (): React.ReactElement<any> {
    const {sort} = this.props
    const {isLoading, errorLoading, data, sortBy} = this.state

    if(isLoading ) {
      return (<p>Currently loading..</p>)
    }
    if(errorLoading) {
      return (<p>Error loading results. Please contact a site admin</p>)
    } else {
      return (
        <div className="App">
        <h2 className="medalsheader">Medal Count</h2>
          <table className="medalstable" data-qa="medalstable">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th
                  scope="col" data-sort-type="gold"
                  className={sortBy === 'gold' ? 'sorted': undefined}
                  onClick={this.onClickSortHeader}
                  title="Click to sort by Gold medals"
                >
                  <span className="medal-icon medal-icon--gold" />
                </th>
                <th
                  scope="col" data-sort-type="silver"
                  className={sortBy === 'silver' ? 'sorted': undefined}
                  onClick={this.onClickSortHeader}
                  title="Click to sort by Silver medals"
                  >
                    <span className="medal-icon medal-icon--silver" />
                  </th>
                <th
                  scope="col" data-sort-type="bronze"
                  className={sortBy === 'bronze' ? 'sorted': undefined}
                  onClick={this.onClickSortHeader}
                  title="Click to sort by Bronze medals"
                  >
                    <span
                      className="medal-icon medal-icon--bronze" />
                  </th>
                <th scope="col" data-sort-type="total"
                className={sortBy === 'total' ? 'sorted': undefined}
                onClick={this.onClickSortHeader}
                title="Click to sort by Total medals"
                >TOTAL</th>
              </tr>
            </thead>
            <tbody>
            {data && this.getSortedData(data, sortBy).slice(0, 10).map((country: Country, i: number) => (
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
