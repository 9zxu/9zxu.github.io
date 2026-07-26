---
date: '2026-01-04T00:00:00+08:00'
draft: false
title: 'Git CLI'
categories: ['Note']
tags: ['Git', 'CLI', 'SSH', 'GitHub']
---

# workflow
- basic commands
```sh
git pull
git add .
git commit -m "[commit-message]"
git status # check
git push
```
- amend local commit message in vim mode
```zsh
git commit --amend
```
- clear the Git cache and apply new or updated `.gitignore` rules
```sh
# ... commit current change beforehand
git rm -r --cached .
git add .
git commit -m "Applied .gitignore rules and cleared cache"
```
## setup
- clone using ssh to commit to a repo
```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```
- init a local folder
```zsh
git init
```
- set before first time commit in the current repo
```sh
git config --global user.name [name]
git config --global user.mail [mail-address]
```

## edit stage
- detailed changes that is not staged
```zsh
git diff
```
- staged but yet commit
```zsh
git diff --staged
```
- check modified files that is staged for next commit
```zsh
git status
```
- add a file for next staged
```zsh
git add <file-name>
```
- remove a file from current stage
```zsh
git reset <file-name>
```

## commit message
[convention](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
- `feat:` add, adjust, remove features
- `fix:` fix bugs
- `test:` add or correct tests
- `build:` build related
- `docs:` exclusively modify documentation
- `opt:` operational components: backup, recovery procedures...
- `chores:` initalize, others...
### not affecting application behavior
- `refactor:` rewrite or restructure
- `perf:` improve performance
- `style:` code style

# branching
[official guild](https://git-scm.com/about/branching-and-merging)
```
- create a new branch to try out new idea
- do a few commits
- switch back to where you branched from
- solve conflicts
- merge the new branch
- if it's not going to work -> delete it
```

### branch role
- `main`or `master`: production
- `develop`: where you merge work into for testing features
- `smaller` ones: features...

## branching cli
- check current commit log
```zsh
git log
```
- list existing branch
```zsh
git branch
```
- create a new branch
```zsh
git branch <new-branch-name>
```
- delete a branch
```zsh
git branch -d <branch-name>
```
- check out another branch
```zsh
git checkout <branch-name>
```
- merge specified branch into current one ->
add all the commit to current branch
```zsh
git merge <specified-branch>
```

## remote version control
- fetch changes from remote repo
```zsh
git fetch
```
- `merge`: preserving the full history of both
- `rebase`: rewrites history, which can be problematic in shared branches if others have already based their work on the original commits.

```zsh
git merge
git rebase
```
- `fetch` + `merge` those changes into local repo
- `fetch` + `rebase`
```zsh
git pull
git pull --rebase
```

# SSH keypair detail
set up ssh keypair for github account authentication
[official tutorial](https://gist.github.com/xirixiz/b6b0c6f4917ce17a90e00f9b60566278)
### generate ssh keypair
```bash
ssh-keygen -t rsa -b 4096 -C "youremail@example.com"
```
This command will create two files, `id_rsa` and `id_rsa.pub` under `/User/<username>/.ssh`.

We need to copy public key to github account setting https://github.com/settings/keys

```bash
pbcopy < /User/<username>/.ssh/id_rsa.pub
```
`pbcopy` pasteboard: you can press C^v at other places to paste the content of the specified file

test the key

```bash
ssh -T git@github.com
```
you should see the welcome message

change remote

```bash
git remote set-url origin git@github.com:organization/your-repo.git
```

check remote

```bash
git remote -v
```

now we can push without password authenticatoin

```bash
git push
```
