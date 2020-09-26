const coffeeList = document.querySelector('.coffeess');
const linksLoggedIn = document.querySelectorAll('.logged-in');
const linksLoggedOut = document.querySelectorAll('.logged-out');
const account = document.querySelector('.account-details');
const adminitems =document.querySelectorAll('.admin');

// toggle UI Elements
const navbarlinks = (user) =>{
    if(user){
     
        if(user.admin){
            adminitems.forEach(item => item.style.display="block");
        }
        

        // account info.
        const html=`
        <div>loged In as ${user.email}</div>
        <div style="color: pink;">${user.admin? "admin" : ""}</div>
        `;
        account.innerHTML=html;

        linksLoggedIn.forEach(item => item.style.display ='block');
        linksLoggedOut.forEach(item =>item.style.display ='none');
    }else{
        //  All logout scenario
        adminitems.forEach(item => item.style.display="none");
        account.innerHTML='';
        linksLoggedIn.forEach(item =>item.style.display ='none');
        linksLoggedOut.forEach(item =>item.style.display ='block');
    }
}


const setupCoffee = (data) =>{
    
    let html = '';
        data.forEach(doc => {
            const coffee =doc.data();
            const li = `
                <li>
                    <div class="collapsible-header grey >${coffee.Price}</div>
                    <div class="collapsible-body white>${coffee.CoffeeName}</div>
                    <div class="collapsible-body white>${coffee.Description}</div>
                
                </li>
            `;
            
            html += li;
            
        });
        coffeeList.innerHTML= html;
    
};


document.addEventListener('DOMContentLoaded', (e) => {
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});