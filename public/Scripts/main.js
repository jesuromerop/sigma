var EstadosUSA = [{name:"Alabama",tax:4},{name:"Alaska", tax:0},{name:"Arizona", tax:5.6},{name:"Arkansas", tax:6.5},{name:"California", tax: 7.5},{name:"Colorado", tax:2.9},{name:"Connecticut", tax:6.35},{name:"Delaware", tax:0},{name:"District Of Columbia", tax:5.75},{name:"Florida", tax: 6},
{name:"Georgia", tax: 4},{name:"Guam", tax: 4},{name:"Hawaii", tax:4.17},{name:"Idaho", tax: 6},{name:"Illinois", tax:6.25},{name: "Indiana", tax:7},{name:"Iowa", tax: 6},{name:"Kansas", tax:6.5},{name:"Kentucky", tax:6},{name:"Louisiana", tax: 4.45},{name:"Maine", tax:5.5},
{name:"Maryland", tax:6},{name:"Massachusetts", tax:6.25},{name:"Michigan", tax:6},{name:"Minnesota", tax:6.88},{name:"Mississippi", tax:7},{name:"Missouri",tax:4.22},{name:"Montana", tax:0},{name:"Nebraska", tax:5.5},{name:"Nevada", tax:6.85},{name:"New Hampshire", tax:0},
{name:"New Jersey", tax: 6.63},{name: "New Mexico", tax:5.13},{name:"New York", tax:4},{name:"North Carolina", tax:4.75},{name: "North Dakota", tax: 5},{name:"Ohio", tax:5.75},{name:"Oklahoma", tax:4.5},{name:"Oregon", tax:0},{name:"Pennsylvania", tax:6},{name:"Puerto Rico", tax:10.5},
{name:"Rhode Island", tax:7},{name:"South Carolina", tax:6},{name:"South Dakota", tax:4.5},{name:"Tennessee", tax:7},{name:"Texas", tax:6.25},{name:"Utah", tax:5.95},{name:"Vermont", tax:6},{name:"Virginia", tax:5.3},{name:"Washington", tax:6.5},{name:"West Virginia", tax:6},
{name:"Wisconsin", tax: 5},{name:"Wyoming", tax:4}]

var EstadosVEN = ["Amazonas","Anzoategui","Apure","Aragua","Barinas","Bolivar","Carabobo","Cojedes","Delta Amacuro","Distrito Capital","Falcon","Guarico","Lara","Merida","Miranda","Monagas",
                "Nueva Esparta","Portuguesa","Sucre","Tachira","Trujillo","Vargas","Yaracuy","Zulia"]

var Categories = [{name:"Dolor General",cost: 1},{name:"Salud Digestiva",cost: 2},{name:"Salud Respiratoria",cost: 3},{name:"Vitaminas y Productos Naturales",cost: 5},{name:"Botiquín y Primeros Auxilios",cost: 10},{name:"Rehabilitacion y Equipos Medicos",cost: 50}]

if(window.location.pathname === "/admin") {
    $(document).ready(function(){
        $("#UsersPanel").collapse("hide")
        $("#ProductsPanel").collapse("hide")
        $("#OtrosPanel").collapse("hide")
        $("#SucursalPanel").collapse("hide")
        $("#DisPanel").collapse("hide")
        $("#EarningsPanel").collapse("hide")

        $("#Productos").click(function () { 
            $("#UsersPanel").collapse("hide")
            $("#OtrosPanel").collapse("hide")
            $("#SucursalPanel").collapse("hide")
            $("#DisPanel").collapse("hide")
            $("#EarningsPanel").collapse("hide")
            document.getElementById("textSelection").innerHTML="Administre los productos";
        });
        $("#Users").click(function () { 
            $("#ProductsPanel").collapse("hide")
            $("#SucursalPanel").collapse("hide")
            $("#OtrosPanel").collapse("hide")
            $("#DisPanel").collapse("hide")
            $("#EarningsPanel").collapse("hide")
            document.getElementById("textSelection").innerHTML="Administre los usuarios";
        });
        $("#Admins").click(function () { 
            $("#UsersPanel").collapse("hide")
            $("#ProductsPanel").collapse("hide")
            $("#SucursalPanel").collapse("hide")
            $("#DisPanel").collapse("hide")
            $("#EarningsPanel").collapse("hide")
            document.getElementById("textSelection").innerHTML="Administre las consultas";
        });
        $("#Sucursal").click(function () { 
            $("#UsersPanel").collapse("hide")
            $("#ProductsPanel").collapse("hide")
            $("#OtrosPanel").collapse("hide")
            $("#DisPanel").collapse("hide")
            $("#EarningsPanel").collapse("hide")
            document.getElementById("textSelection").innerHTML="Administre las sucursales";
        });
        $("#Distribution").click(function () { 
            $("#ProductsPanel").collapse("hide")
            $("#UsersPanel").collapse("hide")
            $("#OtrosPanel").collapse("hide")
            $("#SucursalPanel").collapse("hide")
            $("#EarningsPanel").collapse("hide")
            document.getElementById("textSelection").innerHTML="Administre las distribuciones";
        });
        $("#Earning").click(function () { 
            $("#ProductsPanel").collapse("hide")
            $("#UsersPanel").collapse("hide")
            $("#OtrosPanel").collapse("hide")
            $("#SucursalPanel").collapse("hide")
            $("#DisPanel").collapse("hide")
            document.getElementById("textSelection").innerHTML="Observe las ganancias";
        });
    }); 
}

