import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { SignIn } from './pages/SignIn'
import { Blog } from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Home } from './pages/Home'
import Profile from './pages/Profile'
const theme = createTheme();
function App() {

  return (
    <>
      <ThemeProvider theme={theme}> {/* Wrap the entire app */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path='/publish' element={<Publish/>}/>
          <Route path='/profile' element={<Profile name="kshitija" email="ddk"/>}/>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>

    </>
  )
}

export default App