# Directory submission

Prepared on 2026-11-25 for Graphify plugin 0.1.2. This is the completed copy for the form at https://claude.ai/directory/manage. It is not an approval and not a public listing. Do not submit until Fahad says to submit.

Submit a plugin bundle only. Graphify already has a live Claude connector at https://claude.com/marketplace/connectors/graphify. Do not open a second connector submission.

## Source

| Field | Final answer |
| --- | --- |
| What would you like to submit? | Plugin bundle |
| Repository | `https://github.com/Graphify-Labs/graphify-claude-plugin` |
| Plugin path | Leave empty. `.claude-plugin/plugin.json` is at the repository root |
| Branch or tag | Leave empty until this work is on the default branch, so the directory follows `main`. Do not point the directory at `claude-plugin-setup` once `main` is the branch you want it to keep reading |
| Validate | Run Validate in the portal on the commit you will submit, fix every blocking finding, and validate again. A validation result applies to one commit |

## Listing details

The portal reads the public listing from `plugin.json` and `README.md`. Do not type a different description into the form. To change a field, edit those files and validate again.

| Field | Final answer | Where it lives |
| --- | --- | --- |
| Name | `graphify` | `plugin.json` `name`. Permanent. Do not rename after people install it |
| Display name | Graphify | `plugin.json` `displayName` |
| Short description | Search indexed code, trace dependencies, assess change impact, and retrieve repository memory through Graphify's authenticated MCP server. | `plugin.json` `description` |
| Long description | The repository README | `README.md`. The directory shows this as the listing description. It is already more than 40 words |
| Version | `0.1.2` | `plugin.json` `version`. Raise it on every later release |
| Author | Graphify Labs | `plugin.json` `author.name` |
| Author email | safi@graphify.com | `plugin.json` `author.email`. Same address as the live Claude connector listing |
| Homepage | https://graphify.com | `plugin.json` `homepage` |
| Repository | https://github.com/Graphify-Labs/graphify-claude-plugin | `plugin.json` `repository` |
| License | Apache-2.0 | `plugin.json` `license` and the root `LICENSE` file |
| Keywords | graphify, mcp, code search, codebase context, dependencies, symbols | `plugin.json` `keywords` |
| Category | Developer tools, if the plugin form asks for a category. This matches the live Graphify connector listing. The Claude Code marketplace entry uses the official catalog slug `development` | Marketplace entry `category` is `development` |
| Documentation URL | https://docs.graphify.com/integrations/claude-code | `plugin.json` `documentationUrl` |
| Support contact | safi@graphify.com | Use this on the form. `plugin.json` `supportUrl` is https://graphify.com/contact |
| Privacy URL | https://graphify.com/privacy | `plugin.json` `privacyPolicyUrl` |
| Terms URL | https://graphify.com/terms | `plugin.json` `termsOfServiceUrl` |
| Logo | `plugins/graphify/assets/logo.png` | `plugin.json` `icon` is `./assets/logo.png`. PNG, 400 by 400, the same file as the Cursor plugin logo |

## Data handling

| Question | Final answer |
| --- | --- |
| Does the plugin read or store personal data? | The plugin files do not collect data. Queries and repository identifiers are sent to `https://api.graphify.com/mcp` for the signed in account. `remember` can store a note in that Graphify workspace. When trail capture is enabled, some search tools may save query context as repository memory |
| Does it send data to services other than its declared connectors? | No. The only server this plugin declares is `https://api.graphify.com/mcp`. Processing by Graphify's subprocessors is described in the privacy policy |
| How long does it keep data? | The plugin itself does not store data. Queries go to Graphify's hosted MCP server. Account information is kept while the account is active. Ingested content is kept until the user deletes it or closes the account, then is deleted from active systems within 30 days and from backups within 7 days after that. Operational logs and usage telemetry are kept for up to 12 months. Self-hosted retention is controlled by the customer's own infrastructure. This follows the Data retention section of https://graphify.com/privacy (last updated November 2026): "We keep account information while your account is active and as needed to provide the service. Content you ingest is retained until you delete it or close your account. After that, it is deleted from active systems, usually within a few days and always within 30 days, and removed from backups within 7 days after that. Operational logs and usage telemetry are kept for up to 12 months. On self-hosted deployments, retention is governed entirely by your own infrastructure." |
| Is it intended for people under 18? | Yes. People under 18 are allowed to use Graphify. (Fahad, 25 Nov 2026: "Under 18 is allowed.") |

## Compliance

| Field | Final answer |
| --- | --- |
| Contact email | safi@graphify.com, the address where Anthropic can reach Graphify about the submission |
| Acknowledgements | Select all four acknowledgements shown on the compliance step. Only the person submitting in the portal can tick them |

## Review and submit

| Field | Final answer |
| --- | --- |
| How new versions reach the directory | GitHub push webhook, which needs admin on the repository. The directory also checks the tracked branch or tag on a schedule. New versions ship by raising the version in plugin.json and pushing to the tracked GitHub branch. The directory picks up the commit through the webhook and the scheduled check, then scans and publishes it. Installed copies see the new version once it is published |
| Auto publish | Off for this first listing. That is Anthropic's default, so a reviewer publishes the first version. After the first version is live, later passing versions can be auto published if you want that switched on |

## Install names

Marketplace name in `.claude-plugin/marketplace.json` is `graphify`. After the marketplace is added from this repository, the install id is `graphify@graphify`.

```
/plugin marketplace add Graphify-Labs/graphify-claude-plugin
/plugin install graphify@graphify
```

## Commands and hooks

No extra slash command and no hook is included. The skill at `skills/graphify/SKILL.md` is also invocable as `/graphify:graphify`, and the remote server supplies the tools.

## MCP connector

Do not submit a second connector. The Graphify connector is already live at https://claude.com/marketplace/connectors/graphify. After the plugin is listed, the two listings can be paired if they were submitted from the same organization.

## Local checks

See the pull request for the latest validator results. Do not describe an interactive sign in as complete until someone finishes it in a browser.
