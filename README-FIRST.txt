NATE SAVARD — MAIN NAVIGATION INSTALLER

PRIMARY LINKS IN THIS ORDER:
1. Home             -> https://natesavard.com/
2. Rebirth          -> https://natesavard.com/envynomadixrebirth.html
3. Jewelry          -> https://natesavard.com/originals.html
4. Vault            -> https://natesavard.com/vault.html
5. Journal          -> https://natesavard.com/journal.html

WHAT IT DOES:
- Adds a direct Journal link to the homepage top navigation.
- Adds the five primary links at the beginning of existing pullout / embedded navigation menus.
- Adds a small MENU toggle with the five primary links to the site pages, so they are accessible even on pages without a shared existing drawer.
- Keeps all current menu links, headers, collection code, content and product pages.
- Does not replace any HTML files or change their layouts.

HOW TO INSTALL:
1. Extract this ZIP locally first.
2. Upload ALL files and folders from the extracted ZIP to the ROOT of your existing GitHub repository.
   IMPORTANT: .github/workflows/install-ns-primary-navigation.yml must remain inside
   the .github/workflows/ folder, and tools/install_primary_navigation.py inside tools/.
3. Commit to main.
4. In GitHub Actions, inspect the 'Install Nate Savard primary navigation' run.
   If it did not start automatically, choose Run workflow.
5. If Actions reports a permissions error, change repository Settings > Actions > General
   > Workflow permissions to 'Read and write permissions' and run again.
6. When the workflow finishes successfully, GitHub Pages will publish the updated pages.

THERE IS NO NEED TO MANUALLY EDIT SCRIPT REFERENCES.

SAFETY:
The installer only inserts one script reference immediately before </body> on each
selected page. It never overwrites existing page code. It does not edit any products
or photo / video assets. It will not duplicate a link to itself if run more than once.
