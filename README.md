# Food - up 
A social networking website for foodies!

## Tech used
- Node js hosted on heroku: [link](https://safe-peak-95942.herokuapp.com/)
- Cloud Firestore DB used from firebase-admin. 

## Road Map
First a simple prototype is to be made which has the following simple capabilities
- A *user* collection with includes fields like photos, likes, follows etc
- A customised feed for every user based on pages followed
- Image upload
- User auth

## Setup
- You need NodeJS installed
- Clone the repository
- run ``` npm install ``` in the home directory
- to test locally, run ``` node app.js ``` and view the site on localhost:3000
- to test the database, make your own Cloud Firestore database and download the service account key in the node_modules folder with the name key.json. See *Initialize on your own server* sub heading under the NodeJS section of *Initialize Cloud Firestore* for more information.
