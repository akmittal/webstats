package crawl

import (
	"fmt"
	"sync"
	"time"

	"github.com/akmittal/webstats/pkg/compression"
	"github.com/akmittal/webstats/pkg/image"
	"github.com/akmittal/webstats/pkg/ipversion"
	"github.com/akmittal/webstats/pkg/protocol"
	"github.com/akmittal/webstats/pkg/site"
	"github.com/akmittal/webstats/pkg/staticgenerator"
	"gorm.io/gorm"
)

type Crawl struct {
	gorm.Model
	StartDate time.Time   `json:"startDate"`
	Stats     []Stats     `gorm:"foreignKey:CrawlerRefer" json:"stats"`
	Sites     []site.Site `gorm:"foreignKey:CrawlerRefer" json:"sites"`
}

type Stats struct {
	gorm.Model   `json:"-"`
	CrawlerRefer uint                      `json:"-"`
	SiteRefer    uint                      `json:"-"`
	Site         site.Site                 `gorm:"foreignKey:SiteRefer" json:"site"`
	Compression  compression.Compression   `json:"compression"`
	IPVersion    ipversion.IPVersion       `json:"ip_version"`
	Protocol     protocol.Protocol         `json:"protocol"`
	SSG          staticgenerator.Generator `json:"ssg"`
	Images       []image.Image             `gorm:"foreignKey:StatRefer" json:"images"`
}

func RunCrawler(db *gorm.DB) {

	crawl := Crawl{StartDate: time.Now()}
	maxConnection := 20
	maxPool := make(chan struct{}, maxConnection)
	db.Create(&crawl)
	sites, _ := site.GetList()
	var wg sync.WaitGroup
	for s := range sites {

		wg.Add(1)
		maxPool <- struct{}{}
		go RunStats(s, crawl, db, &wg, maxPool)

	}
	wg.Wait()
}

func appendProtocol(domain string) string {
	return fmt.Sprintf("%v%v", "https://", domain)
}

func RunStats(site site.Site, crawl Crawl, db *gorm.DB, wg *sync.WaitGroup, maxPool chan struct{}) {
	defer wg.Done()
	site.CrawlerRefer = crawl.ID
	stat := Stats{Site: site, CrawlerRefer: crawl.ID}

	protocol, err := protocol.Check(appendProtocol(site.Domain))
	if err != nil {
		fmt.Println(err)
	}
	stat.Protocol = protocol
	version, err := ipversion.Check((site.Domain))
	if err != nil {
		fmt.Println(err)
	}
	stat.IPVersion = version
	ssg, err := staticgenerator.Check(appendProtocol(site.Domain))
	if err != nil {
		fmt.Println(err)
	}
	stat.SSG = ssg
	compression, _ := compression.Check(appendProtocol(site.Domain))
	stat.Compression = compression
	images, err := image.Check(appendProtocol(site.Domain))
	if err != nil {
		fmt.Println(err)
	}
	stat.Images = images
	db.Create(&stat)

	<-maxPool

}
