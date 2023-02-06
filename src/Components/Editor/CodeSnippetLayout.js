import React from "react";
import Editor from "./EditorLayout";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, Grid } from "@mui/material";
import { loader } from "@monaco-editor/react";
import monacoThemes from "monaco-themes/themes/themelist";
import { LANGUAGES } from "../../Others/Editor/constants";
// import {createTheme} from "@mui/material";
// import { ThemeProvider } from "@mui/private-theming";

const CodeSnippetLayout = () => {
// get Exsiting or new
  const [language, setLanguage] = React.useState("javascript");
  const [theme, setTheme] = React.useState("vs-dark");

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

  const handleThemeChange = (event) => {
    const val = event.target.value;
    const key = monacoThemes[val];

    if (["light", "vs-dark"].includes(val)) {
      setTheme(val);
    } else {
      newTheme(key, val).then(() => setTheme(val));
    }
  };

  let newTheme = (themeKey, themeVal) => {
    console.log(themeKey, themeVal);
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

  return (
    <>
      <div style={{padding:"8px"}}>
        
        {/* <ThemeProvider theme={bp}> */}
          {/* {console.log([bp.breakpoints.down("md")])} */}
          <Grid container  justifyContent="space-around" spacing={2} sx={{marginTop:"1%"}} >
          {/* sx={{marginTop:"1%",background:{xs:"red",md:'green'}} this works */}
            <Grid item xs={12} md={8} order={{xs:2,md:1}}>
              {/* Editor */}
              <Editor language={language} theme={theme} />
            </Grid>
            <Grid item xs={12} md={4} order={{xs:1,md:2}}>
              {console.log(language)}
              <Grid container spacing={0}  sx={{height:"80%"}} alignItems="center" justifyContent="center">
                {/* language DropDown */}
                <Grid item xs={6}>
                  <FormControl sx={{ m: 1, minWidth: 120, color: "black" }}>
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
                <Grid item xs={6}>
                  <FormControl sx={{ m: 1, minWidth: 120, color: "black" }}>
                    <InputLabel id="theme-label">Themes</InputLabel>
                    <Select
                      labelId="theme-label"
                      id="theme"
                      value={theme}
                      onChange={handleThemeChange}
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
              </Grid>

            </Grid>
          </Grid>
        {/* </ThemeProvider> */}
      </div>  

    </>
  );
};

export default CodeSnippetLayout;
