import Home from "../Pages/home"


function HeaderMain() {
  return (
    <>
    <div className="header_bac">
        <h1>O'zingiz uchun mashina oling</h1>
    </div>

        <div className="main">
            <h1>So'ggi Takliflar</h1>
            
            <a href="">Ko'proq ko'rsatish</a>
            <Home/>
        </div>
    </>
  )
}

export default HeaderMain