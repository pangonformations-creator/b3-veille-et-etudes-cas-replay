# REPLAY Grenoble — TD de veille et d’études

Site pédagogique sur la création fictive d’une boutique de rétro-gaming à Grenoble. Les étudiants reformulent le brief, rédigent une proposition d’étude, préparent une veille et des outils d’enquête, puis analysent des données simulées.

Version préparée le 19 octobre 2026. La partie « Cadrer » demande une **proposition d’étude**, conformément à la diapositive 20 du cours.

## Mettre le projet sur GitHub

1. Décompressez cette archive sur votre ordinateur.
2. Créez un dépôt GitHub, par exemple `replay-grenoble-td`, ou ouvrez celui que vous souhaitez utiliser.
3. Choisissez **Add file → Upload files** et déposez le contenu décompressé : le fichier `README.md`, le dossier `docs` et les deux fichiers de configuration à la racine.
4. Validez avec **Commit changes**. Déposez les fichiers et dossiers, pas l’archive ZIP.

La racine du dépôt doit ressembler à ceci :

```text
README.md
.gitignore
.gitattributes
docs/
  .nojekyll
  index.html
  app.js
  gate.js
  styles.css
  snes.css
  refinements.css
  assets/
  downloads/
```

## Activer le site sur GitHub Pages

Dans le dépôt, ouvrez **Settings → Pages**. Dans **Build and deployment**, choisissez :

- **Source :** Deploy from a branch.
- **Branch :** main, ou le nom de votre branche principale.
- **Folder :** /docs.

Cliquez sur **Save**. Une fois la publication terminée, GitHub affiche le lien du site dans cette même page. Si l’option est proposée, conservez **Enforce HTTPS** activé. La publication Pages dépend des possibilités de votre compte et de la visibilité du dépôt.

Référence : [configurer GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Fonctionnement du TD

Le site est entièrement statique : aucun outil de compilation, serveur applicatif ou installation de dépendances n’est nécessaire. Les liens sont relatifs et fonctionnent aussi lorsque GitHub Pages publie le site dans un sous-dossier de dépôt.

- Univers graphique fixe inspiré des consoles 16 bits, ciel bleu et paysages en pixels.
- Vues de la boutique générées par IA et identifiées comme projections d’un projet fictif.
- Bouton **Déposer votre travail** relié au dossier Google Drive choisi par l’enseignant.
- Les étudiants rédigent leurs réponses dans leurs propres documents.

## Accès à la partie 3

La partie analyse et ses neuf documents sont conservés sous forme chiffrée dans `docs/assets/analysis.enc.json`. Le mot de passe actuel reste inchangé et se communique aux étudiants séparément. Il n’est pas inscrit dans ce dépôt.

Une fois le mot de passe saisi, les documents deviennent consultables et téléchargeables. Le déverrouillage reste actif pour la session de l’onglet. Il nécessite HTTPS, ou une consultation locale sur `localhost`.

Le dossier enseignant, les corrigés et les versions non chiffrées des données ne sont pas inclus dans cette archive.

## Modifier le site

- `docs/app.js` : textes, consignes et navigation des parties accessibles sans mot de passe.
- `docs/index.html` : en-tête, liens, bouton de dépôt et fichiers chargés.
- `docs/styles.css`, `docs/snes.css`, `docs/refinements.css` : présentation.
- `docs/assets/` : images, icônes, polices et contenu chiffré de la partie 3.
- `docs/downloads/cadre-livrables.html` : trame des livrables accessible aux étudiants.

Pour actualiser le dépôt, remplacez les fichiers modifiés dans `docs`, puis validez les changements. Le contenu chiffré doit être conservé si vous ne modifiez pas la partie 3.

## Consultation locale, facultative

Si Python est installé, ouvrez un terminal dans le dossier du projet et lancez :

```text
python -m http.server 8000 --directory docs
```

Ouvrez ensuite `http://localhost:8000`. Pour conserver le déverrouillage et les téléchargements, utilisez ce serveur local plutôt que le double-clic sur `index.html`.

## Crédits

Les crédits complets figurent dans la page **Sources & crédits** du site. Les licences des polices Bungee, VT323 et Pixelify Sans sont conservées dans `docs/assets/`. Les sources documentaires sont identifiées. L’entreprise, les personnes interrogées et les données d’enquête sont fictives. Les vues de la boutique et le paysage illustré ont été générés par IA pour ce TD.
