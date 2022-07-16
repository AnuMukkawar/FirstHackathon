let url="https://www.anapioficeandfire.com/api/books"
let searchUrl="https://www.anapioficeandfire.com/api/books/search&query="
var bookName=document.getElementById('bookName')

getBooksData(url)
async function getBooksData(url){
    let bookData=await fetch(url)
    let allData=await bookData.json()
    console.log(allData)
    showBooks(allData)
}

let booksContainer=document.getElementById('booksContainer')
async function showBooks(books){
    booksContainer.innerHTML=""
   if(books.length>1){
        books.map((element)=>{
          var arr=[]
            var booksDiv=document.createElement('div')
            booksDiv.classList.add('col','books')
           
            booksDiv.innerHTML=`<div class="card bg-light border-dark mb-3" style="max-width: 30rem;">
            <div class="card-header text-white" id="bookName" style="background-color:purple;">${element.name}</div>
            <div class="card-body text-secondary">
              <p class="card-text text-dark">No. of Pages: ${element.numberOfPages}</p>
              <p class="card-text text-dark">Publisher: ${element.publisher}</p>
              <p class="card-text text-dark">ISBN: ${element.isbn}</p>
              <p class="card-text text-dark">Authors: ${element.authors[0]}</p>
              <p class="card-text text-dark">Released Date: ${element.released}</p>
              <p class="card-text text-dark">Character's Names :</p>
              
            </div>
          </div>`
          
          
          booksContainer.append(booksDiv)
        
        })
  }
  else{
        var booksDiv1=document.createElement('div')
        booksDiv1.innerHTML=`<div class="card bg-light border-dark mb-3" style="max-width: 30rem;">
        <div class="card-header text-white" id="bookName" style="background-color:purple;">${books.name}</div>
        <div class="card-body text-secondary">
          <p class="card-text text-dark">No. of Pages: ${books.numberOfPages}</p>
          <p class="card-text text-dark">Publisher: ${books.publisher}</p>
          <p class="card-text text-dark">ISBN: ${books.isbn}</p>
          <p class="card-text text-dark">Authors: ${books.authors[0]}</p>
          <p class="card-text text-dark">Released Date: ${books.released}</p>
          
        </div>
      </div>`
      
      booksContainer.append(booksDiv1)
  }
}
 
// search
const form=document.getElementById('form')
const search=document.getElementById('search')//input

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    searchTerm=search.value
    searchBook(searchTerm)
})

async function searchBook(searchvalue){
  let bookData1=await fetch(url)
  
  var bookurl;
  let allData1=await bookData1.json()
  if(searchvalue!=""){
    for(var i=0;i<allData1.length;i++)
    {
      //storing k:v to access url by name
      let books={ name:allData1[i].name.split(" "),url:allData1[i].url.split(" ")}
    
      if(books.name.includes(searchvalue)){
        bookurl=books.url[0]
        getBooksData(bookurl)
      }

    }
  }
  else{
       window.location.reload()
   }
  
}