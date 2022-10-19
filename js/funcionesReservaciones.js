//////// GET, POST, PUT, DELETE

function getReservaciones(){
    $.ajax({
        url:"http://191.88.233.19:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarReservation(respuesta);
        }
    });
}

function postReservaciones(){
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0){
        alert("Todos los campos son obligatorios")
    }else{
        let cajas = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            client:{idClient: +$("#select-client").val()},
            tool:{id: +$("#select-tool").val()},       
        };

        $.ajax({
            url:"http://191.88.233.19:8080/api/Reservation/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Se creó correctamente la reservación");
                window.location.reload();
            }
        });
    }
}

function putReservaciones(idBotonActualizar){
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0){
        alert("Todos los campos son obligatorios")
    }else{
        let cajas = {
            idReservation:idBotonActualizar,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val()
        };
    
        $.ajax({
            url:"http://191.88.233.19:8080/api/Reservation/update",
            type:"PUT",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Se actualizó correctamente la reservación");
                window.location.reload();
            }
        });
    }
}

function deleteReservaciones(idBotonBorrar){
    Swal.fire({
        title: '¿Está seguro de borrar la reservación?',
        text: "¡No podrá revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(            
            '¡Reservación borrada!',
            'Exitoso'
          )

        let myData={
            idReservation:idBotonBorrar
        };
        $.ajax({
            url:"http://191.88.233.19:8080/api/Reservation/"+ idBotonBorrar,
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

function getTool_Reservaciones(){
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

function getClient_Reservaciones(){
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

function pintarReservation(respuesta){
    let myTable="<table class='table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>"
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>"
        myTable+="<td>"+respuesta[i].status+"</td>"
        myTable+="<td>"+respuesta[i].client.name+"</td>"
        myTable+="<td>"+respuesta[i].tool.name+"</td>"
        myTable+="<td> <button onclick='putReservaciones("+respuesta[i].idReservation+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button>"
        myTable+="<td> <button onclick='deleteReservaciones("+respuesta[i].idReservation+")' class='flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}