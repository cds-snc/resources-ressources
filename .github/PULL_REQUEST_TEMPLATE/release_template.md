# Summary | Résumé

> 1-3 sentence description of the changed you're proposing, including a link to
> a GitHub Issue # or Trello card if applicable.

---

> Description en 1 à 3 phrases de la modification proposée, avec un lien vers le
> problème (« issue ») GitHub ou la fiche Trello, le cas échéant.

## ⚠️ This PR can be tested through the following URL(s):
Main - https://staging.learning-resources.cdssandbox.xyz/
EN - https://en.staging.learning-resources.cdssandbox.xyz/
FR - https://fr.staging.learning-resources.cdssandbox.xyz/fr/

# 🚀  Release Checklist

Item | Checked / Reviewed by | Status | Notes
-- | -- | -- | --
Metrics - Google Analytics working and collecting data |  @daine @hillaryl   | Not started | [Prioritized for next release](https://github.com/cds-snc/resources-ressources/issues/154)
Content - Contentful |   | Not started |
Content - English | @anikbrazeau  | Not started |
Content - French | @anikbrazeau  | Not started |
Infra - Domains OK | @daine   | ☀️ Ready |
Infra - Amplify OK | @daine | ☀️ Ready  |
Monitoring (Uptime Robot)| @daine | ☀️ Ready  |  [Status page dashboard](https://stats.uptimerobot.com/gP5gohqEVQ)
Accessibility - aXe DevTools | @daine @dylanzheng94   | Not started |
Accessibility - Lighthouse checks | @daine @dylanzheng94 | Not started |
Accessibility - WCAG 2.0 AA | @emanelfy | Not started | The intention is to achieve AAA for full launch
Infra - Content Security Policy | @daine  | ☀️ Ready |

# After merge, do this:
From your terminal, make sure you are in the `main` branch, then type
```bash
git tag -a v0.2.0 -m <release notes>
git push --tags
```
This bumps up the release version

