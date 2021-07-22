# Book Inventory Management (BIM)

This is demo app for book inventory management app.

# Running App
 In order to run this app BIM Backend server should be running 
 Update baseUrl of BIM backend in src.config.json file 

 ### Install Dependencies 
`npm install`

### Run Application locally
`npm start`


## heroku Deployment 
Navigate to project & execute below commands  

### For first time create heroku app 
 heroku create

use the <app-name> which has been created in above step for next steps 
### build docker image
docker build -t registry.heroku.com/`app-name`/web .

### push docker image
docker push registry.heroku.com/`app-name`/web

### release the app  
heroku container:release -a  `app-name` web