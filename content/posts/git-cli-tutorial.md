---
date: '2026-01-04T00:00:00+08:00'
draft: false
title: 'Git CLI'
categories: ['Note']
tags: ['Git', 'CLI', 'SSH', 'GitHub']
---

# 基本工作流程

最常用的一組指令：

```sh
git pull
git add .
git commit -m "[commit-message]"
git status # 確認目前狀態
git push
```

修改最近一次的 commit message（會進入 vim 編輯畫面）：

```zsh
git commit --amend
```

新增或修改 `.gitignore` 規則後，清除已經被追蹤的快取檔案，讓新規則生效：

```sh
# 記得先把目前的變更 commit 起來，避免這次操作把工作內容一起清掉
git rm -r --cached .
git add .
git commit -m "Applied .gitignore rules and cleared cache"
```

## 環境設定

用 SSH 方式來 clone、push 之前，需要先產生金鑰：

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

在本機資料夾初始化一個新的 repo：

```zsh
git init
```

第一次在這個 repo 提交前，需要先設定使用者名稱與信箱：

```sh
git config --global user.name [name]
git config --global user.email [mail-address]
```

## 檢視變更狀態

尚未 stage 的詳細變更內容：

```zsh
git diff
```

已經 stage、但還沒 commit 的變更內容：

```zsh
git diff --staged
```

確認目前有哪些檔案已經 stage、準備進行下一次 commit：

```zsh
git status
```

把指定檔案加入下一次要 commit 的 stage：

```zsh
git add <file-name>
```

把指定檔案從目前的 stage 移除（不影響檔案內容本身）：

```zsh
git reset <file-name>
```

## Commit message 慣例

參考這份[慣例整理](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)：

- `feat:` 新增、調整或移除功能
- `fix:` 修復 bug
- `test:` 新增或修正測試
- `build:` 建置相關
- `docs:` 只有修改文件內容
- `opt:` 維運相關：備份、還原流程等
- `chores:` 初始化專案、其他雜項

### 不影響應用程式實際行為的類型

- `refactor:` 重構或改寫程式碼結構
- `perf:` 效能優化
- `style:` 程式碼風格調整

# 分支（Branching）

參考 [Git 官方說明](https://git-scm.com/about/branching-and-merging)，典型的分支流程大致是：

1. 開一個新分支，嘗試新的想法
2. 在這個分支上做幾次 commit
3. 需要的話，切回原本分支的位置
4. 解決衝突
5. 把新分支合併回去
6. 如果這個嘗試最後行不通，就直接刪掉這個分支

### 分支的角色分工

- `main` 或 `master`：正式上線的版本
- `develop`：把各項功能整合起來、進行測試的分支
- 其他較小的分支：個別功能開發用

## 分支相關指令

檢查目前的 commit 紀錄：

```zsh
git log
```

列出目前所有分支：

```zsh
git branch
```

建立一個新分支：

```zsh
git branch <new-branch-name>
```

刪除一個分支：

```zsh
git branch -d <branch-name>
```

切換到另一個分支：

```zsh
git checkout <branch-name>
```

把指定分支合併進目前所在的分支（會把該分支的所有 commit 一併帶進來）：

```zsh
git merge <specified-branch>
```

## 遠端版本控制

從遠端 repo 抓取最新變更（但不會自動套用到目前分支）：

```zsh
git fetch
```

`merge` 與 `rebase` 是兩種套用變更的方式：

- `merge`：保留雙方完整的歷史紀錄
- `rebase`：會改寫歷史紀錄，如果其他協作者已經根據原本的 commit 繼續開發，在共用分支上使用會造成問題

```zsh
git merge
git rebase
```

`pull` 其實就是 `fetch` 之後再套用變更的組合指令：

- `fetch` + `merge`
- `fetch` + `rebase`

```zsh
git pull
git pull --rebase
```

# SSH 金鑰設定細節

設定 SSH 金鑰以用於 GitHub 帳號驗證，可參考[這篇教學](https://gist.github.com/xirixiz/b6b0c6f4917ce17a90e00f9b60566278)。

### 產生 SSH 金鑰

```bash
ssh-keygen -t rsa -b 4096 -C "youremail@example.com"
```

這個指令會在 `/User/<username>/.ssh` 底下建立 `id_rsa` 與 `id_rsa.pub` 兩個檔案。

接著，需要把公鑰複製起來，貼到 GitHub 帳號設定的 [SSH and GPG keys](https://github.com/settings/keys) 頁面：

```bash
pbcopy < /User/<username>/.ssh/id_rsa.pub
```

`pbcopy` 是 macOS 的剪貼簿工具：執行後可以在任何地方按 `Cmd+V` 貼上該檔案的內容。

設定完成後，測試金鑰是否生效：

```bash
ssh -T git@github.com
```

如果看到歡迎訊息，就代表設定成功。

如果原本的 remote 是用 HTTPS 設定的，可以改成 SSH：

```bash
git remote set-url origin git@github.com:organization/your-repo.git
```

確認目前的 remote 設定：

```bash
git remote -v
```

之後 push 就不需要再輸入密碼進行驗證了：

```bash
git push
```