if ($(".alert-dismissible").length) {
    $("#UsersPanel").collapse("show");
}

$('#btn_save').on('click', function() {

})

$('#CustomFile').on('change',function(){
    //get the file name
    var fileName = $(this).val();
    var cleanFileName = fileName.replace('C:\\fakepath\\', " ");
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(cleanFileName);
})

var filter="";
function buscar(Data, filter, isAdmin){
    let text = document.getElementById("Busqueda").value.toLowerCase();
    text.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
    console.log(text);
    let reg = new RegExp(`\\b${text}`, 'i');
    let html = "";

    console.log(Data);
    

    for(let producto of Data){
        if(reg.test(producto.nombre)&&producto.tipo_medicamento===filter&&producto.cantidad>0||reg.test(producto.nombre)&&filter==="Todos"&&producto.cantidad>0
        ||reg.test(producto.nombre)&&filter===""&&producto.cantidad>0){

            html+=`
            <div class="col mb-4">
                <a class="product" onclick="redirect(${producto.id})" style="cursor: pointer">
                    <div class="card card-producto h-100">
                        <img src="${producto.IMG}" class="card-img-top" >
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Tipo de Medicamento: ${producto.tipo_medicamento}</p>
                        </div>
                        <div class="card-footer" id="catalogPage">
                            <small class="text-muted">Precio: ${producto.precio}$</small>`
                            if(isAdmin==true) {
                                html += `<br>
                                <span class="btn btns btn-alert mt-2" role="button" id="edit" onclick="editarProducto(${producto.id})"><i class="far fa-edit"></i></span>
                                <span class="btn btns mt-2" type="" onclick="borrarProducto(${producto.id})" id="boton"><i class="far fa-trash-alt"></i></span>
                        </div>
                    </div>
                </a>
            </div>`}
                            else {html += `
                        </div>
                    </div>
                </a>
            </div>`}
        }
    }
    console.log(isAdmin)
    document.getElementById("productos").innerHTML=html;
}

function showProducts(producto){
    let html = "";

    for(let i=0; i < 4; i++){    
        html+=`
            <div class="col mb-4">
                <a class="product" onclick="redirect(${producto[i].id})" style="cursor: pointer">
                    <div class="card card-producto h-100">
                        <img src="${producto[i].IMG}" class="card-img-top imgSize" >
                        <div class="card-body">
                            <h5 class="card-title">${producto[i].nombre}</h5>
                            <p class="card-text">Tipo de Medicamento: ${producto[i].tipo_medicamento}</p>
                        </div>
                        <div class="card-footer" id="catalogPage">
                            <small class="text-muted">Precio: ${producto[i].precio}$</small>
                        </div>
                    </div>
                </a>
            </div>`
    }
    
    document.getElementById("seeProducts").innerHTML=html;
}

function editarProducto(id) {
    window.location.href = `/adminEditProduct/${id}`;
}

function redirect(id) {
    window.location.href = `/product/${id}`;
}

