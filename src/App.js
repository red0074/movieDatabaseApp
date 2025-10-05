import {Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar'
import Popular from './pages/Popular'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/" exact component={Popular} />
          <Route path="/top-rated" exact component={TopRated} />
          <Route path="/upcoming" exact component={Upcoming} />
          <Route path="/search" exact component={Search} />
          <Route path="/movie/:id" exact component={MovieDetails} />
          <Redirect to="/" />
        </Switch>
      </main>
    </>
  )
}
