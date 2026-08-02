import { createContext } from "react";
export const AUthContext = createContext() ;


const AuthhProvider = ({children})=>{
    const [user , setUser ] = useState(null);
    const [Loading , setLoading] = useState (false);
    

    return (
        <AuthContext.Provider value = {{user,setUser, loading , setLoading}}>
            {children}
        </AuthContext.Provider>
    )

}