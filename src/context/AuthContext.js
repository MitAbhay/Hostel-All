import React,{createContext} from "react";
import API from "../utils/api"

let AuthContext;
const { Provider, Consumer } = (AuthContext = createContext());

class AuthProvider extends React.PureComponent {
    state = {
        token : null,
        authUser: null,
        errorMsg : null
    };

    isAuthenticated = () => {
      const tken = this.state.token ? this.state.token : localStorage.getItem("mypegtoken")
      if (!tken) return false
      return true
    }

    getAuthUser = () => {
      const usr = this.state.authUser ? this.state.authUser : localStorage.getItem("authpegUser")
      if (!usr) return null

      try {
        const parsed = JSON.parse(usr)
        return parsed
      }
      catch(err) {
        return usr
      }
    }

    setLogin = (data) => {
      if (data) {
        localStorage.setItem('mypegtoken', data.token)
        localStorage.setItem('authpegUser', JSON.stringify(data.student))
        this.setState({
          token : data.token,
          authUser: data.student
        })
      }
      else {
        this.setState({
          token : null,
          authUser: null
        })
        localStorage.removeItem("mypegtoken");
        localStorage.removeItem("authpegUser");
      }
    }
    
    login = (email, password, history, setIsLoading, setErrorMessage) => {
      setIsLoading(true);
      this.setLogin(null)

      if (!!email && !!password) {
        API.auth().login({ email, password })
        .then(res=>{
          console.log('loginres',res.data)
          localStorage.setItem('mypegtoken', res.data.token)
          localStorage.setItem('authpegUser', JSON.stringify(res.data.student))
          this.setLogin(res.data)
          history('/dashboard')
        })
        setIsLoading(false)
        setErrorMessage(null)
      } else {
        setIsLoading(false);
        setErrorMessage("email and password is empty")
        return false
      }
    }
    
    register = (email, name, password,regNumber, history, setIsLoading, setErrorMessage) => {
      setIsLoading(true);
    
      if (!!email && !!name && !!password) {
        API.auth().register({ email, name, password,regNumber })
            .then(res => {
              console.log('signupres',res)
              localStorage.setItem('mypegtoken', res.data.token)
              localStorage.setItem('authpegUser', JSON.stringify(res.data.student))
              setErrorMessage(null)
              setIsLoading(false);
              history('/dadsdad')
            })
            .catch(err => {
              console.log(err)
              setErrorMessage(err.message)
              setIsLoading(false);
            });
      } else {
        setErrorMessage("All field is required")
        setIsLoading(false);
      }
    }

    logout = (history) => {
      this.setState({ 
        token : null,
        authUser: null
      });
      localStorage.removeItem("mypegtoken");
      localStorage.removeItem("authpegUser");
      localStorage.removeItem("profileNITH");
      localStorage.removeItem("accessBackend");
      API.auth().logout()
      history.push("/login");
    }

    render() {
      return (
        <Provider
          value={{
              ...this.state,
              
              login : this.login,
              register : this.register,
              logout : this.logout,
              isAuthenticated : this.isAuthenticated,
              getAuthUser : this.getAuthUser
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}

export { AuthProvider, Consumer, AuthContext };
