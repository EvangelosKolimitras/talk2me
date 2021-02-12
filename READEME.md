# TALK2ME <img src="./public/src/images/logo.png" />

Talk2me is a realtime chat application that implements websockets throught nodejs and socketio. Check it [here](https://thawing-brushlands-37031.herokuapp.com/).

<h2>Developed with </h2>
<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.5rem;">
<img src="https://www.onlogic.com/company/io-hub/wp-content/uploads/2013/07/socket-io-logo.jpg" width=100>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png" width=100 height=100>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width=100>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" width=100>
<img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width=100>
<img src="https://www.pngkit.com/png/detail/377-3771972_sass.png" width=100>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/600px-HTML5_Badge.svg.png" width=100>
</div>

<h2>Deployed with </h2>
<img src="https://seekvectorlogo.net/wp-content/uploads/2018/12/heroku-vector-logo.png" width=200 />

<h2>Also ships with <img src="https://quintagroup.com/cms/technology/Images/docker-compose-button.jpg" width=100 /></h2>

### Installation

```javascript
-	yarn install
-	yarn run dev
```

###### Run `yarn run start-c` to load the application inside a container (you then dont need a yarn run dev or yarn start)

###### Also you will need to start the Typescript compiler by runnning `tsc` in the root.

###### Sass compiler is also need in order to manipulate `.css` files.

###### Run sass compiler: (From root)

```javascript
-	yarn run sass:main
-	yarn run sass:chat
```

###### Spin up docker container

### The container exposes the app at port 9999 and in the container the server listen at port 3000

###### To execute run

```javascript
-	docker compose up 	// Listens on port 9999 or process.env.PORT
-	docker compose down // Closes the server
```

###### The container exposes the app at port ⚓ 3000. Head over to your browser at [localhost 3000](http://localhost:3000);

### LICENCE

###### Licensed under the [MIT License](LICENSE).
