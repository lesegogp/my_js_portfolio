
const allowance=150;
const burger=12.50

function calculateQuantity()
{
    var x=document.getElementById("quantity").value;
    var z=Number(x)*burger;
    var y=allowance-Number(z);
    
    console.log(z);
    console.log(y);
    
document.getElementById("spent").innerHTML=z;
document.getElementById("left").innerHTML=y;
}