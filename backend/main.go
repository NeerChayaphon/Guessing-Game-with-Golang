package main

import (
	"os"

	"github.com/Guessing-Game-with-Golang/auth"
	"github.com/Guessing-Game-with-Golang/guess"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

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

	r.POST("/login", auth.AccessToken(os.Getenv("SIGNATURE")))

	protected := r.Group("", auth.Protect([]byte(os.Getenv("SIGNATURE"))))

	protected.GET("/guess", guess.GuessNumber)
	protected.GET("/authCheck", auth.AuthCheck([]byte(os.Getenv("SIGNATURE"))))
	protected.GET("/showAnswer", guess.ShowAnswer) // use for checking the answer in the development process

	r.Run()
}
