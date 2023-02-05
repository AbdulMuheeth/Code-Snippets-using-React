import React from "react";
import Editor from "./EditorLayout";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl } from "@mui/material";
import { loader } from "@monaco-editor/react";
import monacoThemes from "monaco-themes/themes/themelist";
import { LANGUAGES } from "../../Others/Editor/constants";

const CodeSnippetLayout = () => {
// get Exsiting or new
  const [language, setLanguage] = React.useState("javascript");
  const [theme, setTheme] = React.useState("vs-dark");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

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
      {/* language DropDown */}
      {console.log(language)}
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

      {/* Themes Dropdown */}
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

      {/* Editor */}
      <Editor language={language} theme={theme} />
    </>
  );
};

export default CodeSnippetLayout;
