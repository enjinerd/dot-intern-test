import Quiz from "pages/private/Quiz";
import { Home, NotFound } from "pages/public";
import { Login, Register } from "pages/public/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Private from "./Private";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/quiz"
          element={
            <Private>
              <Quiz />
            </Private>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
