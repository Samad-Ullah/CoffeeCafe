// for cloud function
const addNewAdmin = document.querySelector('.admin-actions');
addNewAdmin.addEventListener('submit',(e)=>{
    e.preventDefault();
    const adminEmail = document.querySelector('#user-ID').value;
    const confirmNewAdmin = functions.httpsCallable('confirmNewAdmin');
    confirmNewAdmin({email: adminEmail}).then(result =>{
        console.log(result);
    });
});



//for auth state changes
auth.onAuthStateChanged(user =>{
    if(user) {
        user.getIdTokenResult().then(IdTokenResult =>{
           user.admin =IdTokenResult.claims.admin;
           navbarlinks(user);
           
     
        })
        //get data from database
        db.collection('CofeeCollection').onSnapshot(snapshot => {
        setupCoffee (snapshot.docs);
        
       

    });

    }else{
        navbarlinks();
        setupCoffee([]);
    }
});

// add new  Coffee in db 
const addcoffee =document.querySelector('#create-form');
 addcoffee.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection('CofeeCollection').add({
        CoffeeName:addcoffee['CoffeeName'].value, 
        Price:addcoffee['Price'].value,
        Description:addcoffee['Description'].value
  }).then(() =>{
      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      addcoffee.reset();
  });

});






const signupForm =document.querySelector('#signup-form');
 signupForm.addEventListener('submit',(e)=>{
     e.preventDefault();
     
     // get user data 
     const email = signupForm['signup-email'].value;
     const password = signupForm['signup-password'].value;
     
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        console.log(cred.user);

        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
     
 });

 const logout =document.querySelector('#logout');
 logout.addEventListener('click',(e) =>{
     e.preventDefault();
     auth.signOut();
 });

 
 const loginForm=document.querySelector('#login-form');
 loginForm.addEventListener('submit', (e) => {
     e.preventDefault();
     const email = loginForm['login-email'].value;
     const password =loginForm['login-password'].value;

     auth.signInWithEmailAndPassword(email,password).then(cred => {
         console.log(cred.user);
         const modal =document.querySelector('#modal-login');
         M.Modal.getInstance(modal).close();
         loginForm.reset();

     });

 });