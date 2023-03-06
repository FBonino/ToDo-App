package configs

import (
	"github.com/spf13/viper"
)

type Config struct {
	DB     string `mapstructure:"DB"`
	Port   string `mapstructure:"PORT"`
	Client string `mapstructure:"CLIENT"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigType("env")
	viper.SetConfigName("local")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}
