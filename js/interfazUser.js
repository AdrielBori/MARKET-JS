let DataUser=[]
const CarritoCompra=[]
let allUser
const DatosProductos=[]
let userNew
let userActive
let restaurar


const porcionCode=`
<form id="inicioSession">
    <input type="email" id="emailUsActive" placeholder="Ingrese email de usuario">
    <input type="password" id="passwUsActive" placeholder="Ingrese Contraseña">
    <div>
    <button type="submit">Inicie Sesion </button>
    <button type="button" id="nuevoUser">Crear Usuario </button>
    </div>
</form>`
class UserNew {
    constructor(nombreNewUser,passNewUser,emailNewUser,)
    {
    this.nombre=nombreNewUser
    this.password=passNewUser;
    this.email=emailNewUser;
    this.carrito=[]
}
}

/*-------------FUNCIONES--------------*/

function inicioSession(useractivo){
                let forminicio = document.getElementById("formInicioUser")
                forminicio.innerHTML=`
                <h4>Bienvenido ${useractivo.nombre}</h4>
                <button type="button" id="xSession" onclick="cerrarSession()" >Cerrar Session </button>
                `;
                useractivo.carrito.forEach(pr=>{
                            CarritoCompra.push(pr)
                            pintarProductos(pr)
                })
                sumarTotal()
}

function  cerrarSession(){
        let resp= DataUser.findIndex(em=>em.email===userActive.email)
        DataUser[resp]=userActive
        localStorage.setItem("allUser*",JSON.stringify(DataUser))
        localStorage.removeItem("userActive*")
        userActive=0
        let forminicio=document.getElementById("formInicioUser")
        forminicio.innerHTML=porcionCode

        location.reload()
    }
function  crearUsNuevo(userNew){
    DataUser.push(userNew)
    localStorage.setItem("allUser*",JSON.stringify(DataUser))
    }
function  pintarProductos(prod){
    const chango=document.getElementById("carrito_compra")
        const div=document.createElement("div")
        div.classList.add("lista")
        div.innerHTML=`
            <h4>${prod.nombre}</h4>
            <p>$${prod.precio}</p>
            <p>${prod.descrip}</p>
            <button id="${prod.id}" name=quitar>quitar</button>
            `
        chango.appendChild(div)
        
    }
function  borrarProducto(borrarProd){
    let resp=CarritoCompra.findIndex(em=> em.id===borrarProd.id)
    console.log(resp)
    CarritoCompra.splice(resp,1)
    userActive.carrito.splice(resp,1)
    localStorage.setItem("userActive*", JSON.stringify(userActive))
    sumarTotal()
    Toastify({

        text: "eliminado",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #c43b3b,#c43b3a)",
          },
        }).showToast();
}
function buscar(arreglo,email,contra){
    arreglo.forEach(element => {
        if(element.email==email){
                console.log(element)
                return element
        }
    });
    }
function sumarTotal(){
    let acumulador=0
    CarritoCompra.forEach(e=>{
        let valor=e.precio
        acumulador=acumulador + parseInt(valor)
        })
    let precioTotal=document.getElementById("preciototal")
        precioTotal.innerText=acumulador
    let paynow=document.getElementById("valoraPagar")
        paynow.innerText=`$ ${acumulador}`
}
/*----------------------PRODUCTOS-----------------*/

fetch('js/storage_Prod.json')
    .then((resp)=>resp.json())
    .then((data)=>{
        let valores=JSON.stringify(data)
        localStorage.setItem("infProducts",valores)
        restaurar=JSON.parse(localStorage.getItem("infProducts"))
        restaurar.forEach(element => {
        DatosProductos.push(element)
        });
    const VistaProd=document.getElementById("vista_productos")
        DatosProductos.forEach(element=>{
            const div=document.createElement("div")
                div.classList.add("tarjeta")
                div.innerHTML=`
                        <img src="${element.imagen}" alt="" class="tarjeta_img">
                        <div class="descrip">
                        <h4>${element.nombre}</h4>
                        <p>$ ${element.precio}</p>
                        <p>${element.descrip}</p>
                        <button id="${element.id}" name=agregar >agregar</button>
                        </div>`
                VistaProd.appendChild(div)
            })
    })

let recuperar=JSON.parse(localStorage.getItem("allUser*"))
    if(recuperar===null){
        fetch('js/data_User.json')
                .then((resp)=>resp.json())
                .then((data)=>{
                    let valores=JSON.stringify(data)
                    localStorage.setItem("allUser*",valores)
                    let allUser=JSON.parse(localStorage.getItem("allUser*"))
                    DataUser.push(allUser)
                })
    }else{
        DataUser=recuperar
        allUser=recuperar
    }

