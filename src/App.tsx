import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "./Routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App(){
  const queryClient = new QueryClient()
    const router = createBrowserRouter(routes)
  return(<div>
     <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider> 
  </div>)
}
export default App