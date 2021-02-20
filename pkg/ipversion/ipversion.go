package ipversion

import (
	"net"
)

type IPVersion string

const (
	IPv4  = "ipv4"
	IPv6  = "ipv6"
	OTHER = "other"
)

func Check(domain string) (IPVersion, error) {
	ips, err := net.LookupIP(domain)
	if err != nil {
		// fmt.Fprintf(os.Stderr, "Could not get IPs: %v\n", err)
		return OTHER, err
	}
	for _, ip := range ips {
		if ip.To4() != nil {
			return IPv6, nil
		}
	}
	return IPv4, nil

}
