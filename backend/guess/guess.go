package guess

import (
	"math/rand"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

var (
	min          = 1
	max          = 100
	randomNumber = rand.Intn(max-min) + min
)

func GuessNumber(c *gin.Context) {
	guessNumber, err := strconv.Atoi(c.Query("guessNumber"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Incorrect parameter",
		})
		return
	}

	HTTPstatus := 201
	message := "Correct"
	status := true

	if guessNumber == randomNumber {
		rand.Seed(time.Now().UnixNano())
		randomNumber = rand.Intn(max-min) + min
	} else if guessNumber > randomNumber {
		HTTPstatus = 202
		status = false
		message = "Your guess is too high"

	} else {
		HTTPstatus = 202
		status = false
		message = "Your guess is too low"
	}

	c.JSON(HTTPstatus, gin.H{
		"status":  status,
		"message": message,
	})

}

func ShowAnswer(c *gin.Context) {
	c.JSON(200, gin.H{
		"Answer": randomNumber,
	})
}
