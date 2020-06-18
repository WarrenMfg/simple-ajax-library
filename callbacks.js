// define XHRLibrary constructor
function XHRLibrary() {
  this.http = new XMLHttpRequest();
}

// define GET method
XHRLibrary.prototype.get = function(url, callback) {
  this.http.open('GET', url, true);

  this.http.onload = function() {
    if (this.status === 200) {
      callback(null, this.responseText);
    } else {
      callback(`Error: Cannot GET ${url}`);
    }
  };

  this.http.send();
};

// define POST method
XHRLibrary.prototype.post = function(url, data, callback) {
  this.http.open('POST', url, true);

  this.http.onload = function() {
    if (this.status === 201) {
      callback(null, this.responseText);
    } else {
      callback(`Error: Cannot POST ${url}`);
    }
  };

  this.http.setRequestHeader('Content-Type', 'application/json');
  this.http.send(JSON.stringify(data));
};

// define PUT method
XHRLibrary.prototype.put = function(url, data, callback) {
  this.http.open('PUT', url, true);

  this.http.onload = function() {
    if (this.status === 200) {
      callback(null, this.responseText);
    } else {
      callback(`Error: Cannot PUT ${url}`);
    }
  };

  this.http.setRequestHeader('Content-Type', 'application/json');
  this.http.send(JSON.stringify(data));
};

// define DELETE method
XHRLibrary.prototype.delete = function(url, callback) {
  this.http.open('DELETE', url, true);

  this.http.onload = function() {
    if (this.status === 204) {
      callback(null, 'User deleted');
    } else {
      callback(`Error: Cannot DELETE ${url}`);
    }
  };

  this.http.send();
};



// DOM stuff
const ul = document.getElementById('result');
const loading = document.getElementsByClassName('loading')[0];

// make GET request
document.getElementById('get').addEventListener('click', () => {
  const xhr = new XHRLibrary();

  // loading
  loading.classList.add('lds-dual-ring');

  xhr.get('https://reqres.in/api/users', function(err, response) {
    if (err) {
      console.error(err);

    } else {
      // clear ul
      ul.innerHTML = '';
      // remove loading
      loading.classList.remove('lds-dual-ring');
      // update DOM
      response = JSON.parse(response);
      response.data.forEach(user => {
        const li = document.createElement('li');
        li.innerText = `${user.first_name} ${user.last_name}`;
        ul.append(li);
      });
    }
  });
});

// make POST request
document.getElementById('post').addEventListener('click', () => {
  const xhr = new XHRLibrary();

  // loading
  loading.classList.add('lds-dual-ring');

  // make data
  const data = {
    first_name: 'Peter',
    last_name: 'Pan'
  };

  // make request with data
  xhr.post('https://reqres.in/api/users', data, function(err, post) {
    if (err) {
      console.error(err);

    } else {
      // clear ul
      ul.innerHTML = '';
      // remove loading
      loading.classList.remove('lds-dual-ring');
      // update DOM
      post = JSON.parse(post);
      const li = document.createElement('li');
      li.innerText = `${post.first_name} ${post.last_name}`;
      ul.append(li);
    }
  });
});

// make PUT request
document.getElementById('put').addEventListener('click', () => {
  const xhr = new XHRLibrary();

  // loading
  loading.classList.add('lds-dual-ring');

  // updated data
  const data = {
    first_name: 'Tinker',
    last_name: 'Bell'
  };

  // make request with data
  xhr.put('https://reqres.in/api/users/1', data, function(err, post) {
    if (err) {
      console.error(err);

    } else {
      // clear ul
      ul.innerHTML = '';
      // remove loading
      loading.classList.remove('lds-dual-ring');
      // update DOM
      post = JSON.parse(post);
      const li = document.createElement('li');
      li.innerText = `${post.first_name} ${post.last_name}`;
      ul.append(li);
    }
  });
});

// make DELETE request
document.getElementById('delete').addEventListener('click', () => {
  const xhr = new XHRLibrary();

  // loading
  loading.classList.add('lds-dual-ring');

  xhr.delete('https://reqres.in/api/users/1', function(err, response) {
    if (err) {
      console.error(err);

    } else {
      // clear ul
      ul.innerHTML = '';
      // remove loading
      loading.classList.remove('lds-dual-ring');
      // update DOM
      const li = document.createElement('li');
      li.innerText = response;
      ul.append(li);
    }
  });
});