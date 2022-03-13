export async function checkAuth(username, token)  {
        let myJson = {};
        myJson.username = username;
        myJson.token = token;
        let data = {};
    
        await (async () => {
        const rawResponse = await fetch( '/api/v1/user/auth', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(myJson)
        });
        data = await rawResponse.json();
        })();
    
        return data;
    }

    export async function signUpUser(username, password, token)  {
        let myJson = {};
        myJson.username = username;
        myJson.password = password;
        myJson.token = token;
        let data = {};
    
        await (async () => {
        const rawResponse = await fetch( '/api/v1/user/add', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(myJson)
        });
        data = await rawResponse.json();
        })();
    
        return data;
    }

    export async function checkLogin(username, password) {
        let myJson = {};
        myJson.username = username;
        myJson.password = password;
        let data = {};
      
        await (async () => {
          const rawResponse = await fetch('/api/v1/user/login', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(myJson)
          });
          data = await rawResponse.json();
        })();
      
        //console.log(data);
      
        return data;
      }

    export async function logOut(username, token) {
        let myJson = {};
        myJson.username = username;
        myJson.token = token;
        let data = {};
    
        await (async () => {
        const rawResponse = await fetch('/api/v1/user/logout', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(myJson)
        });
        data = await rawResponse.json();
        })();
    
        //console.log(data);
    
        return data;
    }
  
    // loads the date object from the savedDate cookie
    // returns the date as a string or null if it does not exist
    // can be converted back to date with new Date(dateString)
    export function getCookieData() {
        const cookieObj = Object.fromEntries(
        document.cookie.split("; ").map(c => {
            const [key, ...v] = c.split("=");
            return [key, v.join("=")];
        })
        );
        return cookieObj || [];
    }