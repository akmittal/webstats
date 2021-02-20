package site

import (
	"encoding/csv"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"gorm.io/gorm"
)

type Site struct {
	gorm.Model
	Domain       string `json:"domain"`
	Rank         int    `json:"rank"`
	TLD          string `json:"tld"`
	CrawlerRefer uint   `json:"-"`
}

func GetList() (chan Site, error) {
	var result = make(chan Site, 20)
	data, err := getFile()
	if err != nil {
		return nil, err
	}
	r := csv.NewReader(data)

	r.Read()
	go pushChanges(&result, r, data)

	return result, nil
}
func pushChanges(result *chan Site, r *csv.Reader, data io.ReadCloser) {
	for {
		// fmt.Println("psuhing")
		record, err := r.Read()
		fmt.Println(record)
		if err == io.EOF {
			close(*result)
			data.Close()
			break
		}
		if err != nil {
			fmt.Println(err)
			continue
		}
		rank, _ := strconv.Atoi(record[0])
		var s = Site{
			Domain: record[2],
			Rank:   rank,
			TLD:    record[3],
		}
		*result <- s
	}
}

func getFile() (io.ReadCloser, error) {
	resp, err := http.Get("http://downloads.majestic.com/majestic_million.csv")
	if err != nil {
		return nil, err
	}

	return resp.Body, err
}
