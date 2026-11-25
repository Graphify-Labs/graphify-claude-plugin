
# Graphify

Search indexed code, trace dependencies, assess change impact, and retrieve
repository memory through Graphify's authenticated MCP server.

This plugin connects Claude Code to hosted Graphify over a remote MCP server,
and adds a skill that tells Claude when to use those tools.

The plugin does not install a local server, a hook, or a credential. Sign in
happens in your browser. The Graphify CLI is the separate local engine you run
on your own machine. This plugin does not include it.

A Graphify account and at least one indexed repository are required. Hosted use
is covered by the [terms](https://graphify.com/terms). This repository is
[Apache 2.0](LICENSE).

## Install

In Claude Code:

```
/plugin marketplace add Graphify-Labs/graphify-claude-plugin
/plugin install graphify@graphify
```

The same steps from a shell:

```bash
claude plugin marketplace add Graphify-Labs/graphify-claude-plugin
claude plugin install graphify@graphify
```

Reload plugins if the new skill does not appear yet. The skill is `/graphify:graphify`.

Opening this repository in Claude Code also offers the root `.mcp.json` as a
project server, because that file is the plugin connection. Approve the plugin
server. Installing the plugin into a different project does not add that extra
project server.

Graphify already has a live [Claude connector](https://claude.com/marketplace/connectors/graphify).
This repository is the Claude Code plugin only.

## Sign in

1. Sign in at [app.graphify.com](https://app.graphify.com), connect a repository you are allowed to use, and wait until indexing finishes.
2. Install the plugin as above.
3. When Claude Code asks you to sign in to Graphify, finish the browser prompt and return. Nothing needs to be pasted into this repo; sign-in happens in the browser. You may need to sign in again when a session expires.

Ask Claude to list your Graphify workspaces and repositories, then name the repository you want. Confirm before it changes workspace. `set_workspace` can change the workspace selected for later sessions.

For example: "Using Graphify, find where authentication is implemented in `my-repository` and cite the files." Other useful requests are "Who calls this symbol?" and "Which linked tests should I look at before changing this function?"

## What it can do

The connected server is the authority for tool names, inputs, and approval annotations. Before calling a tool, check that it exists on the connected server. This list is the tool set the hosted Graphify connector exposed for this plugin version. Availability can still depend on your account and workspace.

| Tools | What they do |
| --- | --- |
| `list_workspaces`, `list_repositories` | Show workspaces and indexed repositories you can query. |
| `set_workspace` | Select the active workspace. This also updates the account default. |
| `query_graph`, `graphify_find`, `graphify_node`, `graphify_rank_files` | Search indexed code and inspect symbols. |
| `graphify_callers`, `graphify_callees`, `graphify_trace` | Follow directed call relationships. |
| `shortest_path` | Find a connecting path that need not be a directed call chain. |
| `graphify_file_neighbors`, `graphify_imports_exports` | Show file dependencies. |
| `graphify_impact`, `impact_and_risk`, `graphify_tests_for` | Explore potential change impact and linked tests. They do not run tests. |
| `graphify_expand`, `graphify_find_seeds`, `graphify_references`, `graphify_render_subgraph`, `graph_stats` | Additional graph exploration and index summary tools, when the server exposes them. Read each live schema before calling. |
| `recall`, `memories_about` | Retrieve saved repository context. |
| `remember` | Save a repository note when you ask. The result may need review. |

Symbol lookup can return a semantic suggestion when the exact name is missing. Treat that as a suggestion and check the file. An empty caller list means the index returned no callers. It is not proof that a function is unused.

Results describe the indexed snapshot, not necessarily the branch you have open. Read the local files before changing them. The graph does not prove runtime behavior or complete test coverage.

## Privacy and data

Tool arguments are sent to Graphify at `https://api.graphify.com/mcp` under the permissions of the account you signed in with. Code and notes returned by the server become available to Claude Code. Do not put secrets into questions.

`remember` stores a note in your Graphify workspace and may leave it waiting for review. `set_workspace` changes which workspace is selected. When trail capture is enabled for a workspace, `query_graph`, `graphify_trace`, `graphify_find`, and `graphify_rank_files` may save query context as repository memory; `recall` may record a memory gap. Follow the live tool annotations and Claude Code's approval prompts.

Processing and retention are described in the [privacy policy](https://graphify.com/privacy). The Apache 2.0 license on this repository does not grant access to the hosted service.

## Support

- [Graphify](https://graphify.com) · [Documentation](https://docs.graphify.com/integrations/claude-code)
- [Contact](https://graphify.com/contact) · [safi@graphify.com](mailto:safi@graphify.com)
- [Plugin issues](https://github.com/Graphify-Labs/graphify-claude-plugin/issues)

## License

Apache License 2.0. See [LICENSE](LICENSE).
