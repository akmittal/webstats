package cmd

import (
	"log"

	"github.com/akmittal/webstats/pkg/application"
	"github.com/spf13/cobra"
)

var (
	// Used for flags.

	serverCmd = &cobra.Command{
		Use:   "server",
		Short: "A generator for Cobra based Applications",
		Long:  ``,
		Run: func(cmd *cobra.Command, args []string) {

			app, err := application.Get()
			if err != nil {
				log.Fatal(err.Error())
			}
			app.Start()

			if err != nil {
				log.Fatal(err.Error())
			}

		},
	}
)

func init() {

}
