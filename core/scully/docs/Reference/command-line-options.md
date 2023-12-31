---
lang: en
position: 100
title: Command Line Options
---

# Command Line Options

From Version 2.0.3 on all CLI parameters can also be provided by an environment variable called `SCULLY` (all caps).

#### serve

```bash
npx scully serve
```

Starts the scully server. This process does not _build_ the project. It only serves the Angular build files, and the Scully static files.

#### watch

```bash
npx scully --watch
```

By default, Scully has the watchMode in false. You need to add this flag to use Watch Mode.

#### showBrowser

```bash
npx scully --showBrowser
```

Alias `--sb`. Chromium browser renders the application.

#### showGuessError

```bash
npx scully --showGuessError
```

Alias `--sge`. Displays Guess-Parse's errors in the console.

#### project

```bash
npx scully --project someName
```

Alias `--pr`. It is used to select a different project. Scully uses the default project from generated by the the Angular CLI.

#### configFile

```bash
npx scully --configFile someName
```

Alias `--cf`. Loads a different config file. If it is used at the same time as the `--project` flag, the project flag takes precedence.

#### baseFilter

```bash
npx scully --baseFilter="/someRoute*"
```

Alias `--bf`. Enables Scully to start rendering a specific routes. You can provide a wildcard string separated by ,(comma) to filter the unhandled routes.

#### proxyConfig

Alias `--proxy`. Takes a relative filename for a proxy config file.

For more details look at [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).

Scully uses the same config format as [webpackDevServer](https://webpack.js.org/configuration/dev-server/#devserverproxy).

#### removeStaticDist

```bash
npx scully --removeStaticDist
```

Alias `--RSD`. Removes the static folder generated by Scully from previous renders.

#### open

```bash
npx scully serve/watch --open
```

Alias `--o`. Opens the default browser and renders the dist folder generated by Scully.

#### scanRoutes

```bash
npx scully --scanRoutes
```

Alias `--sr` or `--scan`. Scans the application again to find unhandled routes. This is normally done just once. When routes in the application are added or changed, use this flag to discover all the new routes.

#### Build Statistics

```bash
npx scully --stats
```

Save the latest build statistics to a json file. Information includes the number of routes, as well as various times (all represented in seconds). The file is named `scullyStats.json`, and is overwritten with each build. Json file layout is as such:

```json
{
  "numberOfRoutes": 51,
  "generatingTime": 55.63,
  "routesPerSecond": 0.92,
  "findingRoutesAngular": 2.71838,
  "routeDiscovery": 0.00026,
  "renderingPages": 52.21755
}
```

#### ssl

```bash
npx scully serve/watch --ssl
```

Runs the Scully server with ssl.

#### ssl-cert

```bash
npx scully serve/watch --ssl --ssl-cert=./url/to/file
```

Adds a url to the ssl certificate file for a server with SSL.

#### ssl-key

```bash
npx scully serve/watch --ssl --ssl-key=./url/to/file
```

Adds a url to an ssl key file for a server with SSL.

#### tds

```bash
npx scully --tds
```

Launches the Test Data Server. This is only helpful for demos.

The following APIs are supported on the test data server:

| api            | returns                                                               |
| -------------- | --------------------------------------------------------------------- |
| `/users`       | A list of users                                                       |
| `/users/:id`   | Just one user by id                                                   |
| `/posts`       | A list of posts                                                       |
| `/posts/:id`   | A post by id                                                          |
| `/slow/:delay` | 200 code after a delay has gone by. Eg: `/slow/2000` takes 2 seconds. |

#### pluginsError

```bash
npx scully --pluginsError=false
```

Show the error from the plugin, but continue rendering.
If you do not use the flag (true by default) when you have an error in any plugin, Scully will exit.

#### logSeverity

Sets the log severity option. Defaults to 'warning'

```bash
npx scully --logSeverity=none
```

Available options:

| option    | result                                             |
| --------- | -------------------------------------------------- |
| `normal`  | Logs everything                                    |
| `warning` | Logs warnings and errors only                      |
| `error`   | Logs only errors                                   |
| `none`    | Logs nothing, no `scully.log` file will be created |

#### noLog

```bash
npx scully --noLog
```

Alias `--nl`. Don't log info lines to console. It will log warnings and errors only. default value of this flag is `false`

#### routeFilter

```bash
npx scully --routeFilter="*someRoute*,/otherRoute*"
```

Alias `--rf` or `--route-filter`. Provides a wildcard string separated by ,(comma) to filter the handled routes.

#### serverTimeout

```bash
npx scully --serverTimeout 30000
```

Alias `--st`. The time Scully will wait for the server before timeout (in milliseconds). Default server timeout is 10 seconds. On large projects the guess-parser sometimes needs more time, this way you can give it.

#### pjFirst

```bash
npx scully --pjFirst
```

Alias `--pjf` or `pj-first`. When you are in a mixed mono-repo you might need to use the `--pjFirst` flag, which will look for `package.json` first instead of `angular.json` to find the 'root' of the project.

#### pluginFolder

```bash
npx scully --pluginFolder="folderPath"
```

Alias `--pf` or `--plugin-folder`. Folder to look for custom config/plugins (will use the ts-config in there to compile). Default pluginFolder is `./scully`.

#### noPrompt

```bash
npx scully --noPrompt
```

Alias `--np` or `--no-prompt`. You can skip the future user input question with `--noPrompt` flag. This flag can be used for undetectable CI/CD.

#### disableProjectFolderCheck

```bash
npx scully --disableProjectFolderCheck
```

Disables checking if Scully was launched from the project folder. This allows installing Scully as a symlinked dependency such as when using [pnpm](https://pnpm.js.org/) or `npm link`. Use with caution as this may cause errors in certain environments.
