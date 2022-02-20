package auth

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/Guessing-Game-with-Golang/user"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// Custom JWT claims for creating token
type MyCustomClaims struct {
	ID   string `json:"ID"`
	Name string `json:"Name"`
	jwt.StandardClaims
}

// AccessToken -- Handler that is use for login and create token
func AccessToken(signature string) gin.HandlerFunc {
	return func(c *gin.Context) {
		var userData user.User //user struct

		// bind user struct with JSON
		if err := c.ShouldBindJSON(&userData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		verifyUser := verifyLogin(userData) // check for correct username and password

		if verifyUser == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "Incorrect Username or Password",
			})
			return
		}

		token := createToken(*verifyUser) // create token

		ss, err := token.SignedString([]byte(signature)) // add jwt signature
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		// return token
		c.JSON(http.StatusOK, gin.H{
			"token": ss,
		})
	}
}

// createToken -- use for creating token
func createToken(verifyUser user.User) *jwt.Token {
	// Create the Claims
	claims := MyCustomClaims{
		verifyUser.ID,
		verifyUser.Name,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token
}

// verifyLogin -- check for user in the system and their username and password.
func verifyLogin(userData user.User) *user.User {
	for _, v := range user.SampleUser {
		if v.Username == userData.Username && v.Password == userData.Password {
			return &v
		}
	}
	return nil
}

// AuthCheck -- Handler that use to validate the token and return claims such as user data
func AuthCheck(signature []byte) gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.Request.Header.Get("Authorization")
		tokenString := strings.TrimPrefix(auth, "Bearer ")

		claims, err := ParseJWT(tokenString, signature)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message":      "Missing or Invalid Token",
				"isAuthorized": false,
			})
			return
		}

		// return claims and status
		c.JSON(http.StatusOK, gin.H{
			"isAuthorized": true,
			"UserData":     claims,
		})

	}
}

// ParseJWT -- function to decode JWT token and return the claims of the token
func ParseJWT(token string, signature []byte) (jwt.MapClaims, error) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return signature, nil
	})
	return claims, err
}
