const mario = document.getElementById('mario');
const inputUsuario = document.getElementById('input-usuario');
const inputClave = document.getElementById('input-clave');
const inputDiv = document.getElementById('div1');
const body = document.querySelector('body');
const anchoMitad = window.innerWidth / 2; 
const altoMitad = window.innerHeight / 2; 


inputClave.addEventListener('focus',()=>{
  
    mario.src = "./img/cover/mario_cerrando_los_ojos.png"
})

inputClave.addEventListener('blur',()=>{
    mario.src = "./img/read/mario_mirando.png"
})

function redireccion(){
    // if(user =="mario" && clave =="123"){
    //     window.location="productos.html";
    // }else{
    //     // Swal.fire({
    //     //     icon: 'error',
    //     //     title: 'Usuario o Contraseña Incorrectos'
    //     //   })
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Usuario o Contraseña Incorrectos',
    //         showClass: {
    //           popup: 'animate__animated animate__fadeInDown'
    //         },
    //         hideClass: {
    //           popup: 'animate__animated animate__fadeOutUp'
    //         }
    //       })
    // }
    
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("input-usuario2").value;
        var password = document.getElementById("input-clave2").value;
        var storedUsername = localStorage.getItem("username");
        var storedPassword = localStorage.getItem("password");
        if (username !== storedUsername || password !== storedPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Usuario o Contraseña Incorrectos',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
          return;
        }
        window.location="productos.html";
      });
      
}

 
  //ocultar div1
  function ocultar(){
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("input-usuario").value;
        var password = document.getElementById("input-clave").value;
        
        if (username == "" || password == "") {
          Swal.fire({
              icon: 'error',
              title: 'Ingresar valores',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
        return;
      }else {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Registrado en localStore',
            showConfirmButton: false,
            timer: 1500
          })
          document.getElementById("div2").style.display = "block";
      }
        
      });
  };

  //ocultar div2
  function ocultar2(){
    document.getElementById("register-form").addEventListener("submit", function(event) {
      event.preventDefault();
      var username = document.getElementById("input-usuario").value;
      var password = document.getElementById("input-clave").value;
    
    document.getElementById("div1").style.display = "block";
    document.getElementById("div2").style.display = "none";
     } )}


function validarLetras() {
  const input = document.getElementById("input-usuario");
  const letras = /^[A-Za-z]+$/; // Expresión regular para letras en mayúsculas y minúsculas
  const mensaje = document.getElementById("myAlert");
  
  if (input.value.match(letras)) {
    mensaje.textContent = "";
  } else {
    var alert = '<div>No se permiten números en este campo</div>';
    document.getElementById("myAlert").innerHTML = alert;
    input.value = ""; // Limpiar el campo
  }
}
function borrarMensaje() {
  const mensaje = document.getElementById("myAlert");
  mensaje.textContent = "";
}