//if(window.location.pathname === "/catalog") {
    $(document).ready(function(){
        $(".btns").click(function(event) {
            event.stopPropagation();
            console.log(event.isPropagationStopped());
        })
    })
//}


function borrarlog(id) {
    var res = confirm("Está seguro de que desea eliminar la consulta?");

    if(res) {
        console.log(`eliminado ${id}`);
        window.location.href = `/adminDeleteLog/${id}`;
    }
}

function borrardis(id) {
    var res = confirm("Está seguro de que desea eliminar la distribucion?");

    if(res) {
        console.log(`eliminado ${id}`);
        window.location.href = `/adminDelDis/${id}`;
    }
}

function cambiarEstatus(id) {
    var res = confirm("Está seguro de que desea aprobar la distribucion?");

    if(res) {
        console.log(`aprobado ${id}`);
        window.location.href = `/adminAprobeDis/${id}`;
    }
}

function borrarProducto(id) {
    var res = confirm("Está seguro de que desea eliminar el producto?");

    if(res) {
        console.log(`eliminado ${id}`);
        window.location.href = `/adminDeleteProduct/${id}`;
    }
}

function editarUsuario(id) {
    window.location.href = `/adminEditUser/${id}`;
}

function borrarUsuario(id) {
    var res = confirm("Está seguro de que desea eliminar el usuario?");

    if(res) {
        console.log(`eliminado ${id}`);
        window.location.href = `/adminDeleteUser/${id}`;
    }
}

function borrarSucursal(id) {
    var res = confirm("Está seguro de que desea eliminar la sucursal?");

    if(res) {
        console.log(`eliminado ${id}`);
        window.location.href = `/adminDeleteBranch/${id}`;
    }
}

function handleChange(obj) {
    if(obj.checked == true){
        document.getElementById("CustomFile").setAttribute("disabled", "disabled");
    }else{
        document.getElementById("CustomFile").removeAttribute("disabled");
   }
}

$("ol").on("click","li", function (){
    var cat=$(this).text();
    filter=cat;
    $(".breadcrumb-item").removeClass("activo");
    $(this).toggleClass("activo");
    buscar(SearchData,filter,isAdmin);
})

if(window.location.pathname === "/catalog") buscar(SearchData,filter,isAdmin);
if(window.location.pathname === "/home") showProducts(SearchData);

function AddToCart() {  
    document.getElementById("qtty").submit();
}

var Value;
function calculate(){
    let qtty = document.getElementById("InputQtty").value;
    let Total = Value*qtty;
    document.getElementById("Total").innerText=Total;
}

function estados() {
    let html = `<option selected disabled value="">Elegir...</option>`
    
    let Name = document.getElementById("PaisSelect").value;

    if(Name === 'Estados Unidos'){
        EstadosUSA.forEach(el => {
            html+=`<option>${el.name}</option>`
        });
    } else if (Name === 'Venezuela'){
        EstadosVEN.forEach(el => {
            html+=`<option>${el}</option>`
        });
    }

    document.getElementById("inputLoc").innerHTML = html;
}

let path = window.location.pathname.split('/');
if(path[1] === "adminEditBranch"){
    EditBranch(ubicacion);
} else if(path[1] === "UserCart") {
    CalculateTaxes();
} else if(path[1] === "buy") {
    CalculateTaxes();
    Nation_State(Ubicacion);
    let dates = getDate(document.getElementById("PaisSelect").innerText);
    document.getElementById("Fsalida").value=dates[0]
    document.getElementById("Fentrega").value=dates[1]
}



function EditBranch(Name) {
    let html = "";
    let inVen = false     

    EstadosVEN.forEach(el => {
        if(el === Name){
            inVen = true;
        }
    });

    if(inVen){
        EstadosVEN.forEach(el => {
            if(el === Name){
                html+=`<option selected >${el}</option>`
            } else {
                html+=`<option>${el}</option>`
            }
        });
    } else {
        EstadosUSA.forEach(el => {
            if(el.name === Name){
                html+=`<option selected >${el.name}</option>`
            } else {
                html+=`<option>${el.name}</option>`
            }
        });
    }

    document.getElementById("inputLoc").innerHTML = html;
}

