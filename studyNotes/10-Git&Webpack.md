# Git

代码管理工具

版本控制工具

# d1 基本操作

### 01 安装（略）

### 02 配置

设置签名：签名由`user. name `(用户名)和`user. email `(Email地址)组成，用于对不同开发者的身份作区分，包括项目/仓库级别、系统用户级别。

> 这里设置的签名和登录远程库(代码托管中心)的账号、密码没有任何关系。
> 项目/仓库级别与系统用户级别必须有一个设置生效。

#### 项目/仓库级别

> 具有更高的优先级签名;
> 各个本地库的签名信息相互独立，互不干扰。

```python
git config user.name "dselegent"
git config user.email dselegent@qq.com
```

配置文件的修改保存在：`<Project>/.git/config`文件中。

#### 系统用户级别

> 若未设置项目/仓库级别的签名时，使用用户级别的签名。

```python
git config --global user.name "suxsyaoyuan"
git config --global user.email 1154446875@qq.com
```

配置文件的修改保存在：`~/.gitconfig`文件中。

**级别优先级**

-  就近原则：项目级别优先于系统用户级别，二者都有时采用项目级别 的签名
-  如果只有系统用户级别的签名，就以系统用户级别的签名为准
-  二者都没有不允许

#### 配置编辑器

使用命令`git config [--global | --system] core.editor [...]`为 Git 的配置编辑器。

#### 配置信息

使用命令`git config --list`查看 Git 的配置信息。

### 03 使用 git

- 查看当前仓库的状态

  ```
  git status
  ```

- 初始化仓库

  ```
  git init
  ```

- 文件状态：

  1. 未跟踪
  2. 已跟踪
  3. 暂存
  4. 未修改
  5. 已修改

- 未跟踪 → 暂存

  ```
  git add <filename> 将文件切换到暂存的状态
  git add * 将所有已修改（未跟踪）的文件暂存
  ```

- 暂存 → 未修改

  ```
  git commit -m "xxxx" 将暂存的文件存储到仓库中
  git commit -a -m "xxxx" 提交所有已修改的文件（未跟踪的文件不会提交）
  ```

- 未修改 → 修改

  - 修改代码后，文件会变为修改状态

- 常用的命令


1. 重置文件

```
git restore <filename> # 恢复文件
git restore --staged <filename> # 取消暂存状态
```

2. 删除文件

```
git rm <filename> # 删除文件
git rm <filename> -f # 强制删除
```

3. 移动文件

```
git mv from to # 移动文件 重命名文件
```

# d2 分支

git 在存储文件时，每一次代码代码的提交都会创建一个与之对应的节点，git 就是通过一个一个的节点来记录代码的状态的。节点会构成一个树状结构，树状结构就意味着这个树会存在分支，默认情况下仓库只有一个分支，命名为 master。在使用 git 时，可以创建多个分支，分支与分支之间相互独立，在一个分支上修改代码不会影响其他的分支。

```bash
git branch # 查看当前分支
git branch <branch name> # 创建新的分支
git branch -d <branch name> # 删除分支
git switch <branch name> # 切换分支
git switch -c <branch name> # 创建并切换分支
git merge <branch name> # 合并分支
```

在开发中，都是在自己的分支上编写代码，代码编写完成后，在将自己的分支合并到主分支中。

> 自动合并失败；需要手动修复冲突，然后提交结果。

# d3 变基（rebase）

在开发中除了通过 merge 来合并分支外，还可以通过变基来完成分支的合并。

我们通过 merge 合并分支时，在提交记录中会将所有的分支创建和分支合并的过程全部都显示出来，这样当项目比较复杂，开发过程比较波折时，我必须要反复的创建、合并、删除分支。这样一来将会使得我们代码的提交记录变得极为混乱。

```bash
git rebase master //把iss当前基变为master
git switch master
git merger iss //再合并
git branch -d iss
```

> 冲突仍然存在，需要手动修复冲突，然后提交结果。

原理（变基时发生了什么）：

1. 当我们发起变基时，git 会首先找到两条分支的最近的共同祖先
2. 对比当前分支相对于祖先的历史提交，并且将它们提取出来存储到一个临时文件中
3. 将当前部分指向目标的基底
4. 以当前基底开始，重新执行历史操作

变基和 merge 对于合并分支来说最终的结果是一样的！

但是变基会使得代码的提交记录更整洁更清晰！

注意！大部分情况下合并和变基是可以互换的，但是如果分支已经提交给了远程仓库，那么这时尽量不要变基。

# d4 远程仓库（remote）

目前我对于 git 所有操作都是在本地进行的。在开发中显然不能这样的，这时我们就需要一个远程的 git 仓库。远程的 git 仓库和本地的本质没有什么区别，不同点在于远程的仓库可以被多人同时访问使用，方便我们协同开发。在实际工作中，git 的服务器通常由公司搭建内部使用或是购买一些公共的私有 git 服务器。我们学习阶段，直接使用一些开放的公共 git 仓库。目前我们常用的库有两个：GitHub 和 Gitee（码云）

## 01 将本地库上传 git：

