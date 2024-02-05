import "bootstrap/dist/css/bootstrap-grid.min.css"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate} from 'react-router-dom'
import { NewNote } from "./NewNote"
import { LandingPage } from "./LandingPage"

function App() {

  return (
  <Container className="my-4">
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/new" element={<NewNote />}/>
      <Route path="/:id"> 
      <Route index element = {<h1>Show</h1>}/>
      <Route path = "edit" element = {<h1>Edit</h1>}/>
      </Route>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  </Container>
  )
}

export default App
