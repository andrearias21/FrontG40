function getStatus(){
    $.ajax({
        url:"http://192.9.242.114:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
            console.log(respuesta)
        }
    });
}

function getFechas(){
    let dato1= $("#startDate1").val();
    let dato2= $("#startDate2").val();

    $.ajax({
        url:"http://192.9.242.114:8080/api/Reservation/report-dates/"+dato1+"/"+dato2,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarFechas(respuesta);
        }
    });
}

function getClientes(){
    let dato1= $("#startDate1").val();
    let dato2= $("#startDate2").val();

    $.ajax({
        url:"http://192.9.242.114:8080/api/Reservation/report-client/"+client,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarClientes(respuesta);
        }
    });
}

//////////////////////////////////////////////////

function pintarStatus(respuesta){
    let myTable="<table class=' bg-gray-400 table-auto w-full text-left whitespace-no-wrap'>";
        myTable+="<tr>";
        myTable+="<th>Completadas: </th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>Canceladas: </th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultado6").html(myTable);
}

function pintarFechas(respuesta){
    let myTable="<table class='bg-gray-400 table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>"
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>"
        myTable+="<td>"+respuesta[i].status+"</td>"
        myTable+="<td>"+respuesta[i].client.name+"</td>"
        
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado7").html(myTable);
}

function pintarClientes(respuesta){
    let myTable="<table class='bg-gray-400 table-auto w-full text-left whitespace-no-wrap'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>"
        myTable+="<td>"+respuesta[i].status+"</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado8").html(myTable);
}
