"use strict";

// fetch("data.json").then(response => response.json()).then(data => {alert(data)})

// Fetch the JSON data from the file
fetch('./aaa.json')
  .then(response => response.json())
  .then(data => {
    // Display the parsed data
    alert(data.size); // Accessing a property of the parsed object
  })
  .catch(error => console.error('Error fetching the JSON data:', error));


/*
Setting up a local server using `http-server` is a straightforward process. Here’s a step-by-step guide to help you get started:

### Step 1: Install Node.js
First, you need to have Node.js installed on your machine. If you haven't installed it yet, you can download it from the [official Node.js website](https://nodejs.org).

### Step 2: Install `http-server`
Once Node.js is installed, you can install `http-server` globally using npm (Node Package Manager). Open your terminal or command prompt and run the following command:

```sh
npm install -g http-server
```

This command installs `http-server` globally, allowing you to run it from any directory.

### Step 3: Start the Server
Navigate to the directory where your project files are located. For example, if your project is in `E:/coding/ht/product-list-with-cart`, you would navigate to that directory in your terminal:

```sh
cd E:/coding/ht/product-list-with-cart
```

Then, start the server by running:

```sh
http-server
```

By default, `http-server` will start on port 8080. You can specify a different port if needed:

```sh
http-server -p 8000
```

### Step 4: Access Your Local Server
Open your web browser and go to `http://localhost:8080` (or the port you specified). You should see your project files being served.

### Example Project Structure
Your project directory should look something like this:

```
/your-project-directory
  ├── index.html
  ├── script.js
  └── aaa.json
```

### Example HTML and JavaScript
Here’s a simple example to display JSON data in your HTML file:

**index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display JSON Data</title>
</head>
<body>
    <ul id="json-list"></ul>
    <script src="script.js"></script>
</body>
</html>
```

**script.js**:
```javascript
fetch('aaa.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('json-list');
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${data[key]}`;
        list.appendChild(listItem);
      }
    }
  })
  .catch(error => console.error('Error fetching the JSON data:', error));
```

By following these steps, you should be able to set up a local server and display your JSON data in your HTML file. If you encounter any issues or need further assistance, feel free to ask!

Source: Conversation with Copilot, 9/15/2024
(1) How to Set Up a Local HTTP Server (Node.js). https://www.youtube.com/watch?v=vnPemSnnJYY.
(2) How to Setup localhost Server in Windows 10 Create Local Host Server IIS Server Windows 10. https://www.youtube.com/watch?v=gpSK0CbSu2g.
(3) Setup a Local Server in Windows | How to Install phpMyAdmin, PHP, and MySQL. https://www.youtube.com/watch?v=P3LvQRgWx0Y.
(4) Using Apache HTTP Server on Microsoft Windows. https://httpd.apache.org/docs/current/platform/windows.html.
(5) http-server - npm. https://www.npmjs.com/package/http-server.
(6) NodeJS - Setup a Simple HTTP Server / Local Web Server. https://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server.
(7) How to Install Apache Web Server on Windows — SitePoint. https://www.sitepoint.com/how-to-install-apache-on-windows/.
(8) undefined. http://someurl.com.
(9) undefined. https://nodejs.org.
(10) How to set up a local http-server | Setup Web Server in 3 Minutes with http-server Module. https://www.youtube.com/watch?v=cZ_-ZYR2ChY.
(11) Setup a Local Web Server on Windows, macOS, and Linux - Make Tech Easier. https://www.maketecheasier.com/setup-local-web-server-all-platforms/.
(12) How to Install and Configure Apache to Host a Site on Windows - wikiHow. https://www.wikihow.com/Install-and-Configure-Apache-Webserver-to-Host-a-Website-from-Your-Computer.
(13) undefined. https://www.apachehaus.com/cgi-bin/download.plx.
(14) github.com. https://github.com/henriquegmendes/url-shortener-alfred/tree/bb8fda4cedbf8bee33efa5830fece6ad80841440/documentation%2Fredirect-to-url.md.
*/