# Summary | Résumé

> 1-3 sentence description of the changed you're proposing, including a link to
> a GitHub Issue # or Trello card if applicable.

---

> Description en 1 à 3 phrases de la modification proposée, avec un lien vers le
> problème (« issue ») GitHub ou la fiche Trello, le cas échéant.

## ⚠️ This PR can be tested through the following URL(s):
Main - [https://staging.resources.alpha.canada.ca/](https://staging.resources.alpha.canada.ca/)
EN - [https://staging.resources.alpha.canada.ca/](https://staging.resources.alpha.canada.ca/)
FR - [https://staging.ressources.alpha.canada.ca/fr/](https://ressources.alpha.canada.ca/fr/)


# After merge, do this:
From your terminal, make sure you are in the `main` branch, then type
```bash
git tag -a v0.2.0 -m <release notes>
git push --tags
```
This bumps up the release version

