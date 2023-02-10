import React,{useCallback,useMemo,useState} from 'react';
import './App.css';
import CodeSnippetLayout from './Components/Editor/CodeSnippetLayout';
import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import { defaultSnippets } from './Others/Editor/demoData';
import HomePage from './Components/Home/HomePage';
// import MenuIcon from '@mui/icons-material/Menu';
import { Box,Typography,Divider,List,navItems,ListItem,ListItemButton,ListItemText, AppBar, Toolbar, IconButton, Drawer, Button } from '@mui/material';

export const SnippetsData = React.createContext({snip:{},updateSnip:()=>{}});
SnippetsData.displayName = "CodeSnippets";

function App() {
  
  const getSnippets = () => {

    if(localStorage.getItem("snips") === null){
    localStorage.setItem("snips",JSON.stringify(defaultSnippets));
  }
  const snips = JSON.parse(localStorage.getItem("snips"));
  return snips;
}

const [snipData,setSnipData] = React.useState(getSnippets())
const [mobileOpen, setMobileOpen] = React.useState(false);
const navigate = useNavigate();

  const updateSnip = useCallback((data)=>{
      setSnipData(data);
      localStorage.setItem("snips",JSON.stringify(data));
  },[])

  const contextValue = useMemo(()=>({snipData,updateSnip}),[snipData,updateSnip])
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };  
  
  console.log(snipData);
  // const [snippet,setSnippet] = useState({defaultSnippets});


  return (
    <>
    <SnippetsData.Provider value={contextValue}>
        
      <AppBar component="nav"
      sx={{position:'relative',marginBottom: "2%"}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            demo
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button key={"home"} sx={{ color: '#fff' }} onClick={()=>navigate("/")}>
              Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav"
        sx={{position:'relative',marginBottom: "2%"}}
      >
        <Drawer
          container= { window !== undefined ? () => window.document.body : undefined }
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              MUI
            </Typography>
            <Divider />
            <List>
             
                <ListItem key={"home"} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }} onClick={()=>navigate("/")}>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </ListItem>
             
            </List>
          </Box>
        </Drawer>
      </Box>
        <Routes>
          <Route path={"/"} element={<HomePage/>}/>
          <Route path={"/snippet/:id"} element={<CodeSnippetLayout/>}/>
        </Routes>
        
      </SnippetsData.Provider>
    </>
  );
}

export default App;
