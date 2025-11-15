const baseUrl = 'https://api.webehsan.com'

const handleRegister =  async() => {
  event.preventDefault();
  try {
    const form = document.getElementById('registerForm') ;
    const data = {
      'email' : form.elements['email'].value,
      'password' : form.elements['password'].value,
      'fullName' : form.elements['fullname'].value,
    }
    console.log(data);
    const response = await axios.post(`${baseUrl}/auth/register`, data, {
      withCredentials : true
    }) ;
    if (response.data.result) {
      sessionStorage.setItem('isAuth', 'true')
      window.location.href = './home.html'
    }
    
    
  } catch (error) {
    console.log(error);
    
  }
}

const handleLogin =  async() => {
  event.preventDefault();
  try {
    const form = document.getElementById('loginForm') ;
    const data = {
      'email' : form.elements['email'].value,
      'password' : form.elements['password'].value,
    }
    console.log(data);
    const response = await axios.post(`${baseUrl}/auth/login`, data, {
      withCredentials : true
    }) ;
    console.log(response)
    if (response.data.result) {
      sessionStorage.setItem('isAuth', 'true')
      window.location.href = './home.html'
    } else {
      alert('از سمت سرور پاسخی دریافت نشد.')
    }
    
    
  } catch (error) {
    console.log(error);
    
  }
}


