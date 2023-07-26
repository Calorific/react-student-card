import { Redirect, Route } from 'react-router-dom'
import Card from './pages/card'
import CardControl from './pages/cardControl'

function App() {
  return (
    <div className="App container">
      <Route path='/' exact component={Card} />
      <Route path='/controls/:action?' exact component={CardControl} />
      <Redirect to='/' />
    </div>
  )
}

export default App
