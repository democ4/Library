
let myLibrary=[];
if (JSON.parse(localStorage.getItem("mylb"))) {myLibrary= JSON.parse(localStorage.getItem("mylb"));
}
console.table(myLibrary);

 function resetstorage(){
    myLibrary=[];
    localStorage.setItem("mylb",JSON.stringify(myLibrary));
    cleantable();
 }

function book(title,auther,page,readed){
    this.title =title
    this.auther= auther
    this.page=page 
    this.readed =readed
}
function addBookToLibrary(book){
    myLibrary.push(book);
}
cleantable();
showBooks();
let i=0;
let storage = document.getElementById("storage");

// let form = document.getElementById("form");
//form.addEventListener("submit",addNewBook);

function findwhichchildami(node){
    let con =0;
   let nextNode = node.nextSibling
   while(nextNode!= null){
       nextNode=nextNode.nextSibling;
       con++
    }
    return node.parentNode.childNodes.length - con -1
}

function deletebook(e){

    myLibrary.splice(findwhichchildami(e.target.parentNode) ,1)
     cleantable();
     showBooks();
}
function changereadOrNot(e){
    e.target.textContent  =="y" ?  e.target.textContent ="n" :e.target.textContent ="y" ;
    e.target.textContent  =="y" ?  myLibrary[findwhichchildami(e.target.parentNode) ].readed = true : myLibrary[findwhichchildami(e.target.parentNode) ].readed = false;
    localStorage.setItem("mylb",JSON.stringify(myLibrary));
    console.table(myLibrary);
}



function addNewBook(){
        let t = document.getElementById("title").value;
        let au = document.getElementById("auther").value;
        let page = document.getElementById("page").value;
        let read = document.getElementById("readed").checked;
        if(t == ""|| au == ""||page=="")return false;
        let bk= new book(t,au,page,read);
        addBookToLibrary(bk);
        
    let newbook = document.createElement("div");
    newbook.className = "book"; 
    newbook.innerHTML =`
    <div class="bookname">${t}</div> 
    <div class="bookauther">${au}</div>
    <div class="bookpage">${page}</div>
    <div class="readOrNot">${ (read ==true ? "y" :"n")}</div>
    <div class="delete">X</div>
    `;

    document.getElementById("storage").appendChild(newbook);


    let re = document.querySelectorAll(".readOrNot")
    re[re.length-1].addEventListener("click",changereadOrNot);  

    let de = document.querySelectorAll(".delete")
    de[de.length-1].addEventListener("click",deletebook);  
    localStorage.setItem("mylb",JSON.stringify(myLibrary));
    document.getElementById("form").reset()
}
function cleantable(){

    let container= document.getElementById("storage");
    container.textContent="";
    return 0;
}

function showBooks(){
    let container= document.getElementById("storage");

    localStorage.setItem("mylb",JSON.stringify(myLibrary));
    myLibrary.forEach(books =>{
                
        let newbook = document.createElement("div");
        newbook.className = "book";
        newbook.innerHTML =`
        <div class="bookname">${books.title}</div> 
        <div class="bookauther">${books.auther}</div>
        <div class="bookpage">${books.page}</div>
        <div class="readOrNot">${ (books.readed ==true ? "y" :"n")}</div>
        <div class="delete">X</div>
        `;
        container.appendChild(newbook);

        let re = document.querySelectorAll(".readOrNot")
        re[re.length-1].addEventListener("click",changereadOrNot);  

        let de = document.querySelectorAll(".delete")
        de[de.length-1].addEventListener("click",deletebook);  
        return 0;
    })

}