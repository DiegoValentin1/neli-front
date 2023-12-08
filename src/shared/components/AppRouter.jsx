import { LoginScreen } from "../../modules/auth/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { PublicNavbar } from "./PublicNavbar";
import { Loader } from "./Loader";
import AppLayout from "./AppLayout";
import Users from "../../modules/super/Users";
import UserHome from "../../modules/user/UserHome";
import UserTrabajos from "../../modules/user/UserTrabajos";
import SuperMateriales from "../../modules/super/SuperMaterialesCamisa";
import SuperMaterialesBrida from "../../modules/super/SuperMaterialesBrida";
import SuperMaterialesTee from "../../modules/super/SuperMaterialesTee";
import PdfTemplate from "../../modules/user/PDF/PdfTemplate";

export const AppRouter = () => {
  // const { user } = useContext(AuthContext);
  const user = {data:{role:"USER"}, isLogged:true};
  console.log(user.data.role);
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="/*"
          element={
            user.isLogged ? (
              user.data.role === 'ADMIN' ? (
                <>
                  <Routes>
                    <Route path="/" element={<AppLayout option={1} />}>
                    <Route index element={<Users option={true}/>} />
                    {/* <Route path="materiales-brida-extremo" element={<SuperMaterialesBrida/>} />
                    <Route path="materiales-tee-reduccion" element={<SuperMaterialesTee/>} />
                    <Route path="materiales-camisa-interior" element={<SuperMateriales/>} />
                    <Route path="*" element={<>ADMIN</>} /> */}
                    </Route>
                  </Routes>
              </>
              ) : (
                user.data.role === 'SUPER' ? (
                  <>
                  <Routes>
                    <Route path="/" element={<AppLayout option={2}/>}>
                    {/* <Route index element={<SuperDashBoard/>} /> */}
                    {/* <Route index element={<Users option={false}/>} />
                    <Route path="materiales-brida-extremo" element={<SuperMaterialesBrida/>} />
                    <Route path="materiales-tee-reduccion" element={<SuperMaterialesTee/>} />
                    <Route path="materiales-camisa-interior" element={<SuperMateriales/>} />
                    <Route index element={<Loader/>} />
                    <Route path="*" element={<>SUPER</>} /> */}
                    </Route>
                  </Routes>
              </>
                ) : (
                  user.data.role === 'USER' && (
                    <>
                  <Routes>
                    <Route path="/" element={<AppLayout option={3} />}>
                    {/* <Route path="trabajos" element={<UserTrabajos/>} />
                    <Route path="pdf-view" element={<div style={{height:"91.5vh", display:"flex", justifyContent:"center", alignItems:"center"}}><PdfTemplate/></div>} />
                    <Route index element={<UserHome/>} />
                    <Route path="*" element={<>USER</>} /> */}
                    </Route>
                  </Routes>
                  
              </>
                  )
                )
              )
            ) : (
              <>
                <PublicNavbar/>
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
