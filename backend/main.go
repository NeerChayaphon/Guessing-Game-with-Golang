package main

import (
	"net/http"
	"os"

	"github.com/Guessing-Game-with-Golang/auth"
	"github.com/Guessing-Game-with-Golang/guess"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default() //route

	// setup cors
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"http://localhost:3000",
	}
	config.AllowHeaders = []string{
		"Origin",
		"Authorization",
		"TransactionID",
	}
	r.Use(cors.New(config))

	// Default route
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "API is running"})
	})

	// Login Route
	r.POST("/login", auth.AccessToken(os.Getenv("SIGNATURE")))

	// create protected route that required JWT token
	protected := r.Group("", auth.Protect([]byte(os.Getenv("SIGNATURE"))))

	protected.GET("/guess", guess.GuessNumber)                                  // Guess number route
	protected.GET("/authCheck", auth.AuthCheck([]byte(os.Getenv("SIGNATURE")))) // user authentication check
	protected.GET("/showAnswer", guess.ShowAnswer)                              // use for checking the answer in the development process

	r.Run() // run API at default port (8080)
}
