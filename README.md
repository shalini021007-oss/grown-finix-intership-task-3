# Task 3: SQL Injection (SQLi) Exploitation & Mitigation

## Overview
This task demonstrates the detection, automated exploitation, and patch implementation for a SQL Injection (SQLi) vulnerability within a Node.js/SQLite backend property search API.

## Technical Details
- **Tech Stack**: Node.js, Express, SQLite, SQLMap
- **Vulnerability**: Direct user string concatenation into raw SQL queries allowing database enumeration and data dumping.
- **Mitigation**: Implemented Parameterized Queries (Prepared Statements) using SQLite placeholders (`?`) to decouple SQL command execution from user input.
