package compression

import (
	"net/http"
)

type Compression string

const (
	GZIP    = "gzip"
	BROTLI  = "brotli"
	DEFLATE = "deflate"
	NONE    = "none"
)

func Check(domain string) (Compression, error) {
	req, err := http.NewRequest("GET", domain, nil)
	if err != nil {
		return NONE, err
	}
	req.Header.Set("Accept-Encoding", "gzip, deflate, br")
	req.Header.Set("accept-encoding", "gzip, deflate, br")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return NONE, err
	}

	compression := resp.Header.Get("content-encoding")
	defer resp.Body.Close()
	switch compression {
	case "gzip":
		return GZIP, err
	case "br":
		return BROTLI, err
	case "deflate":
		return DEFLATE, err
	default:
		return NONE, err
	}

}
