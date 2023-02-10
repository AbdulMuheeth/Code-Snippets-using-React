import React, { useEffect } from "react";
import Editor from "./EditorLayout";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, Grid, TextareaAutosize, TextField } from "@mui/material";
import { loader } from "@monaco-editor/react";
import monacoThemes from "monaco-themes/themes/themelist";
import { LANGUAGES } from "../../Others/Editor/constants";
import { defaultSnippets } from "../../Others/Editor/demoData";
import { useParams,Link } from "react-router-dom";
import { SnippetsData } from "../../App";
// import {createTheme} from "@mui/material";
// import { ThemeProvider } from "@mui/private-theming";

const CodeSnippetLayout = () => {

  // getting Context Reference
  const {snipData,updateSnip} = React.useContext(SnippetsData);
  console.log(snipData,updateSnip,"---------------")
  
  // getting ID
  const ID = useParams();

  // get Exsiting or new
  const currentSnippet = snipData.filter((snippet)=>snippet.id===ID.id)[0];
  
  console.log(currentSnippet);

  const [language, setLanguage] = React.useState(currentSnippet.language);
  const [theme, setTheme] = React.useState(currentSnippet.theme);
  const [code, setCode] = React.useState(currentSnippet.code);
  const [description, setDescription] = React.useState(currentSnippet.description);
  
  useEffect(()=>{
    console.log("hiiiii")
    handleThemeChange(currentSnippet.theme)
  },[])
  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  
  // const bp = createTheme({
    //   breakpoints: {
      //     values: {
        //       xxs: 0, // small phone
        //       xs: 300, // phone
        //       sm: 600, // tablets
        //       md: 900, // small laptop
        //       lg: 1200, // desktop
        //       xl: 1536 // large screens
        //     }
        //   }
  // });
  console.log(monacoThemes)
  
  let newTheme = (themeKey, themeVal) => {
    // console.log(themeKey, themeVal);
    return new Promise((res) => {
      Promise.all([
        loader.init(),
        import(`monaco-themes/themes/${themeKey}.json`),
      ]).then(([monaco, themeData]) => {
        monaco.editor.defineTheme(themeVal, themeData);
        res();
      });
    });
  };

  const handleThemeChange = (value) => {
    const val = value;
    const key = monacoThemes[val];
    // console.log(value);

    if (["light", "vs-dark"].includes(val)) {
      setTheme(val);
    } else {
      newTheme(key, val).then(() => setTheme(val));
    }
  };

  const commitChanges = () => {
    // console.log("committed")
    // codeSnippets = 
    // currentSnippet.code=code
    const newSnippets = snipData.map((snip)=>{
      if (snip.id == ID.id){
        return {...snip,language:language,code:code,theme:theme,description:description}
      }
      return snip;
    })

    // console.log(newSnippets,updateSnip)
    updateSnip(newSnippets)

  }
  

  

  return (
    <>
      <div style={{padding:"8px"}}>
        
        {/* <ThemeProvider theme={bp}> */}
          {/* {console.log([bp.breakpoints.down("md")])} */}
          <Grid container  justifyContent="space-around" spacing={2} sx={{marginTop:"1%"}} >
          {/* sx={{marginTop:"1%",background:{xs:"red",md:'green'}} this works */}
            <Grid item xs={12} md={8} order={{xs:2,md:1}}>
              {/* Editor */}
              <Editor language={language} theme={theme} code={code} setCode={setCode} />
              {/* <Editor language={language} theme={theme} code={code} setCode={setCode} /> */}

            </Grid>
            <Grid item xs={12} md={4} order={{xs:1,md:2}}>
              {console.log(language)}
              <Grid container spacing={0}  sx={{height:"60%"}} alignItems="center" justifyContent="center">
                {/* language DropDown */}
                <Grid item xs={6} sx={{height:"10%",display:"flex"}} justifyContent="center" alignItems="center">
                  <FormControl sx={{ m: 1, minWidth: 120, color: "black" }} >
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select
                      labelId="language-label"
                      id="lang"
                      value={language}
                      onChange={handleLanguageChange}
                      label="Language"
                    >
                      {LANGUAGES.map((language, i) => (
                        <MenuItem value={language} key={language + String(i)}>
                          {language}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Themes Dropdown */}
                <Grid item xs={6} sx={{height:"10%",display:"flex"}} justifyContent="center" alignItems="center">
                  <FormControl sx={{ m: 1, minWidth: 120, color: "black" }}>
                    <InputLabel id="theme-label">Themes</InputLabel>
                    <Select
                      labelId="theme-label"
                      id="theme"
                      value={theme}
                      onChange={(e)=>handleThemeChange(e.target.value)}
                      label="Theme"
                    >
                      <MenuItem value={"light"} key={"light001"}>
                        light
                      </MenuItem>
                      <MenuItem value={"vs-dark"} key={"dark001"}>
                        Dark
                      </MenuItem>
                      {Object.entries(monacoThemes).map((theme, i) => (
                        <MenuItem value={theme[0]} key={theme[1] + String(i)}>
                          {theme[1]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid container
                  sx={{height:"20%",display:"flex"}} justifyContent="center" alignItems="center">
                  <TextField
                    label="Description"
                    multiline rows={3} variant="outlined" sx={{width:400}}
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                    placeholder="Enter description for snippet"
                  />
                </Grid>
              </Grid>


              <Grid container textAlign={"center"} sx={{height:"10%",marginTop:"5%"}} justifyContent="center" alignItems="center">
                <Button onClick={commitChanges}> save </Button>
              </Grid>
              <Link to={"/"}>HOme</Link>

            </Grid>
          </Grid>
        {/* </ThemeProvider> */}
      </div>  

    </>
  );
};

export default CodeSnippetLayout;