```bash
git remote add origin https://github.com/suxsyaoyuan/front.git
# git remote add <remote name> <url>

git branch -M main
# 修改分支的名字的为main

git push -u origin main
# git push 将代码上传服务器上
```

## 02 将本地库上传 gitee：

```bash
git remote add gitee https://gitee.com/ymhold/vue-course.git
git push -u gitee main
```

## 03 远程库的操作的命令

```bash
git remote # 列出当前的关联的远程库
git remote -v  # 查看当前所有远程地址别名 
git remote add <远程库名> <url> # 关联远程仓库
git remote remove <远程库名>  # 删除远程库

git push -u <远程库名> <分支名> # 向远程库推送代码，并和当前分支关联 第一次推送

git push <远程库> <本地分支>:<远程分支>
git clone <url> # 从远程库下载代码
	效果：
	1. 完整的把远程库下载到本地
	2. 创建 origin 远程地址别名 
	3. 初始化本地库

git push # 如果本地的版本低于远程库，push默认是推不上去
git fetch 
# 要想推送成功，必须先确保本地库和远程库的版本一致，fetch它会从远程仓库下载所有代码，但是它不会将代码和当前分支自动合并
# 使用fetch拉取代码后，必须要手动对代码进行合并

git pull  # 从服务器上拉取代码并自动合并
```

> 注意：推送代码之前，一定要先从远程库中拉取最新的代码
>

## 04 tag 标签

- 当头指针没有执行某个分支的头部时，这种状态我们称为分离头指针（HEAD detached），分离头指针的状态下也可以操作操作代码，但是这些操作不会出现在任何的分支上，所以注意不要再分离头指针的状态下来操作仓库。

- 如果非得要回到后边的节点对代码进行操作，则可以选择创建分支后再操作

  ```bash
  git switch -c <分支名> <提交id>
  ```

- 可以为提交记录设置标签，设置标签以后，可以通过标签快速的识别出不同的开发节点：

  ```bash
  git tag
  git tag 版本
  git tag 版本 提交id
  git push 远程仓库 标签名
  git push 远程仓库 --tags
  git tag -d 标签名 # 删除标签
  git push 远程仓库 --delete 标签名 # 删除远程标签
  ```


## 05 gitignore

默认情况下，git 会监视项目中所有内容，但是有些内容比如 node_modules 目录中的内容，我们不希望它被 git 所管理。我们可以在项目目录中添加一个`.gitignore`文件，来设置那些需要 git 忽略的文件。

在`.gitignore`中书写规则如下：

```bash
// 常见规则写法

/mtk/   过滤整个文件夹
*.zip    过滤所有.zip文件
/mtk/do.java 过滤某个具体文件
!do.java 不过滤某个文件
```

## 06 远程库的 SSH 登录

在 Windows 10 系统中，`凭据管理器`为我们记录了 GitHub 的 Windows 凭据，再次从终端经过 GitHub 写数据时，可自动保持登录状态。但其他 OS 不一定有这样的功能，因此不便于频繁地提交版本。
为此，可以使用 SSH 登录的方式访问远程库。

> 不同于 SSH 登录，使用 HTTPS 的方式可以在多个 GitHub 帐号间管理仓库。

###### .1   在本地 Home 目录生成 GitHub 公/私钥

`cd ~`进入当前用户的根目录

`rm -rvf .ssh` 删除.ssh 目录

使用命令`ssh-keygen -t <KeyType> -C <Annotation|AccountEmailAddress>`在本地 Home 目录生成 GitHub 公/私钥。

`ssh-keygen -t rsa -C dselegent@qq.com`

> 这里其实是填写github用户名

###### .2   查看 .ssh 目录下的文件

 `cd .ssh`

`cat id_rsa.pub`

// 将秘钥全部复制

###### .3  在 GitHub 配置该 SSH 公钥

登录 GitHub 账户后，进入Settings中的SSH and GPG keys项执行配置。

###### .4 更改在本地的远程库地址

将远程库地址由 HTTPS 方式切换为 SSH 方式

`git remote set-url <Alias4RemoteRepositoryAddress> <RemoteRepositoryAddress>`

也可以直接添加一个新的别名 `origin_ssh`

`git remote add origin_ssh git@github.com:suxsyaoyuan/..`

随后，即可使用 SSH 的方式免密读写 GitHub 的内容。

`git add ssh.txt`

`git commit -m 'ssh' ssh.txt`

`git push origin_ssh master`



## 07 解决冲突

#### .1 冲突的产生

冲突的产生：本地仓库与线上不一致时未git pull就开始编写代码 并且在编写完代码后试图git push

