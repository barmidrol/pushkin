package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"fmt"
	"io/ioutil"
	"encoding/json"
	"strings"
	"os"
	"strconv"
	"net/url"
	"regexp"
)

type Params struct {
	Level int
	Id int
	Question string
}

type Poem struct {
	Title string
	Text string
}

var poems []Poem
var token string

func level1(line string) string {
	for i := 0; i < len(poems); i++ {
		if strings.Contains(poems[i].Text, line) {
			return poems[i].Title
		}
	}
	return ""
}

func level2(line string) string {
	str := strings.Replace(line, "%WORD%", "([А-Яа-я]+)", 1)
	re := regexp.MustCompile(str)
	for i := 0; i < len(poems); i++ {
		matched, _ := regexp.MatchString(str, poems[i].Text)
		if matched {
			return re.FindStringSubmatch(poems[i].Text)[1]
		}
	}
	return ""
}

func level3(line string) string {
	str := strings.Replace(line, "%WORD%", "([А-Яа-я]+)", 2)
	re := regexp.MustCompile(str)
	for i := 0; i < len(poems); i++ {
		matched, _ := regexp.MatchString(str, poems[i].Text)
		if matched {
			words := re.FindAllStringSubmatch(poems[i].Text, 2)
			return words[0][1] + "," + words[0][2]
		}
	}
	return ""
}

func initial() {
	content, _ := ioutil.ReadFile("poems.json")
	json.Unmarshal(content, &poems)
	content, _ = ioutil.ReadFile("token.dat")
	token = string(content)
}

func main() {
	port := os.Getenv("PORT")
    router := gin.Default()
    uri := "http://pushkin.rubyroid.by/quiz"

    router.POST("/quiz", func(c *gin.Context) {
    	var params Params
    	var ans string
    	if c.BindJSON(&params) == nil {
    		fmt.Println(params.Question)
    		switch params.Level {
    		case 1: ans = level1(params.Question)
    		case 2: ans = level2(params.Question)
    		case 3: ans = level3(params.Question)
    		}
        }
        http.PostForm(uri,
        	url.Values {
        			"answer": { ans },
        			"token": { token },
        			"task_id": { strconv.Itoa(params.Id) },
        		})	
    })
    router.Run(":" + port) // listen and serve on 0.0.0.0:8080
}	