var validateButtton = document.getElementById("validateidbtn");
var userinput = document.getElementById("useridtxt");
var displayOutput = document.getElementById("displayOutputDiv");
validateButtton.addEventListener('click', validateUserInput);
var userBirthday = '';

//global var
var citizenShip = undefined;
var userGender = undefined;
var anyNumber = 0;
var usesLuhnAlgorithm = false;
//id no: 9604175845080

function validateUserInput(){
    user_id = userinput;
    //check: === 13 digits
    if (userinput === 13){
        //check: citi
        if (user_id.substring(10,11) === 1){
            citizenShip = "permanent resident";
        }else {
            citizenShip = "South African Citizen";
        }

        //check: gender
        let genderSubstring = user_id.substring(6,10);
        if ((genderSubstring >= 0) && (genderSubstring <= 4999)){
            userGender = "Female".toUpperCase;
        } else if ((genderSubstring >= 5000) && (genderSubstring <= 9999)){
            userGender = "Male".toUpperCase;
        }else{
            userGender = undefined;
        }

        //check: anynumber value, normally is [8]
        let anyNumSubtring = user_id.substring(11,12);
        if (anyNumSubtring === 8){
            anyNumber = anyNumSubtring;
        }

        //check: uses Luhn Algorithm

    }else{
        //call
        alert('Your ID no. is invalid. \nPlease enter your id again');
        userinput = "";
    
    }

    //return true/ false: if the id uses Luhn Algorithm
    // usesLuhnAlgorithm = 'Yes';

    //call other functions: display
    display();
}

function setUserBirthday(idno){
    var year = userinput.substring(0,2);
    var month = userinput.substring(2,4);
    var day = userinput.substring(4,6);
    userBirthday = `${day}/${month}/${year}`;
}

function display(){
    displayOutput.innerHTML += `\nID number: ${userinput}\n
    Birthday: ${userBirthday}\n
    Gender: ${userGender}\n
    Citizenship status: ${citizenShip}\n
    Any number usually [8]: ${anyNumber}\n
    Uses Luhn Algorithm: `;
}