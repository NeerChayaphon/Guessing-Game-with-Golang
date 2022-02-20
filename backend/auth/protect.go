package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// Protect -- Middleware for JWT Authorization use with gin handler
func Protect(signature []byte) gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.Request.Header.Get("Authorization") // get token
		tokenString := strings.TrimPrefix(auth, "Bearer ")

		_, err := ParseJWT(tokenString, signature) //Decode Token

		// if token is incorrect
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "Missing or Invalid Token",
			})
			return
		}

		c.Next() // if it's success, continue
	}
}
