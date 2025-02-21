import { Routes, Route } from "react-router-dom";
import UserConfig from "./routes/UserConfig";
import Build from "./routes/Build";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>home</>} />
        <Route path="/build" element={<Build />} />
        <Route path="/userconfig" element={<UserConfig />} />
        <Route path="*" element={<>404</>} />
        {/* <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<RecentActivity />} />
          <Route path="project/:id" element={<Project />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
