#태국 슬랙
module.exports = ()->
  method = {}

  method.webhookToken = "P8GnA43jssAXRfnYvSSmK3TC"
  method.token = "4KY9DDVfTc5YKfc54KlKtgSf"
  method.parse_app_id = 'h8yTR0fZZvHmLsQTw5W9vaCHEZTqo4ixFMIR8WCm'
  method.parse_app_key = 'FtLLRlTm7WsL1h81fhtFA2rw90ZTb3yiOJzkmW0s'
  method.domain = "aropayello"
  method.bot_name = "YelloBot"
  method.auto_msg =
    wait: 'Welcome to Concierge! Please allow us a few seconds to connect you to our concierge master.'
    timeout: 'Currently, we are operating from 8AM to 2AM. But don\'t worry! Your message was delivered to concierge masters. We will contact you tomorrow again. Thank you!'

  return method