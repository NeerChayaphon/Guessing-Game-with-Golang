# Guessing Game

## How to run the service
Step 1: Clone the project
```
$ git clone https://github.com/NeerChayaphon/GuessingGame.git
```
Step 2: Navigate in to directory
```
$ cd GuessingGame
```
Step 3: Build the service
```
$ docker compose build
```
Step 4: Run the service
```
$ docker compose up -d
```

## How to stop the service
```
$ docker compose down
```

## Guessing game is running in the localhost
1. Frontend: http://localhost:3000
2. Backend: http://localhost:8080


## Frontend Route
1. Guessing page (Main page) : http://localhost:3000
2. Login page http://localhost:3000/login

** NOTE
** If user access the Guessing page without login to the website, the website will automatically redirect back to the login page.

## Backend Route
1. Login Route (POST): http://localhost:8080/login 
2. Guessing Route (GET): http://localhost:8080/guess?guessNumber= **Your number** 
3. Token authentication check (GET): http://localhost:8080/authCheck
4. Show answer (GET): http://localhost:8080/showAnswer (Use only in development process for testing)

** NOTE
** (2,3,4) Route need to have JWT token as a header field name Authorization, for example Authorization : Bearer ..Your token..

