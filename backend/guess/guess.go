package guess

import (
	"math/rand"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// random a number from 1-100
var (
	min          = 1
	max          = 100
	randomNumber = rand.Intn(max-min) + min
)

// GuessNumber -- use for guessing a number and return result
func GuessNumber(c *gin.Context) {
	guessNumber, err := strconv.Atoi(c.Query("guessNumber")) // get the number from user
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Incorrect parameter",
		})
		return
	}

	HTTPstatus := 201
	message := "Correct"
	status := true

	// Validate number then set HTTPstatus, message and status of the game
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

// ShowAnswer -- use to show the correct answer
// (** use only in development process for testing perpose)
func ShowAnswer(c *gin.Context) {
	c.JSON(200, gin.H{
		"Answer": randomNumber,
	})
}
