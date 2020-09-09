let currentdata; //main variable to download data from server

document.addEventListener("DOMContentLoaded", getData);

function getData(){
	let connection = new XMLHttpRequest();
   	connection.open("GET", "http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&pretty=true", true);
    connection.onreadystatechange = () => {
      if (connection.readyState != 4 || connection.status != 200) {
      	// throw new Error ("Server is not founded");
      	return;
      }
      currentdata = JSON.parse(connection.responseText);
    };
    connection.send();
}


let personsList=document.getElementById('persons');
personsList.innerHTML="";

let btnShowData=document.getElementById('btnShow');
btnShowData.addEventListener('click', showData);

let lookingForInput=document.getElementById('search');
lookingForInput.addEventListener('input',searchPersons);
let founded=document.getElementById('founded');

function searchPersons(){
	let word=lookingForInput.value.toLowerCase();
	let searchList=[];
	if (word.length!=0) {
		for(let i=0;i<currentdata.length;i++){
    		if ( currentdata[i].fname.toLowerCase().indexOf(word)!=-1 ||
    		 currentdata[i].lname.toLowerCase().indexOf(word)!=-1 )
    			searchList.push(i);
    	};
    	console.log("Numbers:"+searchList);
    	showPersons(searchList);
	}
}

function showPersons(persons){
	console.log(persons);
	let foundedPersons="";
	for(let i=0;i<persons.length;i++){
		foundedPersons=foundedPersons+currentdata[persons[i]].fname+' '+currentdata[persons[i]].lname+': tel.'+currentdata[persons[i]].tel+' with address '+currentdata[persons[i]].zip+','+currentdata[persons[i]].state+' '+currentdata[persons[i]].city+','+currentdata[persons[i]].address+'<br>';

	}
	founded.innerHTML=foundedPersons;
	
}


function showData(){
    	let stringData="";
    	for(let i=0;i<currentdata.length;i++){
    		stringData=stringData + currentdata[i].fname + ' '+
    		 currentdata[i].lname + ' '+'<br>';
    	};
    	personsList.innerHTML=stringData;
    	personsList.classList.remove("hidden");
    	btnShowData.classList.add("hidden");

    }

