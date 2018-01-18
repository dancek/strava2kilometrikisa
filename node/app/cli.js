/**
 * A trivial script to sync your data without a server.
 */

const Kilometrikisa = require("./lib/kilometrikisa")
const SyncModel = require("./models/SyncModel")
const secrets = require("./cli-secrets")

function main(kmUser, kmPass, stravaUser, stravaToken) {
  Kilometrikisa.login(
    kmUser,
    kmPass,
    (kmToken, kmSession) => {
      SyncModel.doSync(
        stravaUser,
        stravaToken,
        kmToken,
        kmSession,
        activities => {
          console.log(
            "Activities synced successfully!\n" +
              JSON.stringify(activities, null, 2)
          )
        },
        error => {
          console.error("Sync failed!\n" + error)
        }
      )
    },
    error => console.error(error)
  )
}

main(
  secrets.kilometrikisa.user,
  secrets.kilometrikisa.password,
  secrets.strava.user,
  secrets.strava.token
)
