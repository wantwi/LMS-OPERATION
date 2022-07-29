import React,{useEffect,useState } from "react";
import HeaderWrapper from "./header.style";
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import {
    // friend1,
    // friend2,
    // friend3,
    people1,
    people2,
    people3,
    ProfileLockScreen
} from "helper/constant";
import { connect, useDispatch,useSelector } from "react-redux";
import { compose } from "redux";
import AuthActions from "redux/auth/actions";
import { withRouter } from "react-router-dom";
import PopoverBlock from './PopoverBlock'
import {idpLogOut} from "../../redux/auth/auth"
import { getAllUnreadMessages } from "redux/notifications/action";
import useCustomApi from "api/useCustomApi";
import { useGetStatic } from "hooks/useQueryInfo";
import useAuth from "hooks/useAuth";


const { logout } = AuthActions;

const Header = props => {
    const dispatch = useDispatch()
    const { drawerMiniMethod, mini, layoutSettingDrawerToggle } = props;
    const [messages, setMessages] = useState([])
    const customApi = useCustomApi();
    const {auth} = useAuth()

  

    const GetAllNotifications = async () => {
        let url = `Notifications`;
        if(auth?.accessToken){
            const response = await customApi.get(url);
            return response.data;
        }
        return []
       
      };


    const { data  =[] } = useGetStatic(
        "notifications",
        GetAllNotifications,
        () => {},
        () => {}
      );
    

    // const {notificationMassages} =  useSelector(state =>state.notificationState)

    // console.log({notificationMassages})
    const userSignout = () => {

        localStorage.removeItem("currentLocation")
        dispatch(idpLogOut())
        //props.logout();
    };
    // useEffect(() => {

    //     notificationMassages !== undefined || notificationMassages !==null ?setMessages(notificationMassages) : setMessages([])
      
      
    //   return () => {
        
    //   }
    // }, [notificationMassages])
    

    return (
        <HeaderWrapper {...props}>
            <div className="headerBack">
                <div className="flex-x align-center">
                    <div className="drawer-handle-arrow">
                        {mini ? (
                            <button
                                className="top-header-icon"
                                onClick={() => drawerMiniMethod()}
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                        ) : (
                                <button
                                    className="top-header-icon"
                                    onClick={() => drawerMiniMethod()}
                                >
                                    <i className="fas fa-bars"></i>
                                </button>
                            )}
                    </div>
                    <div
                        className="mini-drawer-menu-icon"
                        onClick={() => drawerMiniMethod()}
                    >
                        <i className="fas fa-bars" />{" "}
                        <span className="app-name fs-16 bold-text">{'Baj Freight'}</span>
                    </div>
                    {/* <div className="pl-10"> */}
                        {/* <button
                            id="mail"
                            className="top-header-icon"
                        >
                            <i className="far fa-envelope"></i>
                            <div className="button-badge fs-11 demi-bold-text">
                                3
                            </div>
                        </button> */}
                        {/* <UncontrolledPopover placement="bottom-start" target="mail" className="header-popover" trigger="focus">
                            <PopoverBody className="mail-popover-body">
                                <div className="fs-13 bold-text mb-10">
                                    You have 3 mails.
                                </div>
                                <PopoverBlock
                                    people={friend1}
                                    name="Alex Woods"
                                    text="Hello, How are you ?"
                                    created="Just Now"
                                />
                                <PopoverBlock
                                    people={friend2}
                                    name="James Anderson"
                                    text="Please check your transaction"
                                    created="22nd July 2019"
                                />
                                <PopoverBlock
                                    people={friend3}
                                    name="Watson"
                                    text="You won price.."
                                    created="20th Jun 2019"
                                />
                            </PopoverBody>
                        </UncontrolledPopover> */}
                    {/* </div> */}
                    <div className="pl-10 flex-1">
                        <button
                            id="notification"
                            className="top-header-icon"
                        >
                            <i className="far fa-bell"></i>
                            <div className="button-badge fs-11 demi-bold-text">
                            {data.length}
                            </div>
                        </button>
                        <UncontrolledPopover placement="bottom-start" target="notification" className="header-popover" trigger="focus" >
                        <div className="fs-13 bold-text mb-10 pl-2 pt-2">
                                    You have {data.length} Notifications.
                                </div>
                            <PopoverBody className="mail-popover-body" style={{height:300,overflowY:"scroll"}} onClick={()=>alert("iiiiii")}>
                               
                               {
                                   data.map(item =><PopoverBlock
                                    people={people1}
                                    name={item?.userName}
                                    text={item?.message}
                                    created={item?.createdAt}
                                    
                                />)
                               }
                               
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    {/* <div className="pl-10">
                        <button
                            className="top-header-icon"
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div> */}
                    <div className="pl-10">
                    <div id="profile">
                    <span style={{fontWeight:500}}>{auth?.given_name}</span>       <img
                                className="top-header-profile-class"
                                src={ProfileLockScreen}
                                alt="notify"
                            />
                        </div>
                        <UncontrolledPopover 
                            className="roy-menu"
                            innerClassName="roy-inner-content"
                            placement="bottom-end" 
                            target="profile" 
                            trigger="legacy"
                        >
                            <PopoverBody>
                                <div
                                    className="roy-menu-list"
                                    // onClick={() => props.history.push('/profile')}
                                >
                                   {auth?.given_name}
                                </div>
                                {/* <div
                                    className="roy-menu-list"
                                >
                                    Settings
                                </div> */}
                                <div
                                    className="roy-menu-list"
                                    onClick={userSignout}
                                >
                                    Logout
                                </div>
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>
                    {/* <div className="pl-10">
                        <button
                            onClick={layoutSettingDrawerToggle}
                            className="top-header-icon"
                        >
                            <i className="fas fa-th-large"></i>
                        </button>
                    </div> */}
                </div>
            </div>
        </HeaderWrapper>
    );
};

export default compose(
    withRouter,
    connect(
        null,
        { logout }
    )
)(Header);
