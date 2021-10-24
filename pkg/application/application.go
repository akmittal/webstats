package application

import (
	"encoding/json"

	"log"
	"net/http"

	"github.com/akmittal/webstats/pkg/config"
	"github.com/akmittal/webstats/pkg/crawl"
	"github.com/akmittal/webstats/pkg/db"
	"github.com/akmittal/webstats/pkg/image"
	"github.com/akmittal/webstats/pkg/site"
	"github.com/go-chi/chi"
	"github.com/joho/godotenv"

	"github.com/akmittal/webstats/pkg/router"
	"github.com/akmittal/webstats/pkg/server"
)

type Application struct {
	DB     *db.DB
	Cfg    *config.Config
	Router *router.Router
	Server *server.Server
}

func Get() (*Application, error) {
	if err := godotenv.Load(); err != nil {
		log.Println("failed to load env vars")
	}
	cfg := config.Get()
	db, err := db.Get(cfg.GetDBConnStr())

	if err != nil {
		return nil, err
	}
	router, err := router.Get()
	server := server.Get(cfg.GetAppHost(), router)
	db.Client.AutoMigrate(&crawl.Stats{}, &crawl.Crawl{}, &site.Site{}, &image.Image{})

	return &Application{
		DB:     db,
		Cfg:    cfg,
		Router: router,
		Server: server,
	}, nil
}

func (a *Application) Start() error {
	a.RegisterRoutes()
	return a.Server.Start()

}
func (a *Application) RunCrawler() {

	crawl.RunCrawler(a.DB.Client)

}

func (a *Application) RegisterRoutes() {

	// a.Router.Get("/api/public", user.UserController())
	a.Router.Get("/api", func(rw http.ResponseWriter, r *http.Request) {
		var MaxID uint
		a.DB.Client.Select("MAX(id)").Table("crawls").First(&MaxID)
		var stats []crawl.Stats
		a.DB.Client.Preload("Site").Preload("Images").Model(&crawl.Stats{}).Where(&crawl.Stats{CrawlerRefer: MaxID}).Find(&stats)

		json.NewEncoder(rw).Encode(stats)
	})
	a.Router.Get("/api/stats/{type}", func(rw http.ResponseWriter, r *http.Request) {
		paramaType := chi.URLParam(r, "type")

		var MaxID uint
		a.DB.Client.Model(crawl.Crawl{}).Select("MAX(id)").First(&MaxID)
		var stats []struct {
			Total int
			Name  string
		}
		if paramaType == "images" {
			a.DB.Client.Model(&crawl.Stats{}).Select(" images.type as name", "count(*) as total").Where("images.type <> ''").Joins("inner join images on images.stat_refer=stats.id").Group("images.type").Find(&stats)
		} else if paramaType == "ssg" {
			a.DB.Client.Model(&crawl.Stats{}).Select(paramaType+" as name", "count(*) as total").Where(paramaType + " <> ''").Where(paramaType + " <> 'other'").Group(paramaType).Find(&stats)
		} else {
			a.DB.Client.Model(&crawl.Stats{}).Select(paramaType+" as name", "count(*) as total").Where(paramaType + " <> ''").Group(paramaType).Find(&stats)
		}

		json.NewEncoder(rw).Encode(stats)
	})

}
