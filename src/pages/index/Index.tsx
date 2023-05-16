import { Link } from "react-router-dom"

const Index = () => {
  return (
    <>
      <Link to={"/login"}>/login</Link><br/>
      <Link to={"/"}>/index</Link><br/>
      <Link to={"/create"}>/create</Link><br/>
      <Link to={"/edit/1"}>/edit/:id</Link><br/>
      <Link to={"/matrix/1"}>/matrix/:id</Link><br/>
    </>
  )
}

export default Index