import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import FichaSobrevivente from "./pages/FichaSobrevivente";
import FichaAssassino from "./pages/FichaAssassino";
import Regras from "./pages/Regras";
import Vantagens from "./pages/Vantagens";
import GuiaMestre from "./pages/GuiaMestre";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/ficha-sobrevivente"} component={FichaSobrevivente} />
      <Route path={"/ficha-assassino"} component={FichaAssassino} />
      <Route path={"/regras"} component={Regras} />
      <Route path={"/vantagens"} component={Vantagens} />
      <Route path={"/guia-mestre"} component={GuiaMestre} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
