var laskuri=1;
var tokalaskuri=1;

function luoListaElementti() {

  var teksti=document.getElementById("tekstikentta").value; //sijoitetaan tekstimuuttujaan tekstikenttään kirjoitettava arvo
  
  if(teksti==""){   //jos tekstikenttä on tyhjä niin     

    alert("Kirjoita jotain!"); // tulee ikkuna jossa pyydetään syöttämään jotain
    document.getElementById("tekstikentta").style.border ="2px solid red"; //ja lisätään tekstikentän ympärille puneiset reunat

  }else{

    document.getElementById("tekstikentta").style.border ="none";

  var ul = document.getElementsByTagName("ul")[0]; 
  var li = document.createElement("li"); //luodaan listaelementti
   
  li.innerText=teksti; //listaelementin tekstiksi sijoitetaan tekstikenttään kirjoitettu teksti
  li.draggable="true"; //listaelementti on siirrettävä
  li.id="T"+tokalaskuri; //listaelementin id muodostuu t kirjaimesta ja juoksevasta numeroinnista, näin kaikilla listaelementeillä on eri id
 
  //listaelementin listenerit
  li.addEventListener("dragstart",drag,false); //liittyy raahaamiseen
  li.addEventListener("mouseover",mouseOver, false); //kun hiiren siirtää elementin päälle kutsutaan mouseOver funktiota
  li.addEventListener("mouseout",mouseOut,false); // kun hiiren siirtää elementin päältä pois kutsutaan mouseOut funktiota
  document.getElementById("tekstikentta").value=""; //tyhjentää tekstikentän   
  
  
   
   var poistaNappula=document.createElement("Button");//luodaan poistaNappula
   poistaNappula.innerHTML='<i style="font-size:16px" class="fa">&#xf1e2;</i>'; //liitetään nappiin ikoni
   poistaNappula.id="X"+laskuri; //napin id muodostuu x kirjaimesta ja juoksevasta numeroinnista
   poistaNappula.className="poista";
   poistaNappula.addEventListener("click",poista,false); //nappulan listener, hiirellä klikatessa kutsuu poista funktiota
   li.appendChild(poistaNappula); //lisätään nappula listaelementtiin
   

   var tehtyNappula=document.createElement("Button");
   tehtyNappula.innerHTML='<i style="font-size:18px; color:green" class="fa">&#xf00c;</i>';
   tehtyNappula.id="Y"+laskuri;
   tehtyNappula.className="tehty";
   tehtyNappula.addEventListener("click",tehty,false);
   li.appendChild(tehtyNappula);

   var tarkeaaNappula=document.createElement("Button");
   tarkeaaNappula.innerHTML='<i style="font-size:18px; color:red" class="fa">&#xf0a1;</i>';
   tarkeaaNappula.id="Z"+laskuri;
   tarkeaaNappula.className="tärkeää";
   tarkeaaNappula.addEventListener("click",tarkeaTehtava,false);
   li.appendChild(tarkeaaNappula);
   
   ul.appendChild(li); //lisätään uusi listaelementti listaan

  laskuri++; 
  tokalaskuri++;
  }
}

// kun hiiren vie valitun listaelementin päälle tulevat nappulat näkyviin siinä listaelementissä
function mouseOver(event){
var liElementti= document.getElementById(this.id);
liElementti.childNodes[1].style.display="block"; //poista nappula tulee näkyviin
liElementti.childNodes[2].style.display="block"; //tehty nappula tulee näkyviin
liElementti.childNodes[3].style.display="block"; //tarkeaa nappula tulee näkyviin
console.log(this.id);
 
}

//hiiren vie pois valitusta listaelementistä nappulat häviävät
function mouseOut(event){
  var liElementti= document.getElementById(this.id);
  liElementti.childNodes[1].style.display="none";
  liElementti.childNodes[2].style.display="none";
  liElementti.childNodes[3].style.display="none";
}

 
function tarkeaTehtava(event){ 
  var emoNimi=document.getElementById(this.id).parentElement.id;  //haetaan tietyn nappulan vanhemman elementin nimi
  var emoElem=document.getElementById(emoNimi); 
  emoElem.style.color= "red";           //ja vaihdetaan elementin fontin väri 
  emoElem.style.fontSize = "24px";      //ja koko

  
}

//sama kuin edellinen functio mutta yliviivataan elementin kirjoitus
function tehty(event){
  var emoNimi=document.getElementById(this.id).parentElement.id;
  var emoElem=document.getElementById(emoNimi);
  emoElem.style.textDecoration = 'line-through';
}

//Ja tässä poistetaan koko elementti
function poista(event){
  var k=document.getElementById(this.id).parentElement.id;
  var t=document.getElementById(k);
  t.hidden=true;
}


function enterPainallus(event){

  if(event.keyCode==13){ //jos käyttäjä painaa enteriä
    luoListaElementti(); //niin kutsutaan luoListaElementti funktiota
  }
}

//aloitetaan elementin raahaminen
function drag(event){
  event.dataTransfer.setData("text/plain", event.target.id); //parametrina raahattavan elementin nimi
  console.log(event.target.id);
}

function allowDrop(event) {
  event.preventDefault();   //sallii elementin pudottamisen
}

function drop(event) {
  event.preventDefault(); //lopuksi tiputetaan raahattava elementti roskikseen
  var data = event.dataTransfer.getData("text/plain"); 
  
  if (event.target == document.getElementById("trash")) { 
    var img = document.getElementById(data); //sijoitetaan elementti roskikseen
    img.parentNode.removeChild(img); //poistetaan elementti
}

}

//onclick functio päivämäärälle
function annaPvm(){

  var d = new Date();
  var n = d.getDate() + "/" + (d.getMonth() + 1) + "/" +d.getFullYear() ; //päivämäärä muodossa pp/kk//vvvv
  
  document.getElementById("pvmKentta").innerHTML = n; //tämä päivämäärä päivämäärä kenttään
  
}
