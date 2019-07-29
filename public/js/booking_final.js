var cleaners = document.getElementById('card-3');
var itemList = document.getElementById('items');
var cardBody = document.getElementById('card-bod');
var inline = document.getElementsByClassName('.list-inline-item');
var checkoutBtn = document.getElementsByClassName('.checkout');
var icount  = inline.length;
var chcount = checkoutBtn.length;
var selectBtns = document.getElementsByClassName('select');
var requestForm = document.getElementById('requestForm');
var checkoutBTN = document.getElementById('checkoutBTN');

cleaners.addEventListener('click', addTag);
itemList.addEventListener('click', removeSelected);
requestForm.addEventListener('click', submitForm);

function addTag(e){
    //e.preventDefault();
    if(e.target.classList.contains('select')){
        var dad = e.target.parentNode;
        var uncle = dad.nextSibling;
        var uncle2 = uncle.nextSibling;
        var cousin = uncle2.firstChild;
        var goal = cousin.firstChild;
        var goalSibling = goal.nextSibling;
        console.log(goal);
        console.log(goalSibling);

        //Create New List Item
        var newItems = goal.textContent;
        var cleanerID = goalSibling.textContent;
        console.log(newItems);
        var li  = document.createElement('li');
        var input  = document.createElement('input');
        input.type = 'hidden';
        input.name = 'selectedCleaner' + icount;
        input.value = newItems;
        input.className = 'inputAdded';
        var cleanInput = document.createElement('input');
        cleanInput.type = 'hidden';
        cleanInput.name = 'selectedCleanerID'+ icount;
        cleanInput.className = 'cleanAdded';
        cleanInput.value = cleanerID;
        li.className = 'list-inline-item';
        li.appendChild(document.createTextNode(newItems));
        icount++;

        //Disable Select button
        e.target.className = 'btn btn-danger btn-sm selected disabled';
        e.target.textContent = "Selected";
        e.target.disabled = "true";

        //Create Delete Button
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete remove';
        deleteBtn.appendChild(document.createTextNode('x'));
        li.appendChild(deleteBtn);

        //Append li to list
        itemList.appendChild(li);
        requestForm.appendChild(input);
        requestForm.appendChild(cleanInput);
    }
    //Create Checkout button
    if(icount==3){
        var checkout = document.createElement('button');
        checkout.className = 'btn btn-primary btn-sm checkout';
        checkout.id = 'checkoutBTN';
        checkout.appendChild(document.createTextNode('Check Out'))
        requestForm.appendChild(checkout);
        chcount ++;
        for(var i = 0; i < selectBtns.length; i++){
            console.log(selectBtns.length)
            selectBtns[i].disabled = true;
            if(chcount > 1){
                var checkout = document.querySelector('.checkout')
                requestForm.removeChild(checkout.nextSibling);
                }
        }

    }
}

function submitForm(e){
    if(e.target.classList.contains('checkout')){
        document.getElementById('requestForm').submit();
        // if(){
        //     console.log('form submitted');
        // }
    }
    // console.log(checkoutBTN);
    // document.getElementById('requestForm').submit();
    // console.log('form submitted');
}

function removeSelected(e){
    if(e.target.classList.contains('delete')){
        //var select = document.querySelectorAll('.list-inline-item');
        //console.log(showthis[0]);
        //console.log(e.target.previousSibling.textContent);
        if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        var liText = e.target.previousSibling.textContent;
        itemList.removeChild(li);
        icount--;
        var select = document.querySelectorAll('.see');
        console.log(select);
        for(var i = 0; i < select.length; i++){
            var word = select[i].textContent;
            var btnGoal = select[i].parentNode.parentNode;
            var btnGoal2 = btnGoal.previousSibling.previousSibling;
            var final = btnGoal2.lastChild;
            //console.log(final);
            if(word === liText){
                console.log(final);
                final.className = 'btn btn-primary btn-sm select';
                final.textContent= "Select"
                final.disabled = false;
                console.log(liText);
                var allInputs = document.querySelectorAll('.inputAdded');
                for(var a = 0; a <= allInputs.length; a++){
                    var inputValue = allInputs[a].value;
                    if(liText == inputValue){
                        var cleanerIDValue = allInputs[a].nextSibling;
                        console.log(cleanerIDValue);
                        console.log(allInputs[a]);
                        allInputs[a].remove();
                        cleanerIDValue.remove();
                        if(icount<3){
                            var checkout = document.querySelector('.checkout')
                            requestForm.removeChild(checkout);
                            for(var i = 0; i < selectBtns.length; i++){
                                console.log(selectBtns.length)
                                selectBtns[i].disabled = false;
                            }
                        }
                    }

                }

            } else{
                console.log('none found');
            }
          }


      }
    }
  }