function Nation_State(ubicacion){
    let inVen = false     

    EstadosVEN.forEach(el => {
        if(el === ubicacion){
            document.getElementById("PaisSelect").innerHTML = `<option selected >Venezuela</option>`;
            document.getElementById("inputLoc").innerHTML = `<option selected >${el}</option>`
        }
    });

    EstadosUSA.forEach(el => {
        if(el.name === ubicacion){
            document.getElementById("PaisSelect").innerHTML = `<option selected >Estados unidos</option>`;
            document.getElementById("inputLoc").innerHTML = `<option selected >${el.name}</option>`
        }
    });

}

function selectuser(){
    let user = document.getElementById("SelectUser").value;

    if(user === "Cliente"){
        document.getElementById("SelectJob").value = "Ninguno";
    }
}

function SubmitCartForm(data){
    document.getElementById(data).submit();
}

function SubmitDelete(data){
    document.getElementById(data).submit();
}

function CalculateTaxes(){
    let subTotal
    let TotalTax;
    EstadosUSA.forEach(el => {
        if(el.name===Ubicacion){
            TotalTax = (el.tax/100)*Number(document.getElementById("subTotalPrice").innerText.slice(1));
        }
    });
    if(!TotalTax) TotalTax = 0.16*Number(document.getElementById("subTotalPrice").innerText.slice(1));
    document.getElementById("Taxes").innerText="$"+ TotalTax.toFixed(2);
    CalculateShipping(TotalTax);
}

function CalculateShipping(TotalTax){
    let TotalShipping = 0;
    console.log(Cart);
    for(let el in Cart){
        for(var i of Categories){
            if(Cart[el].data.tipo_medicamento === i.name){
                if(document.getElementById("Qtty"+el).value) TotalShipping += (i.cost*Number(document.getElementById("Qtty"+el).value));
                else TotalShipping += (i.cost*Number(document.getElementById("Qtty"+el).innerText));
                console.log(document.getElementById("Qtty"+el).innerText)
            }
        }
    }
    document.getElementById("Shipping").innerText ="$" + (TotalShipping).toFixed(2);
    subTotal = Number(document.getElementById("subTotalPrice").innerText.slice(1));
    document.getElementById("TotalPrice").innerText ="$" + (subTotal + TotalTax + TotalShipping).toFixed(2);
    if(document.getElementById("Total4BE")){
        document.getElementById("Total4BE").value=(subTotal + TotalTax + TotalShipping).toFixed(2);
    }

}

function getDate(data) {
    console.log(data);
    var fechaActual = new Date(Date.now());
    var fechaExport = new Date(fechaActual.getTime() + 604800000);
    var fechaDis    = new Date(fechaActual.getTime() + 1209600000);
    if(data!=="Estados unidos"){
        console.log(fechaActual.getDate());
        if(fechaDis.getDate()<10){
            return  [`${fechaActual.getFullYear()}-${parseInt(fechaActual.getMonth())+1}-${fechaActual.getDate()}`, `${fechaDis.getFullYear()}-${parseInt(fechaDis.getMonth())+1}-0${fechaDis.getDate()}`, fechaActual.toLocaleDateString(), fechaDis.toLocaleDateString()];
        }else{
            return  [`${fechaActual.getFullYear()}-${parseInt(fechaActual.getMonth())+1}-${fechaActual.getDate()}`, `${fechaDis.getFullYear()}-${parseInt(fechaDis.getMonth())+1}-${fechaDis.getDate()}`, fechaActual.toLocaleDateString(), fechaDis.toLocaleDateString()];
        }
    }else{
        if(fechaDis.getDate()<10){
            return  [`${fechaActual.getFullYear()}-${parseInt(fechaActual.getMonth())+1}-${fechaActual.getDate()}`, `${fechaDis.getFullYear()}-${parseInt(fechaDis.getMonth())+1}-0${fechaDis.getDate()}`, fechaActual.toLocaleDateString(), fechaDis.toLocaleDateString()];
        }else{
            return [`${fechaActual.getFullYear()}-${parseInt(fechaActual.getMonth())+1}-${fechaActual.getDate()}`, `${fechaExport.getFullYear()}-${parseInt(fechaExport.getMonth())+1}-${fechaExport.getDate()}`, fechaActual.toLocaleDateString(), fechaExport.toLocaleDateString() ];
        }
    }
}