![image-20221006193046462](https://i0.hdslb.com/bfs/album/0795ecfec7107ef45a666b5a85c91cd0014dd448.png)

#### .2 解决冲突

- 要点
  - 如果不是基于 GitHub 远程库的最新版所做的修改，不能推送，必须先拉取。
  - 拉取下来后如果进入冲突状态，则按照“分支冲突解决”操作解决即可。

1. 首先我要在两个本地库更改`test2.txt`中的内容

`dselegent`

![image-20221006194022775](https://i0.hdslb.com/bfs/album/d97b6d67b7f1fb3d3438b623ed938e00cda0f894.png)

`dselegent-gmail`

![image-20221006194132829](https://i0.hdslb.com/bfs/album/b208a65e7079d88b836dd82e52c0f6f81893456e.png)

2. `dselegent`推送到远程库

![image-20221006194251330](https://i0.hdslb.com/bfs/album/b85100c12247ffe3ea0d3fad8caf47574f9954ec.png)

![image-20221006194305353](https://i0.hdslb.com/bfs/album/bad1f1f4e88b1e815ce1145fe83f5d708a74355d.png)

![image-20221006194313397](https://i0.hdslb.com/bfs/album/c1501c43f0ebf34414cdc56e00a9fdf6f859470e.png)

3. `dselegent-gmail`推送到远程库

![image-20221006194350085](https://i0.hdslb.com/bfs/album/1a220b056d94b03f7c2a871080a6e1b7b581d277.png)

4. 在`dselegent-gmail`中使用`git pull origin master`拉取最新的内容

> pull=fetch+merge
>
> git fetch [远程库地址别名] 
>
> git merge [远程库地址别名/远程分支名】
>
> git pull [远程库地址别名] [远程分支名]

![image-20221006194801202](https://i0.hdslb.com/bfs/album/c4de3179c727ab71caec921e724fd5baa65b8f63.png)

![image-20221006194846829](https://i0.hdslb.com/bfs/album/cf371bc2ef278b043c064f40161721dbcc7efbad.png)

![image-20221006195232425](https://i0.hdslb.com/bfs/album/3ff0c93ee2d342482109fa4eb60d1467cf98aa2b.png)

5. `dselegent-gmail`推送到远程库

![image-20221006195309995](https://i0.hdslb.com/bfs/album/bc7b0a1f2e151dc3a0d06c93be2a271958d6aacd.png)

![image-20221006195326732](https://i0.hdslb.com/bfs/album/2147294762cdc4d2786d1632133be9c505427061.png)

![image-20221006195334121](https://i0.hdslb.com/bfs/album/0d3ff32454438a26393341684896e6eb7ffe1d7d.png)

# d5 github 的静态页面

在 github 中，可以将自己的静态页面直接部署到 github 中，它会给我们提供一个地址使得我们的页面变成一个真正的网站，可以供用户访问。

要求：
- 静态页面的分支必须叫做：gh-pages
- 如果希望页面可以通过 xxx.github.io 访问，则需要将库的名字配置为 xxx.github.io

# d6 docusaurus

- facebook 推出的开源的静态的内容管理系统，通过它可以快速的部署一个静态网站
- 使用：
  - 网址：
    - https://docusaurus.io/
  - 安装
    - `npx create-docusaurus@latest my-website classic`
  - 启动项目
    - `npm start`或`yarn start`
  - 构建项目
    - `npm run build`或`yarn build`
    - 
  - 配置项目：
    - docusaurus.config.js 项目的配置文件
  - 添加页面：
    - 在 docusaurus 框架中，页面分成三种：1.page，2.blog，3.doc
  - 案例地址：
    - https://github.com/lilichao/lilichao.github.io

> 写个简历 传上去
>

# d7 Git 提交规范

## 01 Git提交规范（Commitizen）

### 1.1 背景

 Git是目前世界上最先进的分布式版本控制系统，在我们平时的项目开发中已经广泛使用。而当我们使用Git提交代码时，都需要写Commit Message提交说明才能够正常提交。

```
git commit -m "提交"
```

  然而，我们平时在编写提交说明时，通常会直接填写如"fix"或"bug"等不规范的说明，不规范的提交说明很难让人明白这次代码提交究竟是为了什么。而在工作中，一份清晰简介规范的Commit Message能让后续代码审查、信息查找、版本回退都更加高效可靠。因此我们需要一些工具来约束开发者编写符合规范的提交说明。

### 1.2 提交规范

  那么，什么样的提交说明才能符合规范的说明呢？不同的团队可以制定不同的规范，当然，我们也可以直接使用目前流行的规范，比如[Angular Git Commit Guidelines](https://zj-git-guide.readthedocs.io/zh_CN/latest/message/Angular提交信息规范/)。接下来将会对目前流行的Angular提交规范进行介绍。

#### 提交格式

  符合规范的Commit Message的提交格式如下，包含了页眉（header）、正文（body）和页脚（footer）三部分。其中，header是必须的，body和footer可以忽略。

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

#### 页眉设置

  页眉（header）通常只有一行，包括了提交类型（type）、作用域（scope）和主题（subject）。其中，type和subject是必须的，scope是可选的。

**提交类型**

  提交类型（type）用于说明此次提交的类型，需要指定为下面其中一个：

![image-20230212220159594](https://article.biliimg.com/bfs/article/25c25024576908442687ed7bd9ec508b13b6be0c.png)

  **作用域**

  作用域（scope）表示此次提交影响的范围。比如可以取值api，表明只影响了接口。

  **主题**

   主题（subject）描述是简短的一句话，简单说明此次提交的内容。

#### 正文和页脚

  正文（body）和页眉（footer）这两部分不是必须的。

  如果是破坏性的变更，那就必须在提交的正文或脚注加以展示。一个破坏性变更必须包含大写的文本 BREAKING CHANGE，紧跟冒号和空格。脚注必须只包含 BREAKING CHANGE、外部链接、issue 引用和其它元数据信息。例如修改了提交的流程，依赖了一些包，可以在正文写上：BREANKING CHANGE：需要重新npm install，使用npm run cm代替git commit。

  下面给出了一个Commit Message例子，该例子中包含了header和body。

```
chore: 引入commitizen

BREANKING CHANGE：需要重新npm install，使用npm run cm代替git commit
```

  当然，在平时的提交中，我们也可以只包含header，比如我们修改了登录页面的某个功能，那么可以这样写Commit Message。

```
feat(登录）：添加登录接口
```

### 1.3 Commitizen

  虽然有了规范，但是还是无法保证每个人都能够遵守相应的规范，因此就需要使用一些工具来保证大家都能够提交符合规范的Commit Message。常用的工具包括了可视化工具和信息交互工具，其中Commitizen是常用的Commitizen工具，接下来将会先介绍Commitizen的使用方法。

#### 什么是Commitizen

  [Commitizen](https://github.com/commitizen/cz-cli)是一个撰写符合上面Commit Message标准的一款工具，可以帮助开发者提交符合规范的Commit Message。

#### 安装Commitizen

  可以使用npm安装Commitizen。其中，cz-conventional-changelog是本地适配器。

```
npm install commitizen cz-conventional-changelog --save-dev
```

#### 配置Commitizen

  安装好Commitizen之后，就需要配置Commitizen，我们需要在package.json中加入以下代码。其中，需要增加一个script，使得我们可以通过执行npm run cm来代替git commit，而path为cz-conventional-changelog包相对于项目根目录的路径。

```json
{
    "script": {
        "cm": "git cz"
    },
    "config": {
        "commitizen": {
            "path": "./node_modules/cz-conventional-changelog"
        }
    }
}
```

其实这个可以全局安装，这样我们所有地方都可以用

```bash
npm install -g commitizen cz-conventional-changelog  # 安装规范化提交插件

echo '{"path": "cz-conventional-changelog"}' > ~/.czrc # 配置
```

配置完成之后，我们就可以通过执行npm run cm来代替git commit，接着只需要安装提示，完成header、body和footer的编写，就能够编写出符合规范的Commit Message。

![image-20230212220930672](https://article.biliimg.com/bfs/article/ee3c890b2c596ad7f0a2bd6d1839e082f9fc1f08.png)

## 02 Git工作流规范（Husky ）

### 2.1 背景

有些同学可能会把ESLint、Stylelint或Commitizen提示的错误忽视不见，直接将代码提交到代码仓库中。这样做的话，那么其他同学在pull代码并diff代码时可能会出现大段代码标红，同时在进行CI时又可能因为代码风格或规范问题被打回重改。

  那么，有没有一种方法，让大家在提交代码时需要确保本地的代码或Commit Message已经通过检查才能够push到代码仓库，从而更好的保障代码质量呢？接下来，将会介绍如何使用Husky + Commintlint + Lint-staged打造规范的Git检查工作流，确保我们的代码只有符合规范才能提交到代码仓库。

### 2.2 什么是git hook

 在介绍Husky之前，我们先来看什么是git hook，也就是常说的Git钩子。

  和其它版本控制系统一样，Git能在特定的重要动作发生时触发自定义脚本。有两组这样的钩子：客户端的和服务器端的。 客户端钩子由诸如提交和合并这样的操作所调用，而服务器端钩子作用于诸如接收被推送的提交这样的联网操作。 你可以随心所欲地运用这些钩子。

  其中，客户端钩子我们可能用的比较多，客户端钩子通常包括了提交工作流钩子、电子邮件工作流钩子和其它钩子。这些钩子通常存储在项目的.git/hooks目录下，我们需要关注的主要是提交工作流钩子。提交工作流钩子主要包括了以下四种：

- pre-commit：该钩子在键入提交信息前运行。 它用于检查即将提交的快照。如果该钩子以非零值退出，Git 将放弃此次提交，你可以利用该钩子，来检查代码风格是否一致。
- prepare-commit-msg：该钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 它允许你编辑提交者所看到的默认信息。 
- commit-msg：该钩子接收一个参数，此参数存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。
- post-commit：该钩子一般用于通知之类的事情。

  在上面的钩子中，我们需要关注pre-commit和commit-msg钩子。

### 2.3 什么是husky

  [husky](https://github.com/typicode/husky)是常见的git hook工具，使用husky可以挂载Git钩子，当我们本地进行git commit或git push等操作前，能够执行其它一些操作，比如进行ESLint检查，如果不通过，就不允许commit或push。

### 2.4 安装husky

  安装husky，可以使用npm进行安装。

```bash
npm install husky --save-dev
```

### 2.5 配置husky

  安装好husky之后，还需要对husky进行配置。不同版本的husky配置方法有些不同。

1. 安装 husky git hooks

```bash
# 方法1：
npx husky install
# 方法2：配置 package.json, scripts："prepare": "husky install"
npm run prepare
```

2. 测试 husky 钩子作用，添加 pre-commit 钩子

```bash
npx husky add .husky/pre-commit "npm test"
# 查看当前目录 .husky 目录是否有生成 pre-commit 文件
# 如果需要删除这个钩子，直接 删除 .husky/pre-commit 文件即可
```

我们需要安装配置好ESLint或Stylelint，并且在 `pre-commit` 中加入以下代码。

````bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx eslint *.{js,jsx,ts,tsx}
````

  接着，当我们执行git commit时，就会触发pre-commit钩子，并且执行对应命令，这里将会指定目录下的文件进行ESLint检查，如果ESLint检查不通过，是无法进行commit的。

![image-20230212221721568](https://article.biliimg.com/bfs/article/914bd4db9e59aab4cee16b65998131af6d162b99.png)

  如果ESLint检查通过，就可以正常进行commit。

![image-20230212221733767](https://article.biliimg.com/bfs/article/5aaaa1287862843e69b499d50e3ce3b69734cf78.png)

  在安装并配置好husky之后，如果发现在commit时不能触发pre-commit，可以试着重新安装husky，并且重启VSCode。

### 2.6 只使用husky的问题

 使用husky虽然能够帮助我们在commit或push前执行一些指令，但是如果只使用husky，仍然存在下面这些问题：

- 在某次提交时，我们只修改了某个文件，但是只使用husky会把所有的文件都运行一遍Lint检查，时间成本太高。此外，有些项目会在中途才加上husky，但是在commit时husky也会对其它未修改的历史代码进行检查，可能会一下子报了很多错误，这个时候我们更希望只对当前修改过的文件进行检查，而不是对项目中的代码都进行检查。
- husky的钩子只能执行一个指令，但是有时候我们希望能够在git commit之前执行多个指令，比如执行ESLint、Stylelint或Commitlint等操作。

  为了解决上面的问题，就需要结合Lint-staged一起使用。

## 03 Git工作流规范（Lint-staged）

### 3.1 什么是Lint-staged

  [Lint-staged](https://github.com/okonet/lint-staged)可以在git staged阶段的文件上执行Linters，简单说就是当我们运行ESlint或Stylelint命令时，可以通过设置指定只检查我们通过git add添加到暂存区的文件，可以避免我们每次检查都把整个项目的代码都检查一遍，从而提高效率。

  其次，Lint-staged允许指定不同类型后缀文件执行不同指令的操作，并且可以按步骤再额外执行一些其它shell指令。

  安装Lint-staged，可以使用npm进行安装。

```bash
npm install lint-staged --save-dev
```

### 3.2 配置Lint-staged

  安装好了Lint-staged之后，就需要配置Lint-staged。我们可以在package.json中加入以下代码，这里需要先安装配置好husky，ESLint和Stylelint。

`.lintstagedrc.js`

```js
module.exports = {
  "*.vue": [
    "eslint --fix",
    "stylelint --fix",
  ],
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
  ],
  "*.{htm,html,css,sss,less,scss,sass}": [
    "stylelint --fix",
  ]
}
```

`package.json`

```json
{
  "scripts": {
    "commit": "cz && git push",
    "lint:lint-staged": "lint-staged",
  }
}
```

`pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

当我们执行git commit时，就会触发husky的pre-commit钩子，调用lint-staged命令。而lint-staged包含了对*.vue，*.{js,jsx,ts,tsx}，*.{htm,html,css,sss,less,scss,sass}类型文件的操作。以*.vue为例，当匹配到后缀名为.vue的文件时，就会分别执行以下操作：

- 首先会执行eslint --fix命令，对.vue文件执行ESLint检查，并且自动修复一些JS格式问题
- 接着会执行stylelint --fix命令，对.vue文件的CSS执行Stylelint检查，并且自动修复一些CSS格式问题
- 最后，若前面的指令都执行通过，那么将加入到本地的git commit中，如果没有执行通过，那么将不能commit

## 04 Git工作流规范（Commitlint）

除了在commit前对JS和CSS执行ESLint和Stylelint检查之外，也可以对Commit Message进行检查。接下来，将会介绍Commitlint的安装和配置方法。

### 4.1 什么是Commitlint

  在使用Git提交代码时，通常都需要填写提交说明，也就是Commit Message。在前面的文章中，已经介绍了如何使用Commitizen或可视化工具编写符合规范的Commit Message。然而有些同学可能还是会使用git commit方式提交一些不符合规范的Commit Message。为了禁止不符合规范的Commit Message的提交，我们就需要采用一些工具，只有当开发者编写了符合规范的Commit Message才能够进行commit。而[Commitlint](https://commitlint.js.org/#/)就是这样一种工具，通过结合husky一起使用，可以在开发者进行commit前就对Commit Message进行检查，只有符合规范，才能够进行commit。

### 4.2 安装Commitlint

  使用npm安装Commitlint相关依赖包。

```bash
npm install @commitlint/cli @commitlint/config-conventional --save-dev
```

### 4.3 配置Commitlint

  安装好Commitlint之后，就需要配置Commitlint，可以在根目录创建`.commitlintrc.js`文件进行配置。

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

 在comminlint.config.js中加入以下代码，表示使用config-conventional规范对提交说明进行检查。具体的规范配置可以查看：https://github.com/conventional-changelog/commitlint

  接下来，需要在`.husky`中加入`commit-msg`钩子。

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

  配置好了之后，当我们进行git commit时，就会触发commit-msg钩子，执行commintlint命令，并且读取commitlint.config.js中的规则对我们的提交说明进行检查，如果校验不通过，将不能提交。

## 05 cz-git

### 5.1 介绍

一款工程性更强，轻量级，高度自定义，标准输出格式的 [commitizen](https://github.com/commitizen/cz-cli) 适配器

**特点**

- 💪 友好型命令行工具，**“懒字优先”** ！支持在命令行搜索和选择，减少拼写错误。
- ⚡️ **轻量级**，**高度自定义**, 但输出格式遵循标准的 [Angular commit](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) 规范。
- 🔨 [更好维护 monorepo 工程化项目](https://cz-git.qbb.sh/zh/recipes/#scopes) 与 **commitlint** 配合给予命令行的相关校验信息。
- ✅ 支持在 commit 中添加 **emoji** ｜ 更好的与issue链接，尤其 [gitee](https://cz-git.qbb.sh/zh/recipes/issue-prefixs.html)

**为什么制作了这款插件**

- **cz-customizable**
  1. 需要额外添加配置文件。
  2. 仅支持上下选择是的交互方式。
  3. 可支持的习惯型配置项少。

- **cz-conventional-changelog**

  1. 支持的自定义配置项少。

  2. 交互方式不友好。

  3. 重复性输入的东西太多。

### 5.2 项目中使用

> 只需要简单的三个步骤:

[全局安装](https://cz-git.qbb.sh/zh/guide/#全局使用) `commitizen`,如此一来可以快速使用 `cz` 或 `git cz` 命令进行启动。

```
npm install -g commitizen
```

**步骤 1: 下载依赖**

- NPM
- YARN
- PNPM

```
npm install -D cz-git
```

**步骤 2: 修改 `package.json` 添加 `config` 指定使用的适配器**

```json
{
  "scripts": {
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

**步骤 3: 添加自定义配置(可选，使用默认)**

> 有两种配置方式

**方式一: (推荐) cz-git 与 [commitlint](https://github.com/conventional-changelog/commitlint) 进行联动给予校验信息**，所以可以编写于 [commitlint](https://github.com/conventional-changelog/commitlint#config) 配置文件之中。
例如: ([⇒ 配置模板](https://cz-git.qbb.sh/zh/config/))

```js
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rule: {
    ...
  },
  prompt: {
    useEmoji: true
    //option...
  }
}
```

**方式二:** 在 **package.json** 下 config.commitizen 下添加自定义配置，但过量的配置项会导致 package.json 臃肿，适合简单自定义。例如:

```json
{
  "scripts": {
    "commit": "git cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git",
      "useEmoji": true
    }
  }
}
```

### 5.3 全局使用

> 全局安装的好处在于：在任何项目下都可以利用 `cz` 或 `git cz` 命令启动命令行工具，生成标准化 commit message

只需要简单的三个步骤：

**步骤 1: 下载全局依赖**

```
npm install -g cz-git commitizen
```

**步骤 2: 全局配置适配器类型**

```
echo '{ "path": "cz-git" }' > ~/.czrc
```

**步骤 3: 添加自定义配置(可选，使用默认配置)**

> 有 两种 配置方式

**方式一:** 编辑 `~/.czrc` 文件以 json 形式添加配置, 例如:

```json
{
  "path": "cz-git",
  "useEmoji": true
}
```

**方式二: 与 [commitlint](https://github.com/conventional-changelog/commitlint) 配合**，在 `$HOME` 路径下创建配置文件
([↓ 配置模板](https://cz-git.qbb.sh/zh/config/))

### 5.4 我的配置

```js
// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
      ],
    ],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨  新增功能 | A new feature', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛  修复缺陷 | A bug fix', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     📝  文档更新 | Documentation only changes', emoji: ':memo:' },
      {
        value: 'style',
        name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code',
        emoji: ':lipstick:',
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: ':recycle:',
      },
      { value: 'perf', name: 'perf:     ⚡️  性能提升 | A code change that improves performance', emoji: ':zap:' },
      {
        value: 'test',
        name: 'test:     ✅  测试相关 |Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:',
      },
      {
        value: 'build',
        name: 'build:    📦️   构建相关 | Changes that affect the build system or external dependencies',
        emoji: ':package:',
      },
      {
        value: 'ci',
        name: 'ci:       🎡  持续集成 | Changes to our CI configuration files and scripts',
        emoji: ':ferris_wheel:',
      },
      {
        value: 'chore',
        name: "chore:    🔨  其他修改 | Other changes that don't modify src or test files",
        emoji: ':hammer:',
      },
      { value: 'revert', name: 'revert:   ⏪️  回退代码 | Reverts a previous commit', emoji: ':rewind:' },
    ],
    useEmoji: true,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
}
```

![image-20230212230104019](https://article.biliimg.com/bfs/article/99ead6f04bba10d7799dff1c05aad0d6a3ca63a2.png)

# Gitee

准备工作：下载git软件、注册码云账号

git可以把我们的本地网站提交上传到远程仓库（码云 gitee）里面，码云就是远程仓库，类似服务器。

步骤：

1. 码云创建新的仓库

2. 利用git 提交，把本地网站提交到码云新建的仓库里面

   - 在网站根目录右键

     ```bash
     Git Bash Here
     ```

   - 如果是第一次利用git提交，请配置好全局选项

     ```bash
     git config --global user.name "苏渺"
     git config --global user.email "1154446875@qq.com"
     ```

   - 初始化仓库

     ```bash
     git init
     ```

   - 把本地文件放到暂存区

     ```bash
      git add .
     ```

   - 把本地文件放到本地仓库里面

     ```bash
     git commit -m '提交'
     ```

   - 链接远程仓库

     ```bash
     git remote add origin https://gitee.com/suyaoyuan/front.git
     ```

   - 把本地仓库的文件推送到远程仓库 push

     ```bash
     git push -u origin master
     // 第一次提交要填用户名密码，用户名就是主页@后面的符号，不包括@ 密码就是登录gitee的密码
     ```

     已有仓库?

     ```bash
     cd existing_git_repo
     git remote add origin https://gitee.com/suyaoyuan/front.git
     git push -u origin "master"
     ```

3. 码云部署发布静态网站

   服务 -> gitee pages -> 启动

# 构建工具

- 当我们习惯了在 node 中编写代码的方式后，在回到前端编写 html、css、js 这些东西会感觉到各种的不便。比如：不能放心的使用模块化规范（浏览器兼容性问题）、即使可以使用模块化规范也会面临模块过多时的加载问题。
- 我们就迫切的希望有一款工具可以对代码进行打包，将多个模块打包成一个文件。这样一来即解决了兼容性问题，又解决了模块过多的问题。
- 构建工具就起到这样一个作用，通过构建工具可以将使用 ESM 规范编写的代码转换为旧的 JS 语法，这样可以使得所有的浏览器都可以支持代码。

# d1 Webpack

## 01 使用步骤

1. 初始化项目

   ```js
   npm init -y
   yarn init -y
   ```

2. 安装依赖`webpack`、`webpack-cli`

   ```bash
   npm install -D webpack webpack-cli --save-dev
   yarn add -D webpack webpack-cli
   ```

3. 在项目中创建`src`目录，然后编写代码（index.js）

   > 默认src/index.js为打包入口

4. 执行`yarn webpack`来对代码进行打包（打包后观察 dist 目录）

> 一般安装在项目本地，不能直接使用命令，需要在webpack.config.js中配置可执行脚本命令

## 02 配置文件（webpack.config.js）

```js
const path = require("path")
module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {},
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader",
                      "css-loader",
                      "postcss-loader",
                      "less-loader"
                 ]
            }
        ]
    },
    plugins:[],
    devServer:{
        host:'127.0.0.1',
        port:3000,
        open:true, //自动打开浏览器
        hot:true, //打开热更新
        compress:true, //开启服务器的GZIP压缩
        /* 跨域代理
           '/xxx'前缀:主要就是用来区分，以什么前缀法的请求，我们代理到那一台服务器上，一般设置为'/api'
           target:代理的真正服务器地址
           pathRewriter:地址重写，主要用于把用来区分不停代理的前缀，从最后请求的真正地址中移除掉
           changeOrigin:修改请求头中的origin源信息
           ws:支持webscoket通信机制
        */
        proxy:{
            "/zhi":{
                target:"https://news-at.zhihu.com/api/4",
            	changeOrigin:true,
                ws:true,
                pathRewriter:{"^/zhi":""}
            }
        }
    }
}
```

### 1 mode

打包模式

可选值（”生产环境production”，”开发环境development”，”none”）

### 2 entry

打包的入口文件

配置方式：

```js
entry: './path/to/my/entry/file.js'

entry: {
  main: './path/to/my/entry/file.js',
}

entry: ['./src/file_1.js', './src/file_2.js']

entry: {
  app: './src/app.js',
  adminApp: './src/adminApp.js',
}
```

### 3 output

打包后文件输出位置

配置方式：

```js
output: {
  filename: 'bundle.js',
}

output: {
  filename: '[name].js',
  path: __dirname + '/dist',
}
```

### 4 plugin

为 webpack 来扩展功能

> `html-webpack-plugin`  这个插件可以在打包代码后，自动在打包目录生成 html 页面

使用步骤：

1. 安装依赖
2. 配置插件

```
plugins: [
    new HTMLPlugin({
        // title: "Hello Webpack",
        template: "./src/index.html"
    })
]
```

### 5 module

配置webpack的loader

配置方式：

```js
module: {
  rules: [
    { test: /\.css$/, use: 'css-loader' },
    { test: /\.ts$/, use: 'ts-loader' },
  ],
}

module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
        { loader: 'sass-loader' },
      ],
    },
  ],
}
```

webpack本身仅仅能处理js文件，但是在实际开发中除了js文件外，还有一些其他类型的文件我们也希望可以一起打包，这就需要使用到loader。通过loader可以对webpack进行扩展使其具备处理某种类型文件的能力。

样式相关的loader：

- style-loader

- css-loader

  安装：

  ```
  npm install style-loader css-loader -D
  ```

  配置：

  ```json
  //引入css
  import "./style/index.css"
  
  module: {
      rules: [
        {
          test: /\.css$/i, //正则表达式
          use: ["style-loader", "css-loader"],  //css引进来 style使其生效
        },
      ],
    }
  ```

- less-loader

  安装：

  ```bash
  npm install less less-loader -D
  ```

  配置：

  ```json
  module: {
      rules: [
        {
          test: /\.less$/i,
          use: [
            "style-loader",
            "css-loader",
            "less-loader",
          ],
        },
      ],
    }
  ```

- sass-loader

- postcss-loader

- stylus-loader

- 关于图片的处理

  > js中处理静态图片，需要先基于ES6ES6Module规范导入进来【这样webpack才会对此图片进行打包】
  >
  > 如果写的是相对地址，打包后还是这个地址，但是打包后的资源路径全都变了 [不是SRC这样的路径了]，所以肯定找不到图片，但是设置的是绝对地址(外部网址那种的)，无需先import导入，直接写地址即可(无需经过webpack打包}

  配置：

  ```js
  module: {
      rules: [
          {
              test: /\.(png|jpe?g|gif)$/i,
              use: {
                  loader: "url-loader",
                  options: {
                      // 把指定大小内图片进行图片BASE64
                      limit:200*1024,
                      esModule:false,
                      name:'image/[name].[hash.8].[ext]'
                  }
              }
          }
      ]
  }
  
  // 设置打包的最大资源大小
  performance:{
      maxAssertSize:100*1024*1024,
      maxEntrypointSize:100*1024*1024
  }
  ```

编译相关的loader：

- ts-loader

- babel-loader

  > 在编写 js 代码时，经常需要使用一些 js 中的新特性，而新特性在旧的浏览器中兼容性并不好。此时就导致我们无法使用一些新的特性。但是我们现在希望能够使用新的特性，我们可以采用折中的方案。依然使用新特性编写代码，但是代码编写完成时我们可以通过一些工具将新代码转换为旧代码。babel 就是这样一个工具，可以将新的 js 语法转换为旧的 js，以提高代码的兼容性。我们如果希望在 webpack 支持 babel，则需要向 webpack 中引入 babel 的 loader。

  安装：

   `npm install -D babel-loader @babel/core @babel/preset-env`

  配置：

  ```js
  module: {
      rules: [
          {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: "babel-loader",
                  options: {
                      presets: ["@babel/preset-env"]
                  }
              }
          }
      ]
  }
  ```




**在 package.json 中设置兼容列表**

```
"browserslist": [
        "defaults"
 ]
```

https://github.com/browserslist/browserslist

@1 CSS3样式的兼容问题

@2 JS兼容性



**Proxy**

Node->ssp服务器渲染

前后端分离：本地不会有任何服务器的代码，数据请求都是要跨域服务器进行访问

## 03 开发服务器（webpack-dev-server）

基于Node在客户端本地启动一个Web服务，帮助开发者预览开发的作品

- 项目打包
- 启动Web服务器
- 热更新

> 项目开发的流程：本地开发 -> 提测，打包部署到测试服务器上 -> 重新打包，部署到服务器上

```json
"scripts": {
    "build": "webpack",
    "watch": "webpack --watch", 
    "dev": "webpack serve --open"  // 把代码打包到了服务器里 最后一定要build一下 不然不是最新的
},
```

> 用来自动build

安装：

`yarn add  -D webpack-dev-server`

启动：

`yarn webpack serve --open`


> 打包后 不可调试 这时候希望运行的是编译之后的 但是可以调试源码 用source-map这个开发工具

配置源码的映射

`devtool:"inline-source-map"`


# d2 Vite

Vite 也是前端的构建工具，相较于 webpack，vite 采用了不同的运行方式：

- 开发时，并不对代码打包，而是直接采用 ESM 的方式来运行项目

  > <script type="module" src="./src/index.js"></script>

- 在项目部署时，在对项目进行打包

除了速度外，vite 使用起来也更加方便

> 使用esbulid与构建依赖 go编写

基本使用：

1. 安装开发依赖 vite

   ```js
   npm add -D vite
   ```

2. vite 的源码目录就是项目根目录

3. 开发命令：

   ```js
   npm vite // 启动开发服务器
   
   npm vite build // 打包代码
   
   npm vite preview // 预览打包后代码
   ```
   
4. 使用命令构建

  ```js
  npm create vite@latest
  yarn create vite
  pnpm create vite
  ```

5. 配置文件：`vite.config.js`

6. 格式：

  ```js
  import { defineConfig } from "vite"
  import legacy from "@vitejs/plugin-legacy"
  
  export default defineConfig({
      plugins: [
          legacy({
              targets: ["defaults"]
          })
      ]
  })
  ```

  > js中可以直接引入css