

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});




// Get the book list available in the shop
/*public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
  //return res.status(300).json({message: "Yet to be implemented"});
});
*/

public_users.get('/',function (req, res) {


    let listBooksPromise = new Promise(function(listBooksResolve, listBooksReject) {
     
     
        listBooksResolve(JSON.stringify(books));
        listBooksReject("Error!");
      
    });
    
    listBooksPromise.then(
    
        function(value){res.send(value);},
    
        function(error) {res.send(value);}
    
    );
    
    });
    
    

     
    

// Get book details based on ISBN
/*public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn]));
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  */

 // Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  

    let listBooksIsbnPromise = new Promise(function(listBooksIsbnResolve, listBooksIsbnReject) {
       
          const isbn = req.params.isbn;
          
  
          setTimeout(() => {
          listBooksIsbnResolve(JSON.stringify(books[isbn]));
          listBooksIsbnReject("Error!");
        },6000)
        
      });
      
      listBooksIsbnPromise.then(
      
          function(value){res.send(value);},
      
          function(error) {res.send(value);}
      
      );
   });

// Get book details based on author
/*public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  
  let books_author = {};
  
  for (let ind in books) {    
        
       if (books[ind]["author"] === author){
        
        books_author[ind] = {
            "author":books[ind]["author"],
            "title":books[ind]["title"],
            "reviews":books[ind]["reviews"]
        };
        
    }        
        
    
}
  res.send(JSON.stringify(books_author));
  //return res.status(300).json({message: "Yet to be implemented"});
});
*/

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
  
  let listBooksPromise = new Promise(function(listBooksResolve, listBooksReject) {
       
          const author = req.params.author;
    
    let books_author = {};
    
    for (let ind in books) {    
          
         if (books[ind]["author"] === author){
          
          books_author[ind] = {
              "author":books[ind]["author"],
              "title":books[ind]["title"],
              "reviews":books[ind]["reviews"]
          };
          
      }
    }    
    
    setTimeout(() => {
        listBooksResolve(JSON.stringify(books_author));
          listBooksReject("Error!");
      },6000)
          
        
  });
      
      listBooksPromise.then(
      
          function(value){res.send(value);},
      
          function(error) {res.send(value);}
      
      );  
      
   
  });
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  
  let listBooksTitlePromise = new Promise(function(listBooksTitleResolve, listBooksTitleReject) {
       
    const title = req.params.title;
  let books_title = {};
  
  for (let ind in books) {    
        
       if (books[ind]["title"] === title){
        
        books_title[ind] = {
            "author":books[ind]["author"],
            "title":books[ind]["title"],
            "reviews":books[ind]["reviews"]
        };
        
    }        
        
    
}
setTimeout(() => {
  listBooksTitleResolve(JSON.stringify(books_title));
    listBooksTitleReject("Error!");
},6000)
    
  
});

listBooksTitlePromise.then(

    function(value){res.send(value);},

    function(error) {res.send(value);}

);  




  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  books_review = books[isbn]["reviews"];
  
  res.send(JSON.stringify(books_review));
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;



