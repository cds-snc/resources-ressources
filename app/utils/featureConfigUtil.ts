interface IFeatureConfig {
  isEnabled: boolean
  options: object
}

class FeatureConfig implements IFeatureConfig {
  isEnabled: boolean = false
  options: object = {}

  constructor(isEnabled: boolean = false, options: object = {}) {
    this.isEnabled = isEnabled
    this.options = options
  }
}

export default class FeatureConfigUtil {
  // Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  static getFeatureConfig(envValue: any): IFeatureConfig | null {
    let featureConfig: IFeatureConfig = new FeatureConfig()

    if (typeof envValue === 'boolean') {
      featureConfig.isEnabled = envValue
    } else if (Number.isInteger(envValue)) {
      featureConfig.isEnabled = Boolean(envValue)
    } else if (envValue instanceof Object) {
      if (this.hasIsEnabledProperty(envValue))
        featureConfig.isEnabled = envValue.isEnabled

      if (this.hasOptionsProperty(envValue))
        featureConfig.options = envValue.options
    } else if (typeof envValue === 'string') {
      if (envValue.startsWith('{') && envValue.endsWith('}')) {
        featureConfig = this.convertToFeatureConfig(envValue)
      } else if (
        envValue.toLowerCase() === 'true' ||
        envValue.toLowerCase() === 'false'
      ) {
        featureConfig.isEnabled = envValue.toLowerCase() === 'true'
      } else {
        const parsedEnvValue = parseInt(envValue)

        if (!isNaN(parsedEnvValue))
          featureConfig.isEnabled = Boolean(parsedEnvValue)
      }
    }

    return featureConfig
  }

  // Private Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  private static convertToFeatureConfig(envValue: string): IFeatureConfig {
    const featureConfig = new FeatureConfig()

    try {
      const envValueObj = JSON.parse(envValue)

      if (this.hasIsEnabledProperty(envValueObj)) {
        featureConfig.isEnabled = envValueObj.isEnabled
      }

      if (this.hasOptionsProperty(envValueObj)) {
        featureConfig.options = envValueObj.options
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('ERROR: Parsing environment variable: ' + err.message)
      }
    }

    return featureConfig
  }

  private static hasIsEnabledProperty(config: Object): boolean {
    return Object.prototype.hasOwnProperty.call(config, 'isEnabled')
  }

  private static hasOptionsProperty(config: Object): boolean {
    return Object.prototype.hasOwnProperty.call(config, 'options')
  }
}
