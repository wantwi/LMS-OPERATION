import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageTitle from "components/common/PageTitle";
import { useSelector,useDispatch } from "react-redux";
import {CustomAxios} from "../util/customAxios"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import { getAllUnreadMessages } from "../redux/notifications/action";
import useAuth from "hooks/useAuth";




const Intro = () => {
  const dispatch = useDispatch()
  const {auth} = useAuth()


  useEffect(() => {
  //  dispatch(getAllUnreadMessages())
   
  }, []);


  return (
    <div>
      <PageTitle title="Dashboard" />

      <div className="plr-15">
        <div className="mtb-30 theme-color">

        <Main>
          <div className="cardRow">
            <Box>
              <Skeleton  baseColor="#bac8dc" style={{height:'100%', width:'100%'}}/>
            </Box>
            <Box>
            <Skeleton  baseColor="#e1e2e3" style={{height:'100%', width:'100%'}}/>
            </Box>
            <Box>
            <Skeleton  baseColor="#bac8dc" style={{height:'100%', width:'100%'}}/>
            </Box>
            <Box>
            <Skeleton  baseColor="#e1e2e3" style={{height:'100%', width:'100%'}}/>
            </Box>

          </div>

          <div className="chartRow">
          <Box>
          <Skeleton  baseColor="#e1e2e3" style={{height:'100%', width:'100%'}}/>
          </Box>
          <Box>
          <Skeleton  baseColor="#bac8dc" style={{height:'100%', width:'100%'}}/>
          </Box>

          </div>
        </Main>
          {/* <div className="mtb-10">
                        This is simple quick start app. you can easily setup your theme as per our documentation.
                    </div>

                    <div className="mtb-10">
                        You can follow below files for setting your theme
                        <span className="chip"> src/settings/index </span>
                    </div>

                    <div className="mtb-10">
                        We removed all the components, views, and unnecessary things in quick start app.If you want any components please refer our Roe app.
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Intro;


export const Main  = styled.main`
display:flex;
flex-direction: column
.cardRow{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap:15px
}
.chartRow{
  margin-top:20px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:15px;
  height:40vh;
}

.chartRow section: first-child{
  flex:2;
  height:100%
}
.chartRow section{
  flex:1;
  height:100%
}

`



export const Box = styled.section`
height:200px;
border:0px solid #ceacea;
padding:0;
overflow:hidden;


`
