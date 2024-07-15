import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import MailPage from "./app/Home/components/page";

function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <div className="w-[100vw] overflow-x-clip">

   
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ <MailPage />} />
    </Routes>
    </BrowserRouter> 
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
