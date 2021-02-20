package cmd

import (
	"github.com/akmittal/webstats/pkg/application"
	"github.com/spf13/cobra"
)

var (
	// Used for flags.

	crawlCmd = &cobra.Command{
		Use:   "crawl",
		Short: "A generator for Cobra based Applications",
		Long: `
		`,
		Run: func(cmd *cobra.Command, args []string) {
			app, _ := application.Get()
			app.RunCrawler()
		},
	}
)
