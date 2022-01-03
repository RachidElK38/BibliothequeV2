var inputTitre = document.getElementById("titre");
var inputAuteur = document.getElementById("auteur");
var inputDate = document.getElementById("date");
var inputEmail = document.getElementById("email");
var inputPrix =   document.getElementById("prix");
var inputLangue = document.getElementById("langue");
var input = document.getElementsByTagName("input");

var selectedIndex = -1;
var isValid = 0;

var tbody = document.querySelector("tbody");

var btnSave =  document.getElementById("btn1");
var ouvrageArray = [];
console.log(selectedIndex);
class Ouvrage{
    constructor(Titre,Auteur,Date,Prix,Email,Typee,Lang){
        this.Titre = Titre;
        this.Auteur = Auteur;
        this.Date  =Date;
        this.Prix =Prix;
        this.Email = Email;
        this.Typee  = Typee;
        this.Lang = Lang;
    }
    DétailOuvrage(){
    return "L'ouvrage" +this.Titre + "est un" + this.Typee + "en langue" + this.Lang +
     ", écrit par " + this.Auteur + "et publié le"+ this.Date +". Le prix de"+ this.Titre +
      "est de "+ this.Prix + "Dhs.";
}

}

function afficher(){
    tbody.innerHTML = "";
    if(localStorage.getItem("LstOuvrage")){
        ouvrageArray = JSON.parse(localStorage.getItem("LstOuvrage"));
        addrows();
         
        }

    
}
afficher()

GetDataFromLocalStorage();

btnSave.onclick =  function(){   
    var regexrice= /^[-+]?[0-9]+\.[0-9]+$/
    
        if(!regexrice.test(inputPrix.value))
        {
            inputPrix.style.borderColor="red"
            isValid++;
        }
        var  regexEmail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regexEmail.test(email.value)){
            inputEmail.style.borderColor = "red";
            isValid++;
        }

       

    if(isValid==0){
        var lng = document.querySelector("select");
   var typ = document.querySelector("input[name='choice']:checked")
    var o = new Ouvrage(inputTitre.value,inputAuteur.value,inputDate.value,
        inputPrix.value,inputEmail.value,typ.value,lng.value);
        //Ajouter ouvrage ds liste
        if(selectedIndex ==-1){
            ouvrageArray.push(o);
            alert(o.DétailOuvrage());
        }
        else{
            ouvrageArray.splice(selectedIndex,1,o);
        }

    ouvrageArray.sort((a,b)=>{if(a.Titre.toUpperCase() < b.Titre.toUpperCase())
        {
            return -1;
        }})
    AddToLocalStorage(ouvrageArray);
    addrows();
    resetForm(); 
    }    
   
}
//AddToPage fonction qui permet d'Ajouter la liste des ouvrages ds la page(table)

function addrows(index){
    tbody.innerHTML = "";
    for(i=0;i<ouvrageArray.length;i++){
    
    var row = tbody.insertRow(-1);
     row.insertCell(0).innerHTML = ouvrageArray[i].Titre;
     row.insertCell(1).innerHTML = ouvrageArray[i].Auteur;
     row.insertCell(2).innerHTML =ouvrageArray[i].Date;
     row.insertCell(3).innerHTML =  ouvrageArray[i].Prix;
      row.insertCell(4).innerHTML = ouvrageArray[i].Email;
     row.insertCell(5).innerHTML = ouvrageArray[i].Typee;
    row.insertCell(6).innerHTML = ouvrageArray[i].Lang;
     row.insertCell(7).innerHTML = '<button onClick=" onEdit(this);">Editer</button> <button class="button red" onClick="onDelete('+index+');" >Supprimer</button>'
    }
}

function AddToLocalStorage(ouvrages){
    localStorage.setItem("LstOuvrage", JSON.stringify(ouvrages));
}
function  GetDataFromLocalStorage(){
    var LstOuvrage = JSON.parse(localStorage.getItem("LstOuvrage"));
}


/*OnEdit pour rechargé les informations dans le formulaire*/ 
function onEdit(r)
{
    selectedIndex= r.parentElement.parentElement.rowIndex-1;
    row = tbody.rows[selectedIndex]
inputTitre.value = row.cells[0].innerHTML;
inputAuteur.value = row.cells[1].innerHTML;
inputDate.value = row.cells[2].innerHTML;
inputPrix.value = row.cells[3].innerHTML;
inputEmail.value = row.cells[4].innerHTML;

var typ = document.querySelectorAll("input[name='choice']");
for(i=0;i<typ.length;i++)
{
if(row.cells[5].innerHTML == typ[i].value )
{
    typ[i].checked = true;
}
}

inputLangue.value = row.cells[6].innerHTML;
btnSave.innerHTML = "Modifier";
}
/*--------------------------------------*/
function onDelete(index){
ouvrageArray.splice(index,1);
AddToLocalStorage(ouvrageArray);
afficher();
resetForm();
}
function resetForm(){
inputAuteur.value="";
inputTitre.value="";
inputDate.value="";
inputEmail.value="";
inputPrix.value="";
}
//Print 
/*function printAll(){
   var p= document.querySelector("table");
   var wwe= window.open("","","width=900,height=700");
   wwe.document.write(p.outerHTML);
   wwe.document.close();
   wwe.focus();
   wwe.print();
   wwe.close();
}*/
