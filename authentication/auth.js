function signIn(){
   const singInForm = document.getElementById('signup-form')
    const formData = new FormData(singInForm)
    const data = Object.fromEntries(formData)
    fetch('http://localhost:3000/signin',{
        method:"POST",
       headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(data)
    }).then((res)=>res.json()).then((res)=>{
        alert(res.msg)
        console.log(res)
    })
}
function signUp(){
    const singInForm = document.getElementById('signup-form')
    const formData = new FormData(singInForm)
    const data = Object.fromEntries(formData)
    fetch('http://localhost:3000/signup',{
        method:"POST",
       headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(data)
    }).then((res)=>res.json()).then((res)=>{
        alert(res.msg)
        console.log(res)
        if(res.status){
            console.log('test')
            location.href = '/authentication/sign-in.html'
        }

    })
}