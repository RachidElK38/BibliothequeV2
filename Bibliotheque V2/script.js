
       
var inputTitre = document.getElementById("titre");
 var inputAuteur = document.getElementById("auteur");
 var inputDate = document.getElementById("date");
 var inputEmail = document.getElementById("email");
 var inputPrix =   document.getElementById("prix");
 var inputLangue = document.getElementById("langue");
 var input = document.getElementsByTagName("input");

var btnSave =  document.getElementById("btn1");


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
     return "L'ouvrage" + Titre + "est un" + this.Typee + "en langue" + this.Lang +
      ", écrit par" + this.Auteur + "et publié le"+ this.Date +". Le prix de"+ this.Titre +
       "est de "+ this.Prix + "Dhs.";
 }

 }
 var lst = [];
  var LstOuvrage = JSON.parse(localStorage.getItem("LstOuvrage"));
  if(LstOuvrage!=null){
     for(i=0;i<LstOuvrage.length;i++){
         var ouvrage = new Ouvrage(LstOuvrage[i].Titre,LstOuvrage[i].Auteur,LstOuvrage[i].Date,LstOuvrage[i].Prix,LstOuvrage[i].Email,LstOuvrage[i].Typee,LstOuvrage[i].Lang);
         lst.push(ouvrage);
         lst.sort();
     }
 }


 /*Creation les lignes du table*/
 function CreateRow(){
     var tbody = document.querySelector("tbody");
     for(var i=0;i<lst.length;i++){
         tr =document.createElement("tr")
         tr.innerHTML = `<td>${lst[i].Titre}</td>
         <td>${lst[i].Auteur}</td>
         <td>${lst[i].Date}</td>
         <td>${lst[i].Prix}</td>
         <td>${lst[i].Email}</td>
         <td>${lst[i].Typee}</td>
         <td>${lst[i].Lang}</td>
         <td><button type="button" id="edit" class="button green" onClick="onEdit(this);" >Editer</button>
<button type="button" class="button red" onClick="onDelete(this);" >Supprimer</button></td>

         `
         tbody.appendChild(tr);
     }
 }


 function validation(){
 
     var isValid = 0;
     for(var i=0;i<5;i++){
         if(input[i].value==""){
             input[i].style.borderColor="red";
             isValid++;
         }
         else{
             input[i].style.borderColor="green"
         }
     }
     if(document.querySelector("input[name='choice']:checked").value==null){
         document.getElementById("validType").innerHTML = "Sélectionner un type";  
             isValid++; 
     }
     if(inputLangue.value=="0")
     {
         document.getElementById("validLang").innerHTML="Sélectionner une langue!";
         inputLangue.style.borderColor="red"
         isValid++;
     }
     //Email
    /* var  regexEmail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     
         if(regexEmail.test(inputEmail.value))
         {
             inputEmail.style.borderColor="green";
         }
         else{
             document.getElementById("validEmail").innerHTML="not good"
             isValid++;
         }
     */
     //Prix réel
   /*  var decimalNum= /^[-+]?[0-9]+\.[0-9]+$/
  
         if(decimalNum.test(inputPrix.value))
         {
             inputPrix.style.borderColor="green";
         }
         else{
             document.getElementById("validPrix").innerHTML="no valider";
             isValid++;
         }
        
     */
     var lll=document.querySelector("select");
     if(isValid==0){
         if(btnSave.innerHTML=="Enregistrer"){
 var p = new Ouvrage(inputTitre.value,inputAuteur.value,inputDate.value, inputPrix.value, inputEmail.value,document.querySelector("input[name='choice']:checked").value,lll.value);
     lst.push(p);
     lst.sort();
     
        
         localStorage.setItem("LstOuvrage", JSON.stringify(lst));
         CreateRow();
         resetForm();
}
if(btnSave.innerHTML=="Modifier")
{
 var p = new Ouvrage(inputTitre.value,inputAuteur.value,inputDate.value, inputPrix.value, inputEmail.value,sss.value,lll.value);
     lst.push(p);
 row.cells[0].innerHTML = p.Titre;
 row.cells[1].innerHTML = p.Auteur;
 row.cells[2].innerHTML = p.Date;
 row.cells[3].innerHTML = p.Prix;
 row.cells[4].innerHTML = p.Email;
 row.cells[5].innerHTML  = p.Typee;
 row.cells[6].innerHTML  = p.Lang;
 btnSave.innerHTML = "Enregistrer";
}
     }            

 }



 /*OnEdit pour rechargé les informations dans le formulaire*/ 
function onEdit(b)
{
row = b.parentElement.parentElement;
inputTitre.value = row.cells[0].innerHTML;
inputAuteur.value = row.cells[1].innerHTML;
inputDate.value = row.cells[2].innerHTML;
inputPrix.value = row.cells[3].innerHTML;
inputEmail.value = row.cells[4].innerHTML;

btnSave.innerHTML = "Modifier";

}

/*--------------------------------------*/

/*Supprimer ligne de tableau*/
function onDelete(td){
if(confirm('Delete??')){
row  = td.parentElement.parentElement;
document.getElementById("table").deleteRow(row.rowIndex);
resetForm();
}
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


CreateRow();


