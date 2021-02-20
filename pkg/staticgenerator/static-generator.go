package staticgenerator

import (
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type Generator string //

const (
	HUGO      = "hugo"
	ELEVENTY  = "eleventy"
	JEKYLL    = "jekyll"
	GATSBY    = "gatsby"
	NEXT      = "next"
	NUXT      = "nuxt"
	WORDPRESS = "wordpress"
	HEXO      = "hexo"
	VUEPRESS  = "vuepress"
	WIX       = "wix"
	OTHER     = "other"
)

func Check(domain string) (Generator, error) {
	resp, err := http.Get(domain)
	if err != nil {
		return OTHER, err
	}
	doc, err := goquery.NewDocumentFromReader(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		return OTHER, err
	}
	if checkHugo(doc) {
		return HUGO, nil
	}
	if checkJekyll(doc) {
		return JEKYLL, nil
	}
	if checkNext(doc) {
		return NEXT, nil
	}
	if checkNuxt(doc) {
		return NUXT, nil
	}
	if checkWordpress(doc) {
		return WORDPRESS, nil
	}
	if checkEleventy(doc) {
		return ELEVENTY, nil
	}
	if checkWix(doc) {
		return WIX, nil
	}
	if checkHexo(doc) {
		return HEXO, nil
	}
	if checkVuePress(doc) {
		return VUEPRESS, nil
	}
	return OTHER, nil

}

func checkHugo(doc *goquery.Document) bool {
	selection := doc.Find("meta[name=\"generator\"]")
	for i := range selection.Nodes {
		single := selection.Get(i)
		for _, attr := range single.Attr {
			if attr.Key == "content" && strings.Contains(attr.Val, "Hugo") {
				return true
			}
		}

	}
	return false
}
func checkGatsby(doc *goquery.Document) bool {
	selection := doc.Find("meta[name=\"generator\"]")
	for i := range selection.Nodes {
		single := selection.Get(i)
		for _, attr := range single.Attr {
			if attr.Key == "content" && strings.Contains(attr.Val, "Gatsby") {
				return true
			}
		}

	}
	return false
}
func checkWix(doc *goquery.Document) bool {
	selection := doc.Find("meta[name=\"generator\"]")
	for i := range selection.Nodes {
		single := selection.Get(i)
		for _, attr := range single.Attr {
			if attr.Key == "content" && strings.Contains(attr.Val, "Wix.com ") {
				return true
			}
		}

	}
	return false
}

func checkNext(doc *goquery.Document) bool {
	selection := doc.Find("#__next")
	if selection.Size() > 0 {
		return true
	}

	return false
}

func checkNuxt(doc *goquery.Document) bool {
	selection := doc.Find("#__nuxt")
	if selection.Size() > 0 {
		return true
	}

	return false
}
func checkEleventy(doc *goquery.Document) bool {
	selection := doc.Find("meta[name=\"generator\"]")
	for i := range selection.Nodes {
		single := selection.Get(i)
		for _, attr := range single.Attr {
			if attr.Key == "content" && strings.Contains(attr.Val, "Hugo") {
				return true
			}
		}

	}
	return false
}
func checkJekyll(doc *goquery.Document) bool {
	selection := doc.Find("meta[name=\"generator\"]")
	for i := range selection.Nodes {
		single := selection.Get(i)
		for _, attr := range single.Attr {
			if attr.Key == "content" && strings.Contains(attr.Val, "Jekyll") {
				return true
			}
		}

	}
	return false
}

func checkWordpress(doc *goquery.Document) bool {
	selection := doc.Find("meta[name=\"generator\"]")
	for i := range selection.Nodes {
		single := selection.Get(i)
		for _, attr := range single.Attr {
			if attr.Key == "content" && strings.Contains(attr.Val, "WordPress") {
				return true
			}
		}

	}
	return false
}

func checkHexo(doc *goquery.Document) bool {
	selection := doc.Find("meta[name=\"generator\"]")
	for i := range selection.Nodes {
		single := selection.Get(i)
		for _, attr := range single.Attr {
			if attr.Key == "content" && strings.Contains(attr.Val, "Hexo") {
				return true
			}
		}

	}
	return false
}

func checkVuePress(doc *goquery.Document) bool {
	selection := doc.Find("meta[name=\"generator\"]")
	for i := range selection.Nodes {
		single := selection.Get(i)
		for _, attr := range single.Attr {
			if attr.Key == "content" && strings.Contains(attr.Val, "VuePress") {
				return true
			}
		}

	}
	return false
}
