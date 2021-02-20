package protocol

import (
	"net/http"
)

type Protocol string

const (
	HTTP1_1 Protocol = "http/1.1"
	HTTP2   Protocol = "http/2.0"
	HTTP3   Protocol = "http3"
	SPDY    Protocol = "spdy"
	QUIC    Protocol = "quic"
)

func Check(domain string) (Protocol, error) {

	client := http.Client{}
	req, err := http.NewRequest("GET", domain, nil)
	if err != nil {
		return "", nil
	}
	resp, err := client.Do(req)
	if err != nil {
		return "", nil
	}
	defer resp.Body.Close()

	return Protocol(resp.Proto), nil
}