userActive=JSON.parse(localStorage.getItem("userActive*"))
    if(userActive===null){
        let forminicio=document.getElementById("formInicioUser")
        forminicio.innerHTML=porcionCode
    }else{
        inicioSession(userActive)
    }

    document.getElementById("formInicioUser").addEventListener("click",(e)=>{
        if(e.target.id==="nuevoUser"){
            document.getElementById("modal").classList.add("modalbajo")
        }
    })
    document.getElementById("cerarmodal").addEventListener("click",()=>{
            document.getElementById("modal").classList.remove("modalbajo")
    })
    document.getElementById("formNewUser").addEventListener("submit",function(e){
                    let newEmail=document.getElementById("emailNewUser").value
                    let newPassw=document.getElementById("passNewUser").value
                    let newName=document.getElementById("nombreNewUser").value
                    userNew=new UserNew(newName,newPassw,newEmail)
                    crearUsNuevo(userNew)
                })
    

document.getElementById("formInicioUser").addEventListener("click",(e)=>{
    if(e.target.id==="nuevoUser"){
        document.getElementById("modal").classList.add("modalbajo")
    }
})
document.getElementById("cerarmodal").addEventListener("click",()=>{
        document.getElementById("modal").classList.remove("modalbajo")
})
document.getElementById("formNewUser").addEventListener("submit",function(e){
                let newEmail=document.getElementById("emailNewUser").value
                let newPassw=document.getElementById("passNewUser").value
                let newName=document.getElementById("nombreNewUser").value
                userNew=new UserNew(newName,newPassw,newEmail)
                crearUsNuevo(userNew)
            })



document.getElementById("formInicioUser").addEventListener("submit",function(e){
            let userEmail=document.getElementById("emailUsActive").value
            let passwUser=document.getElementById("passwUsActive").value
                    /*validacion de inicio*/
                    if(userEmail==="" || passwUser===""){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'ingrese datos validos!',
                            footer: '<a href="">Why do I have this issue?</a>'
                          })
                    }else{
                    let resultado= false
                    DataUser.forEach(element => {
                            if(element.email==userEmail && element.password===passwUser){
                                userActive=element 
                                localStorage.setItem("userActive*",JSON.stringify(userActive))
                                inicioSession(element)
                                resultado=true
                            }})
                    resultado===false? Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'usuario no encontrado!',
                        footer: 'crear un usuario?'
                      }): console.log("ok")
                    }
                    e.preventDefault()
})

document.getElementById("vista_productos").addEventListener("click",function(e){
        let prod=e.target
        if(prod.name==="agregar" && userActive!==null){
            let agarrar=parseInt(prod.id) 
            pintarProductos(DatosProductos[agarrar])
            CarritoCompra.push(DatosProductos[agarrar])
            userActive.carrito.push(DatosProductos[agarrar])
            localStorage.setItem("userActive*", JSON.stringify(userActive))
            Toastify({
                text: "producto agregado",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #0fc70f, #96c93d)",
                    },
                }).showToast();
        }else{
            userActive===null ? Swal.fire('Inicie Session primero'): console.log()
            
        }
        sumarTotal();
})
document.getElementById("carrito_compra").addEventListener("click",function(e){
    if(e.target.name==="quitar"){
        e.target.parentElement.remove()
        borrarProducto(e.target)
    }
    
})


document.getElementById("pagar").addEventListener("click",(e)=>{
    if(userActive!==null){
        document.getElementById("creditCardForm").classList.add("modalbajo")
    }else{
        Swal.fire('Inicie Sesion primero')

    }
    
})
document.getElementById("cerrapago").addEventListener("click",(e)=>{
    document.getElementById("creditCardForm").classList.remove("modalbajo")
})

document.getElementById("formPay").addEventListener("submit",function(e){
    let owner=document.getElementById("owner").value
    let cardNumber=document.getElementById("cardNumber").value
    let cvv=document.getElementById("cvv").value
    let domicilio=document.getElementById("domicilio").value
   
            /*validacion de inicio*/
            let validar=false
            if(owner==="" || cardNumber==="" || cvv==="" || domicilio===""){
                Swal.fire(
                    'Complete los datos?',
                    ' ',
                    'question'
                )
                e.preventDefault()
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'pago realizado con exito',
                    timer: 1500
                })
                e.preventDefault()
                CarritoCompra.splice(0,CarritoCompra.length)
                userActive.carrito.splice(0,userActive.carrito.length)
                localStorage.setItem("userActive*", JSON.stringify(userActive))
                setInterval(() => {
                    location.reload()
                }, 1500);
                

            }
            
                
            
})