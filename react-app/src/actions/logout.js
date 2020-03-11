export const logout=()=>{
localStorage.setItem("isAuth",false)
localStorage.setItem("username",'')
window.location.reload()
}
export const adminlogout=()=>{
localStorage.setItem("isAdmin",false)
localStorage.setItem("username",'')
window.location.reload()
}
