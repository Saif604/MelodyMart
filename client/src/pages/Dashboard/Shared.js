import { Outlet } from "react-router-dom";
import { Sidebar,NavDash } from "../../components";
import styled from "styled-components";
const Shared = () => {
  return (
    <Wrapper>
        <main className="dashboard">
            <Sidebar/>
            <div>
                <NavDash/>
                <div className="dashboard-page">
                    <Outlet/>
                </div>
            </div>
        </main>
    </Wrapper>
  )
}
export default Shared;

const Wrapper = styled.section`

`