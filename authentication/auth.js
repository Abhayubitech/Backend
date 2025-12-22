function signIn(){
    const singInForm = document.getElementById('signup-form')
    const formData = new FormData(singInForm)
    const data = Object.fromEntries(formData)
    console.log(data)
}
function signUp(){
    const singInForm = document.getElementById('signup-form')
    const formData = new FormData(singInForm)
    const data = Object.fromEntries(formData)
    console.log(data)
}