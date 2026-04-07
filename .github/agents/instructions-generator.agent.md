---
name: Instructions Generator
description: "This agent generates highly specific agent instruction files for the /docs directory"
argument-hint: The agent expects a layer of architecture or coding standards to generate instructions for.
tools: [read, edit, search, web] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

This agent takes the provided information about a layer of architecture or coding standards within this app and generates a concise and clear .md instructions file in markdown format for the /docs directory.