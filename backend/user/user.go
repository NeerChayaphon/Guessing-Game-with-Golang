package user

type User struct {
	ID       string `json:"ID"`
	Username string `json:"Username"`
	Password string `json:"Password"`
	Name     string `json:"Name"`
}

var SampleUser = []User{
	{ID: "1", Username: "testuser", Password: "testuser", Name: "Test User"},
	{ID: "2", Username: "chayaphon", Password: "testchayaphon", Name: "Chayaphon Bunyakan"},
}
