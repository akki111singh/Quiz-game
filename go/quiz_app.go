package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type Signup_person struct {
   ID uint `json:"id"`
   FirstName string `json:"Firstname"`
   LastName string `json:"Lastname"`
   Username string `json:"Username"`
   Password string `json:"password"`
}

type Login_person struct{
  Username string `json:"username"`
  Password string `json:"password"`
}
type Question struct{
  ID uint `json:"id"`
  Option1 string `json:"options"`
  Option2 string `json:"o2"`
  Option3 string `json:"o3"`
  Option4 string `json:"o4"`
  Correct string `json:"correct"`
  Name string `json:"name"`
  Genre string `json:"genres"`
  Quiz_name string `json:"quiz_name"`

}
type Quiz struct{
  ID uint `json:"id"`
  Genre string `json:"Genre"`
  Quiz_name string `json:"Quiz_name"`
  Ques []Question `json:"Questions"`
}
type get_quiz struct{

  ID uint `json:"id"`
  Genre string `json:"Genre"`
  Quiz_name string `json:"Quiz_name"`
}
type Quiz_table struct{
  ID uint `json:"id"`
  Option1 string `json:"options`
  Option2 string `json:"o2"`
  Option3 string `json:"o3"`
  Option4 string `json:"o4"`
  Correct string `json:"correct"`
  Name string `json:"name"`
  Genre string `json:"Genre"`
  Quiz_name string `json:"Quiz_name"`
}

type signup_response struct{
ERR int
}
func main() {
   db, err = gorm.Open("sqlite3", "./quiz_app.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.AutoMigrate(&Signup_person{})
   db.AutoMigrate(&Quiz_table{})
   r := gin.Default()
   r.POST("/Signupform/",Signup)
   r.POST("/Loginform/",Login)
   r.POST("/AdminLoginform/",Adminlogin)
   r.GET("/people/", GetPeople)
   r.DELETE("/people/:id", DeletePerson)
   r.POST("/createquiz/", Createquiz)
   r.GET("/fetchquizzes/", Getquiz)
   r.GET("/fetchquizzes/:id", Getquestions)
   r.DELETE("/deletequiz/:id", DeleteQuiz)

   r.Use((cors.Default()))
   r.Run(":8081")
}

func Signup(c *gin.Context) {
   var person Signup_person
   c.BindJSON(&person)
   if db.Table("signup_people").Where("Username = ?",person.Username).First(&person).RecordNotFound()==false{
     c.Header("access-control-allow-origin", "*")
     c.JSON(401,person)
   } else{
     c.Header("access-control-allow-origin", "*")
     db.Create(&person)
     c.JSON(200,person)
  }
}
func Createquiz(c *gin.Context) {
   var quiz Quiz
   c.BindJSON(&quiz)

   if db.HasTable(&Quiz{})!=true{
     db.CreateTable(&Quiz{})
   }

   if db.HasTable(&Question{})!=true{
      db.CreateTable(&Question{})
    }

    for i:= 0;i<len(quiz.Ques);i++{
      db.Create(&quiz.Ques[i]);
    }
     db.Table("quizzes").Create(&quiz)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200,quiz)
}
func Adminlogin(c *gin.Context) {
   var person Login_person
   person.Username="akhilsingh"
   person.Password="akhilsingh"
   c.BindJSON(&person)
   if db.Table("signup_people").Where("Password= ?",person.Password).Where("Username= ?",person.Username).First(&person).RecordNotFound()==false{
     c.Header("access-control-allow-origin", "*")
    c.JSON(200,person)
    }else{
      c.Header("access-control-allow-origin", "*")
      c.JSON(401,person)
  }
}

func Login(c *gin.Context) {
   var person Login_person
   c.BindJSON(&person)
   if db.Table("signup_people").Where("Password= ?",person.Password).Where("Username= ?",person.Username).First(&person).RecordNotFound()==false{
     c.Header("access-control-allow-origin", "*")
    c.JSON(200,person)
    }else{
      c.Header("access-control-allow-origin", "*")
      c.JSON(401,person)
  }
}
func GetPeople(c *gin.Context) {
   var people []Signup_person
   if err := db.Table("signup_people").Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, people)
   }
}
func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person []Signup_person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func Getquiz(c* gin.Context){
  var getq []get_quiz
  if err := db.Table("quizzes").Find(&getq).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, getq)
  }
}
func Getquestions(c *gin.Context) {
   var getq []Question
   var q get_quiz
   id := c.Params.ByName("id")
   d := db.Table("quizzes").Where("id = ?", id).Find(&q)
   fmt.Println(d)
   if err := db.Table("questions").Where("Genre = ?",q.Genre).Where("Quiz_name=?",q.Quiz_name).Find(&getq).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, getq)
}
func DeleteQuiz(c *gin.Context) {
   id := c.Params.ByName("id")
   var q []Question
   d := db.Table("questions").Where("id = ?", id).Delete(&q)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
