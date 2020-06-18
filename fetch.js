class FetchLibrary {
  // GET method
  get(url) {
    return fetch(url)
      .then(this.checkForErrors);
  }

  // POST method
  post(url, data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    return fetch(url, options)
      .then(this.checkForErrors);
  }

  // PUT method
  put(url, data) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    return fetch(url, options)
      .then(this.checkForErrors);
  }

  // DELETE method
  delete(url) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(url, options)
      .then(this.checkForErrors)
      .then(() => 'User deleted');
  }

  // check for errors
  async checkForErrors(res) {
    if (!res.ok) {
      const body = await res.json();
      throw {
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        body
      };
    } else {
      // this expression is needed because the API does not return a body for the DELETE method
      return res.headers.get('Content-Type')?.includes('application/json') ? res.json() : null;
    }
  }
}




// DOM stuff
const ul = document.getElementById('result');
const loading = document.getElementsByClassName('loading')[0];

// make GET request
document.getElementById('get').addEventListener('click', () => {
  const fetcher = new FetchLibrary();

  // loading
  loading.classList.add('lds-dual-ring');

  // fetch
  fetcher.get('https://reqres.in/api/users')
    .then(data => {
      // clear ul
      ul.innerHTML = '';
      // remove loading
      loading.classList.remove('lds-dual-ring');
      // update DOM
      data.data.forEach(user => {
        const li = document.createElement('li');
        li.innerText = `${user.first_name} ${user.last_name}`;
        ul.append(li);
      });
    })
    .catch(err => {
      // remove loading
      loading.classList.remove('lds-dual-ring');
      console.log(err);
    });
});

// make POST request
document.getElementById('post').addEventListener('click', () => {
  const fetcher = new FetchLibrary();

  // loading
  loading.classList.add('lds-dual-ring');

  // make data
  const data = {
    first_name: 'Peter',
    last_name: 'Pan'
  };

  // make request with data
  fetcher.post('https://reqres.in/api/users', data)
    .then(post => {
      // clear ul
      ul.innerHTML = '';
      // remove loading
      loading.classList.remove('lds-dual-ring');
      // update DOM
      const li = document.createElement('li');
      li.innerText = `${post.first_name} ${post.last_name}`;
      ul.append(li);
    })
    .catch(err => {
      // remove loading
      loading.classList.remove('lds-dual-ring');
      console.log(err);
    });
});

// make PUT request
document.getElementById('put').addEventListener('click', () => {
  const fetcher = new FetchLibrary();

  // loading
  loading.classList.add('lds-dual-ring');

  // make data
  const data = {
    first_name: 'Tinker',
    last_name: 'Bell'
  };

  // make request with data
  fetcher.put('https://reqres.in/api/users/1', data)
    .then(post => {
      // clear ul
      ul.innerHTML = '';
      // remove loading
      loading.classList.remove('lds-dual-ring');
      // update DOM
      const li = document.createElement('li');
      li.innerText = `${post.first_name} ${post.last_name}`;
      ul.append(li);
    })
    .catch(err => {
      // remove loading
      loading.classList.remove('lds-dual-ring');
      console.log(err);
    });
});

// make DELETE request
document.getElementById('delete').addEventListener('click', () => {
  const fetcher = new FetchLibrary();

  // loading
  loading.classList.add('lds-dual-ring');

  fetcher.delete('https://reqres.in/api/users/1')
    .then(response => {
      // clear ul
      ul.innerHTML = '';
      // remove loading
      loading.classList.remove('lds-dual-ring');
      // update DOM
      const li = document.createElement('li');
      li.innerText = response;
      ul.append(li);
    })
    .catch(err => {
      // remove loading
      loading.classList.remove('lds-dual-ring');
      console.log(err);
    });
});