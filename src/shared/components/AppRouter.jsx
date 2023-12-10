import { LoginScreen } from "../../modules/auth/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { PublicNavbar } from "./PublicNavbar";
import AppLayout from "./AppLayout";
import Users from "../../modules/super/Users";
import UserHome from "../../modules/user/UserHome";
import PlatformScreen from "../../modules/platform/PlatformScreen";
import { AuthContext } from "../../modules/auth/authContext";
import { useContext } from "react";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  //const user = { data: { role: "2" }, isLogged: true };
  console.log(user.data.role);
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="/*"
          element={
            user.isLogged ? (
              user.data.role === 1 ? (
                <>
                  <Routes>
                    <Route path="/" element={<AppLayout option={1} />}>
                      <Route element={<Users option={true} />} />
                      <Route path="/platform" element={<PlatformScreen/>}/>
                      <Route index element={<PlatformScreen />} />
                    </Route>
                  </Routes>
                </>
              ) : (
                user.data.role === 2 ? (
                  <>
                    <Routes>
                      <Route path="/" element={<AppLayout option={2} />}>
                        <Route  element={<Users option={false} />} />
                        <Route path="*" element={<>SUPER</>} />
                      </Route>
                    </Routes>
                  </>
                ) : (
                  user.data.role === 3 && (
                    <>
                      <Routes>
                        <Route path="/" element={<AppLayout option={3} />}>
                          <Route index element={<UserHome />} />
                          <Route path="*" element={<>USER</>} />
                        </Route>
                      </Routes>

                    </>
                  )
                )
              )
            ) : (
              <>
                <PublicNavbar />
                <Container style={{ marginTop: "20px" }}>
                  <Routes>
                    <Route path="more-info/:id" element={<>MOREINFO</>} />
                    <Route path="contact" element={<>Contact</>} />
                    <Route index element={<>INDEX</>} />
                    <Route path="*" element={<>404</>} />
                  </Routes>
                </Container>
              </>
            )
          }
        />
        <Route path="*" element={<>404</>} />
      </Routes>
    </Router>
  );
};
