import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Tabs from "./components/tabs";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-black h-screen flex flex-col items-center">
        <Tabs />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
