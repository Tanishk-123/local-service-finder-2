import React,{useState} from"react";
import{useNavigate} from"react-router-dom";
import{useAuth} from"../contexts/AuthContext";
import{motion} from"framer-motion";

export default function Login(){
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[isSignup,setIsSignup]=useState(false);
  const{login,signup}=useAuth();
  const nav=useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    if(!email||!password) return alert("Enter email & password.");
    try{
      if(isSignup) await signup({name,email,password});
      else await login({email,password});
      nav("/");
    }catch(err){ alert(err.message);}
  }

  return(
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"80vh"}}>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{width:420,borderRadius:12,padding:24,boxShadow:"0 6px 18px rgba(0,0,0,0.08)"}}>
        <h2 style={{textAlign:"center"}}>{isSignup?"Sign up":"Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup&&<input placeholder="Full name" style={s} value={name}onChange={e=>setName(e.target.value)}/>}
          <input placeholder="Email" style={s} value={email}onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" style={s} value={password}onChange={e=>setPassword(e.target.value)}/>
          <label><input type="checkbox" checked={isSignup}onChange={e=>setIsSignup(e.target.checked)}/> Create account</label>
          <button type="submit" style={{padding:"0.6rem 1rem",marginTop:12}}>{isSignup?"Sign up":"Login"}</button>
        </form>
      </motion.div>
    </div>);
}
const s={width:"100%",padding:"0.9rem",borderRadius:10,border:"1px solid #ccc",marginBottom:12};
