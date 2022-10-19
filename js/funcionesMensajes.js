//////// GET, POST, PUT, DELETE

function getMensajes(){
    $.ajax({
        url:"http://191.88.233.19:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarMensajes(respuesta);
        }
    });
}

function postMensajes(){
    if($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios")
    }else{
        let cajas = {
            messageText:$("#messageText").val(),
            client:{idClient: +$("#select-client").val()},
            tool:{id: +$("#select-tool").val()},
        };

        $.ajax({
            url:"http://191.88.233.19:8080/api/Message/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Se creó correctamente el mensaje");
                window.location.reload();
            }
        });
    }   
}

function putMensajes(idBotonActualizar){
    if($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios")
    }else{
        let cajas = {
            idMessage:idBotonActualizar,
            messageText:$("#messageText").val()
        };
    
        $.ajax({
            url:"http://191.88.233.19:8080/api/Message/update",
            type:"PUT",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Se actualizó correctamente el mensaje");
                window.location.reload();
            }
        });
    }
}

function deleteMensajes(idBotonBorrar){
    Swal.fire({
        title: '¿Está seguro de borrar el mensaje?',
        text: "¡No podrá revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(            
            '¡Mensaje borrado!',
            'Exitoso'
          )

        let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://191.88.233.19:8080/api/Message/"+ idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            data: JSON.stringify(myData),
            contentType:"application/json",
            success:function(respuesta){
                window.location.reload();
            }
        });
        }
      })
}

//////////////////////////////////////////////////
function getTool_Mensajes(){
    $.ajax({
        url:"http://191.88.233.19:8080/api/Tool/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-tool");
            $.each(respuesta, function (id,name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });
}

function getClient_Mensajes(){
    $.ajax({
        url:"http://191.88.233.19:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-client");
            $.each(respuesta, function (id,name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            })
        }
    });
}

//////////////////////////////////////////////////

function pintarMensajes(respuesta){
    let myTable="<table class='table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>"
        myTable+="<td>"+respuesta[i].tool.name+"</td>"
        myTable+="<td>"+respuesta[i].client.name+"</td>"
        myTable+="<td> <button onclick='putMensajes("+respuesta[i].idMessage+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' >Actualizar</button>"
        myTable+="<td> <button onclick='deleteMensajes("+respuesta[i].idMessage+")'class='flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' >Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado8").html(myTable);
}