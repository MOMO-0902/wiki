
# git

## 撤消操作

### 撤消git commit操作
  ```
  使用git log查看 commit 日志，日志中包含本次commit的哈希值,找到需要回退的那次commit的哈希值，
  使用git reset --hard commit_id  命令进行回退
  ```
### 撤消git add 操作
  如果是撤销所有的已经add的文件:
  ```
  git reset HEAD .
  ```
  如果是撤销某个文件或文件夹:
  ```
  git reset HEAD -filename
  ```

### 撤消git push操作
  方法:
  ```
      git reset --hard <commit_id>
      git push origin HEAD --force
  ```
  其他:
  ```
      根据–soft –mixed –hard，会对working tree和index和HEAD进行重置:
      git reset –mixed：此为默认方式，不带任何参数的git reset，即时这种方式，它回退到某个版本，只保留源码，回退commit和index信息
      git reset –soft：回退到某个版本，只回退了commit的信息，不会恢复到index file一级。如果还要提交，直接commit即可
      git reset –hard：彻底回退到某个版本，本地的源码也会变为上一个版本的内容
      HEAD 最近一个提交
      HEAD^ 上一次
  ```    
### 修正最后一个commit消息
  ```
  方法: git commit --amend 或 git commit --amend -m "要修改的提交信息"
  ```  
### 撤消历史提交
  ```
  方法: git revert
  ### git revert与git reset的区别
    - git revert 是用一个新技术提交来消除一个历史提交所做的任何修改，同时本地代码会回滚到指定的历史版本，HEAD是一直向前的
    - git reset 是直接删除指定的commit,HEAD是向后退到上一个版本
  ```    
### 撤消本地修改
  ```
  方法：git checkout -- filename 把工作目录里的文件修改到git之前记录的某个状态
  ``` 
### 撤消"本地修改之后再恢复"
  ```
  方法：先git reflog 查看项目历史再git reset 或 git checkout
    - git reset --hard <指定版本号> 代码库修改到某一次提交的状态
    - git checkout <版本号> -- <文件名> 修改某一次提交的某个文件
    - git cherry-pick <版本号> 重新提交某一次历史提交
  ```    

## 利用分支保存自己的代码
  ```
  - 1.git branch feature 创建新分支并指向最近一次的提交，但还check out在master分支上
  - 2.git reset --hard origin/master 把master分支倒回origin/master，但此时commit还在feature分支里
  - 3.git checkout feature 查看工作成果
  ```
## 在本地创建test分支并指向远程test分支
  ```
  git checkout -b test origin/test
  ```  
## 切换分支
  ```
  git checkout `<branch>`
  ```  
## 删除分支
  ```
  要删除当前分支要先切换到别的分支，因为当前分支正在使用
  git branch -d `<branch>`
  ```  

## 合并分支 git rebase

### git rebase用于把一个分支的修改合并到当前分支

  如果想要放弃当前rebase操作，用:
```
 git rebase --abort
```
  如果冲突已经解决，先add冲突文件，之后：
```
 git rebase --continue
```

## git ssh配置及使用

### 设置git的username和email(如果是第一次的话)

```
git config --global user.name "momo-0902"
git config --global user.email "329053928@qq.com"
```

### 检查是否有ssh key

```
cd ~/.ssh
ls
```
如果存在id_isa和id_isa.pub文件，证明已经存在ssh key，可跳过生成密钥这一步骤

### 生成密钥

```
ssh-keygen -t rsa -C "329053928@qq.com"
```
生成id_isa和id_isa.pub两个文件

### 将id_isa.pub文件中的密钥复制添加到github的ssh key设置里

### 将本地仓库.git文件夹下config文件里的url改成ssh的地址

### 可使用ssh -T git@github

成功后提示信息为
```
Hi MOMO-0902!(你的用户名) You've successfully authenticated, but GitHub does not provide shell access.
```

## git add 时提示  LF will be replaced by CRLF

使用git add 添加文件时提示：
```
warning: LF will be replaced by CRLF in package-lock.json.
The file will have its original line endings in your working directory.
```
### 原因

indows中的换行符为 CRLF， 而在linux下的换行符为LF，所以在执行add . 时出现提示

### 解决办法为执行
```
$ git config --global core.autocrlf false  //禁用自动转换 
```