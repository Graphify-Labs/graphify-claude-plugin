# Directory submission

Prepared on 2026-11-16 for Graphify plugin 0.1.0. This is copy for the form at https://claude.ai/directory/manage. It is not an approval and not a public listing.

Submit a plugin bundle for this repository after the plugin files are on the branch the directory should follow. The plugin root is the repository root, so leave the plugin path empty.

The directory docs also describe a separate MCP connector submission for a remote server you operate. That form is a different choice on the same portal. It is listed at the end as its own TODO. This file does not submit either form.

## Source

| Field | Proposed value |
| --- | --- |
| What to submit | Plugin bundle |
| Repository | `https://github.com/Graphify-Labs/graphify-claude-plugin` |
| Plugin path | empty. `.claude-plugin/plugin.json` is at the repository root |
| Branch or tag | TODO Fahad. Leave empty to follow the default branch once this work is on that branch. Do not point the directory at a branch you do not want it to keep reading |

Validate in the portal, fix every blocking finding, and validate again on the commit you will submit. A validation result applies to one commit.

## Listing details

The portal reads the public listing from `plugin.json` and `README.md`. Change those files rather than typing a different description into the form.

| Field | Proposed value | Where it lives |
| --- | --- | --- |
| Name | `graphify` | `plugin.json` `name`. Permanent. Do not rename after people install it |
| Display name | Graphify | `plugin.json` `displayName` |
| Short description | Query the code knowledge graph of repositories you have indexed with Graphify. | `plugin.json` `description` |
| Version | `0.1.0` | `plugin.json` `version`. Raise it on every later release |
| Author | Graphify Labs | `plugin.json` `author.name` |
| Author email | founders@graphify.com | TODO Fahad. This is the public contact already used for Graphify. Replace it in `plugin.json` if support should go somewhere else |
| Homepage | https://graphify.com | `plugin.json` `homepage` |
| Repository | https://github.com/Graphify-Labs/graphify-claude-plugin | `plugin.json` `repository` |
| License | Apache-2.0 | `plugin.json` `license` and the root `LICENSE` file |
| Keywords | graphify, code knowledge graph, code search, dependencies, symbols | `plugin.json` `keywords` |
| Category | Developer tools | TODO Fahad. Set on the marketplace entry as free text. Use this only if the plugin form asks for a category. The connector form asks for one to five categories |
| Documentation URL | https://graphify.com | `plugin.json` `documentationUrl`. TODO Fahad if the product docs at https://docs.graphify.com should be the listing link instead |
| Support contact | https://graphify.com/contact and founders@graphify.com | `plugin.json` `supportUrl` is the https contact page. TODO Fahad confirm the inbox on the compliance step |
| Privacy URL | https://graphify.com/privacy | `plugin.json` `privacyPolicyUrl` |
| Terms URL | https://graphify.com/terms | `plugin.json` `termsOfServiceUrl` |
| Logo | `assets/logo.png` | `plugin.json` `icon` is `./assets/logo.png`. PNG, 400 by 400. TODO Fahad confirm this is the mark the directory should show |

Longer listing copy is the repository README. Keep product language as Graphify, a code knowledge graph.

## Data handling

Answer these from the privacy policy. Do not invent a retention period.

| Question | Proposed answer |
| --- | --- |
| Does the plugin read or store personal data? | The plugin files do not collect data. Queries and repository identifiers are sent to `https://api.graphify.com/mcp` for the signed in account. `remember` can store a note in that Graphify workspace. TODO Fahad: match the portal's yes or no to https://graphify.com/privacy |
| Does it send data to services other than its declared connectors? | The only server this plugin declares is `https://api.graphify.com/mcp`. TODO Fahad: confirm how the portal wants Graphify's own subprocessors described. The privacy policy is the source |
| How long does it keep data? | TODO Fahad. Quote the retention language from https://graphify.com/privacy. Do not guess a number of days |
| Is it intended for people under 18? | TODO Fahad. Proposed answer: no. Graphify is a developer tool. Confirm before selecting the answer |

## Compliance and review

| Field | Proposed value |
| --- | --- |
| Contact email | TODO Fahad. Proposed `founders@graphify.com`, an address where the directory can reach you about the submission |
| Acknowledgements | Select all four acknowledgements shown on the compliance step. Only Fahad can select them |
| How new versions arrive | TODO Fahad. The form offers a GitHub push webhook, which needs admin on the repository, or a scheduled check. Either way the directory also checks the tracked branch or tag on a schedule |
| Auto publish | TODO Fahad. Leave it off until you have seen one version pass review, unless you already want later passing versions to go live on their own |

## Install names

Marketplace name in `.claude-plugin/marketplace.json` is `graphify`. After the marketplace is added from this repository, the install id is `graphify@graphify`.

```
/plugin marketplace add Graphify-Labs/graphify-claude-plugin
/plugin install graphify@graphify
```

## Commands and hooks

No extra slash command and no hook is included. The skill at `skills/graphify/SKILL.md` is also invocable as `/graphify:graphify`, and the remote server supplies the tools.

TODO Fahad: add a command or a hook only if you want a fixed prompt or a lifecycle action. The current package does not need one to connect or to query the graph.

## MCP connector form

TODO Fahad. The directory docs say to submit the remote server as an MCP connector as well as the plugin bundle. That form is the other option on https://claude.ai/directory/manage. Proposed technical values, if you open it:

| Field | Proposed value |
| --- | --- |
| Server URL | `https://api.graphify.com/mcp` |
| Authentication | Users sign in. The server returns 401 with a `WWW-Authenticate` header pointing at protected resource metadata, and it publishes a registration endpoint. Do not paste a client secret into the plugin |
| Documentation | https://graphify.com |
| Privacy | https://graphify.com/privacy |
| Support | https://graphify.com/contact |
| Icon | `assets/logo.png` |
| Test account | TODO Fahad. Provide reviewer access through the portal, not in this repository |
| Tool check | TODO Fahad. The portal asks you to confirm each tool was called from a signed in session. A headless session cannot finish the browser sign in |

## Local checks already run

See the pull request conversation for the exact validate and OAuth results. Do not describe an interactive sign in as complete until someone finishes it in a browser.
