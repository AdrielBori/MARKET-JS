const DatosProductos=[]
let userActive
let carritoCompras
const DataUser=[]

const porcionCode=`
<form id="inicioSession">
    <input type="email" id="emailUsActive" placeholder="Ingrese email de usuario">
    <input type="password" id="passwUsActive" placeholder="Ingrese Contraseña">
    <div>
    <button type="submit">Inicie Session </button>
    <button type="button" id="nuevoUser">crear Usuario </button>
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

/*---------------------CARGAR DE PRODUCTOS EN VISTA-------------------*/


fetch('js/storage_Prod.json')
    .then((resp)=>resp.json())
    .then((data)=>{
        let valores=JSON.stringify(data)
        localStorage.setItem("infProducts",valores)
        
    })

    let restaurar=JSON.parse(localStorage.getItem("infProducts"))

    restaurar.forEach(element => {
        DatosProductos.push(element)
    });

    const VistaProd=document.getElementById("vista_productos")
                DatosProductos.forEach(element=>{
                    const div=document.createElement("div")
                            div.classList.add("tarjeta")
                            div.innerHTML=`
                                <img src="${element.imagen}" alt="" class="tarjeta_img">
                                <h4>${element.nombre}</h4>
                                <p>${element.precio}</p>
                                <p>${element.descrip}</p>
                                <button id="${element.id}">agregar</button>
                                `
                    VistaProd.appendChild(div)
            })

document.getElementById("vista_productos").addEventListener("click",function(e){
        DatosProductos.forEach(element=>{
            element.id===e.target.id ? carritoCompras=element : false
        })
        userActive.carrito.push(carritoCompras)
        localStorage.setItem("userActive",JSON.stringify(userActive))
        document.location.reload()
})




/*--------------------------------------*/

let recuperar=JSON.parse(localStorage.getItem("data_User"))
                if(recuperar===null){
                    fetch('js/data_User.json')
                    .then((resp)=>resp.json())
                    .then((data)=>{
                        let valores=JSON.stringify(data)
                        localStorage.setItem("data_User",valores)
                        DataUser=JSON.parse(localStorage.getItem("data_User"))
                    })
                    }else{
                        recuperar.forEach(element=>{
                        DataUser.push(element)
                        })
                        localStorage.setItem("data_User",JSON.stringify(DataUser))
                    }

    userActive=JSON.parse(localStorage.getItem("userActive"))

 /*------------------------INICIO USUARIO---------------------*/
    if(userActive==null){
        let navUsuario=document.getElementById("formInicioUser")
                    navUsuario.innerHTML=porcionCode

    }else{
        let navUsuario = document.getElementById("formInicioUser")
                navUsuario.innerHTML=`<h4>Bienvenido ${userActive.nombre}</h4>
                <button type="button" id="xSession" onclick="cerrarSession()" >Cerrar Session </button>
    `;
    prodUserActive(userActive)
    }
        
 /*------------------------INICIO SESSION---------------------*/



    document.getElementById("inicioSession").addEventListener("submit",function(e){
        e.preventDefault()
        let userEmail=document.getElementById("emailUsActive").value
            let passwUser=document.getElementById("passwUsActive").value
                    /*validacion de inicio*/
                    if(userEmail==="" || passwUser===""){
                        alert("ingrese datos validos")
                    }else{
                        let respuesta=false
                        DataUser.forEach(element=>{
                            if(userEmail==element.email & passwUser==element.password){
                                let navUsuario = document.getElementById("formInicioUser")
                                    navUsuario.innerHTML=`<h4>Bienvenido ${element.nombre}</h4>
                                        <button type="button" id="xSession" onclick="cerrarSession()" >Cerrar Session </button>
                                        `                      
                                    let valores=JSON.stringify(element)
                                    localStorage.setItem("userActive",valores)
                                    userActive=element
                                    respuesta=true
                                    
                                    prodUserActive(userActive)
                                }
                            })
                            respuesta===true ? location.reload() : alert("usuario no encontrado")
                }
                
        })


        /*CERRAR SESSION*/
function cerrarSession(){
    let navUsuario=document.getElementById("formInicioUser")
            navUsuario.innerHTML=porcionCode
           const busq= DataUser.findIndex(us=>{
            us.email===userActive.email
           })
           console.log(busq)
            localStorage.removeItem("userActive")
            userActive=0
            /* location.reload() */
}




/*LOGICA PRODUCTOS*/

function prodUserActive(use){
    use.carrito.forEach(element => {
        const Bolsacompra=document.getElementById("carrito_compra")
            const div=document.createElement("div")
                div.classList.add("bolsaCompas")
                div.innerHTML=`
                    <h4>${element.nombre}</h4>
                    <p>${element.precio}</p>
                    <p>${element.descrip}</p>
                    <button id="${element.id}" namer="quitar" class="btnQ">quitar</button>
                    `
                Bolsacompra.appendChild(div)
    });
    
}

document.getElementById("nuevoUser").addEventListener("click",function(){
    document.getElementById("modal").classList.add("modalbajo")
})
document.getElementById("cerarmodal").addEventListener("click",function(){
    document.getElementById("modal").classList.remove("modalbajo")
})

document.getElementById("formNewUser").addEventListener("submit",function(e){
            let nombreNewUser=document.getElementById("nombreNewUser").value
            let passNewUser=document.getElementById("passNewUser").value
            let emailNewUser=document.getElementById("emailNewUser").value
            if (nombreNewUser === ""|| passNewUser=== ""||emailNewUser==="" ){
                /*   return Swal.fire(
                'Sin valores?',
                'ingrese algun producto?',
                'question'
              ) */
            alert("error")
        }else{
                let userNew=new UserNew(nombreNewUser,passNewUser,emailNewUser)
                let recuperar=JSON.parse(localStorage.getItem("data_User"))
                recuperar.push(userNew)
                localStorage.setItem("data_User",JSON.stringify(recuperar))             
            }
e.preventDefault()
location.reload()
})
