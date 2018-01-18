/**
 * A trivial script to sync your data when the server doesn't work.
 *
 * Usage:
 * - clone this repo
 * - `cd node/app`
 * - `npm install`
 * - `cp cli-secrets.template.js cli-secrets.js`
 * - `vim cli-secrets.js`
 * - add your Kilometrikisa username+password, Strava userId (8 digits) and
 *   Strava app token (get one from https://www.strava.com/settings/api )
 * - `node cli.js`
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
