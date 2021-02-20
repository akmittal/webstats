package image

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"gorm.io/gorm"
)

type Image struct {
	gorm.Model
	URL       string      `json:"url"`
	Type      IMAGEFormat `json:"type"`
	Size      int         `json:"size"`
	StatRefer uint        `json:"-"`
}

type IMAGEFormat string

const (
	PNG   = "png"
	JPEG  = "jpeg"
	GIF   = "gif"
	SVG   = "svg"
	WEBP  = "webp"
	AVIF  = "avif"
	OTHER = "other"
)

func Check(domain string) ([]Image, error) {
	domain = url.PathEscape(domain)
	url := fmt.Sprintf("%v%v", "http://localhost:4000/", domain)

	res, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	var data []Image
	json.NewDecoder(res.Body).Decode(&data)
	// fmt.Println(data, err)
	return data, nil

}
