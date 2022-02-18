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

type MyCustomClaims struct {
	ID   string `json:"ID"`
	Name string `json:"Name"`
	jwt.StandardClaims
}

func AccessToken(signature string) gin.HandlerFunc {
	return func(c *gin.Context) {
		var userData user.User
		if err := c.ShouldBindJSON(&userData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		verifyUser := verifyLogin(userData)

		if verifyUser == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "Incorrect Username or Password",
			})
			return
		}

		token := createToken(*verifyUser)

		ss, err := token.SignedString([]byte(signature))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"token": ss,
		})
	}
}

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

func verifyLogin(userData user.User) *user.User {
	for _, v := range user.SampleUser {
		if v.Username == userData.Username && v.Password == userData.Password {
			return &v
		}
	}
	return nil
}

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
		c.JSON(http.StatusOK, gin.H{
			"isAuthorized": true,
			"UserData":     claims,
		})

	}
}

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
