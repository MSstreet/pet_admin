import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import api from '../actions/apis/api'
import * as auth from '../actions/apis/auth'
import * as Swal from '../actions/apis/alert'

// 📦컨텍스트 생성
export const LoginContext = createContext()

const LoginContextProvider = ({ children }) => {

    /* -----------------------[State]-------------------------- */
    // 로그인 여부
    const [isLogin, setLogin] = useState(false);

    // 유저 정보
    const [userInfo, setUserInfo] = useState(null)

    // 권한 정보
    const [roles, setRoles] = useState({isUser : false, isAmdin : false})

    /* -------------------------------------------------------- */

    // 페이지 이동
    const navigate = useNavigate()


    // 🍪➡💍 로그인 체크
    const loginCheck = async () => {
        // 🍪 accessToken 쿠키 확인
        const accessToken = Cookies.get("accessToken")
        console.log(`accessToken : ${accessToken}`);

        // 💍in🍪 ❌
        if( !accessToken ) {
            console.log(`쿠키에 accessToken(jwt) 가 없음`);
            // 로그아웃 세팅
            logoutSetting()
            return
        }

        // 💍in🍪 ⭕
        console.log(`쿠키에 JWT(accessToken) 이 저장되어 있음`);
        // axios common header 에 등록
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 👩‍💼 사용자 정보 요청
        let response
        let data

        try {
            response = await auth.info()
        } catch (error) {
            console.log(`error : ${error}`);
            console.log(`status : ${response.status}`);
            return
        }

        data = response.data    // data = 👩‍💼 사용자 정보
        console.log(`data : ${data}`);

        // 인증 실패 ❌
        if( data == 'UNAUTHORIZED' || response.status == 401 ) {
            console.log(`accessToek(jwt) 이 만료되었거나 인증에 실패하였습니다.`);
            return
        }

        // 인증 성공 ✅
        console.log(`accessToken(jwt) 토큰으로 사용자 정보 요청 성공!`);

        // 로그인 세팅
        loginSetting( data, accessToken )

    }

    // 🔐 로그인
    const login = async (username, password) => {
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);

        try {
            const response = await auth.login(username, password)
            const data = response.data
            const status = response.status
            const headers = response.headers
            const authorization = headers.authorization
            // 💍 JWT
            const accessToken = authorization.replace("Bearer ", "")

            console.log(`data : ${data}`);
            console.log(`status : ${status}`);
            console.log(`headers : ${headers}`);
            console.log(`jwt : ${accessToken}`);

            // 로그인 성공 ✅
            if( status == 200 ) {
                Cookies.set("accessToken", accessToken)

                // 로그인 체크
                loginCheck()

                Swal.alert("로그인 성공", "메인 화면으로 이동합니다", "success",
                    () => { navigate("/") }
                )

                // 메인 페이지로 이동
                // navigate("/")

            }

        } catch (error) {
            Swal.alert("로그인 실패", "아이디 또는 비밀번호가 일치하지 않습니다", "error")
            console.log(`로그인 실패`);
        }
    }



    // 🔐 로그인 세팅
    // 👩‍💼 userData, 💍 accessToken(jwt)
    const loginSetting = (userData, accessToken) => {
        const { no, userId, authList } = userData           // 👩‍💼 Users (DTO) [JSON]
        const roleList = authList.map((auth) => auth.auth)  // 💳 [ROLE_USER,ROLE_ADMIN]

        console.log(`no : ${no}`);
        console.log(`userId : ${userId}`);
        console.log(`authList : ${authList}`);
        console.log(`roleList : ${roleList}`);

        // axios common header - Authorizaion 헤더에 jwt 등록
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 📦 Context 에 정보 등록
        // 🔐 로그인 여부 세팅
        setLogin(true)

        // 👩‍💼 유저 정보 세팅
        const updatedUserInfo = {no, userId, roleList}
        setUserInfo(updatedUserInfo)

        // 👮‍♀️ 권한 정보 세팅
        const updatedRoles = { isUser : false, isAdmin : false }
        roleList.forEach( (role) => {
            if( role == 'ROLE_USER' ) updatedRoles.isUser = true
            if( role == 'ROLE_ADMIN' ) updatedRoles.isAdmin = true
        })
        setRoles(updatedRoles)

    }

    // 로그아웃 세팅
    const logoutSetting = () => {
        // 🚀❌ axios 헤더 초기화
        api.defaults.headers.common.Authorization = undefined;

        // 🍪❌ 쿠키 초기화
        Cookies.remove("accessToken")

        // 🔐❌ 로그인 여부 : false
        setLogin(false)

        // 👩‍💼❌ 유저 정보 초기화
        setUserInfo(null)

        // 👮‍♀️❌ 권한 정보 초기화
        setRoles(null)
    }

    // 🔓 로그아웃
    const logout = (force=false) => {

        if( force ) {
            // 로그아웃 세팅
            logoutSetting()

            // 페이지 이동 ➡ "/" (메인)
            navigate("/")
            return
        }


        Swal.confirm("로그아웃하시겠습니까?", "로그아웃을 진행합니다.", "warning",
            (result) => {
                // isConfirmed : 확인 버튼 클릭 여부
                if( result.isConfirmed ) {
                    Swal.alert("로그아웃 성공", "", "success")
                    logoutSetting()       // 로그아웃 세팅
                    navigate("/")         // 메인 페이지로 이동
                }
            }
        )

        // const check = window.confirm("정말로 로그아웃하시겠습니까?")
        // if( check ) {
        //   // 로그아웃 세팅
        //   logoutSetting()

        //   // 메인 페이지로 이동
        //   navigate("/")
        // }
    }

    // Mount / Update
    useEffect( () => {
        // 로그인 체크
        loginCheck()
        // 1️⃣ 🍪 쿠키에서 jwt💍 을 꺼낸다
        // 2️⃣ jwt 💍 있으면, 서버한테 👩‍💼 사용자정보를 받아온다
        // 3️⃣ 로그인 세팅을 한다. (📦 로그인여부, 사용자정보, 권한정보 등록)
    }, [])

    return (
        // 컨텍스트 값 지정 ➡ value={ ?, ? }
        <LoginContext.Provider value={ {isLogin, userInfo, roles, login, loginCheck, logout} }>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider